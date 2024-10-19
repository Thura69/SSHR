'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'     

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import tableSelectStore from '@/state/zustand/table-select-state'
import React from 'react'
import useAuthStore from '@/state/zustand/auth-store'
import { useQueryClient } from '@tanstack/react-query'
import useFormStore from '@/state/zustand/form-store'
import { handleClientScriptLoad } from 'next/script'
import TableSekeleton from '@/components/ui/custom/table-skeleton'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import useRowOpenStore from '@/state/zustand/row'
import RowDragHandleCell from '@/components/common/form/fields/draggable-column'

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    updateFun?: () => void
    handleRemoveClick?: (id: number) => void
    setData?: any
    className?: string
    isSortButtonPadding?: boolean
    height?: string,
    isSort?:boolean,
    getSelectedRows?: (data: any) => void
    loading?: boolean
    handleAllRowSelection?: (data: boolean) => void
    isAllRowSelected?: boolean
    handleGetTableObj?: (table: any) => void
    detail?:boolean
}

const TBLRow = ({ row,isSort,isSortButtonPadding,detail =false }: { row: Row<any>,isSort:boolean,isSortButtonPadding:boolean,detail?:boolean }) => {
    return (
        <>
            <TableRow
                className="hover:bg-[#f1fcfc]  border-b cursor-pointer h-[60px] border-[#E2E8F0]   bg-white"
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
            >
                {row.getVisibleCells().map((cell) => {
                    // add condtion you want
                    const nameCell =
                        cell.column.id.toLowerCase() === 'select'.toLowerCase()
                    const action =
                        cell.column.id.toLowerCase() === 'action'.toLowerCase()
                    const status =
                        cell.column.id.toLowerCase() === 'status'.toLowerCase()
                    const isActive =
                        cell.column.id.toLowerCase() === 'active'.toLowerCase()
                    const noOfPosition =
                        cell.column.id.toLowerCase() ===
                        'no_of_position'.toLowerCase()
                    const target_onboarding_date =
                        cell.column.id.toLowerCase() === 'active'.toLowerCase()
                    const approvers =
                        cell.column.id.toLowerCase() ===
                        'approvers'.toLowerCase()
                    return (
                        <TableCell
                            key={cell.id}
                            className={cn(
                                'text-[14px]  pl-[55px]  text-sideMenuTextColor2 ',
                                nameCell && 'p-0 w-[55px]',
                                status && 'pl-[50px]',
                                noOfPosition && 'pl-4',
                                isSortButtonPadding && 'pl-4',
                                approvers && 'pl-4',
                                isSort && 'pl-4',
                                detail && 'bg-[#F1F5FB]'
                            )}
                        >
                            <div className="h-fit ">
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </div>
                        </TableCell>
                    )
                })}
            </TableRow>
        </>
    )
}

export function DataTable<TData, TValue>({
    columns,
    data,
    setData,
    className,
    isSortButtonPadding = false,
    height = 'max-h-[335px] overflow-auto',
    handleRemoveClick,
    detail = false,
    updateFun,
    isSort = false,
    loading = false,
}: DataTableProps<TData, TValue>) {
    const { isAllSelected, setIsAllSelected } = tableSelectStore()
    const { setIsUpdate } = useFormStore()
    const { t } = useTranslation('common')
    const { setUpdate } = useAuthStore()
    const { rowOpen, setOpenType } = useRowOpenStore()

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        manualPagination: true,
        getRowId: (row: any) => row.id,
        meta: {
            updateFun: updateFun!,
            updateData: (rowIndex, columnId, value) => {
                setUpdate()

                setIsUpdate(true)

                setData((old: any[]) =>
                    old?.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                            }
                        }
                        return row
                    }),
                )
            },
            handleRemoveClick: handleRemoveClick!,
        },
    })

    const allRowSelected = table?.getIsAllRowsSelected()

    useEffect(() => {
        table.resetRowSelection()
        return () => {
            setIsAllSelected(false)
        }
    }, [])

    useEffect(() => {
        if (isAllSelected) {
            const idArr = data
                .map((item: any) => item.id)
                .reduce((accum: any, value: any) => {
                    accum[value] = true
                    return accum
                }, {})
            table.setRowSelection(idArr)
        }
    }, [isAllSelected, allRowSelected, data])

    useEffect(() => {
        console.log({ rowOpen })
    }, [rowOpen])

    return (
        <div className={cn('overflow-y-auto z-10 w-full', height)}>
            <Table className={cn(className, 'p-0 m-0')}>
                <TableHeader className="bg-[#EEFDFD] sticky   top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const nameCell = header.column.id === 'name'

                                const statusCell =
                                    header.column.id === 'status' ||
                                    header.column.id === 'IsActive'
                                return (
                                    <TableHead
                                        className={cn(
                                            'bg-[#EEFDFD] py-[16px] ',
                                            statusCell && ' w-[200px]',
                                        )}
                                        key={header.id}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="border-white  border-t-2">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            return (
                                <>
                                    <TBLRow isSortButtonPadding={isSortButtonPadding} isSort={isSort} key={row?.id} detail={detail} row={row} />
                                </>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-start  bg-white"
                            >
                                {!loading ? (
                                    t('noResultFound')
                                ) : (
                                    <TableSekeleton />
                                )}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
