'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
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
import useFormStore from '@/state/zustand/form-store'

import TableSekeleton from '@/components/ui/custom/table-skeleton'

import useRowOpenStore from '@/state/zustand/row'
import DragableSubCol from '@/components/recruitment-management/screening-stage/dragable-subcol'

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    updateFun?: () => void
    handleRemoveClick?: (id: number) => void
    setData?: any
    className?: string
    height?: string
    getSelectedRows?: (data: any) => void
    loading?: boolean
    handleAllRowSelection?: (data: boolean) => void
    isAllRowSelected?: boolean
    handleGetTableObj?: (table: any) => void
}

const TBLRow = ({ row }: { row: Row<any> }) => {
    return (
        <>
            <TableRow
                className="border-b hover:bg-[#f1fcfc] cursor-pointer h-[56px] border-gray-200/50  bg-white"
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
                        cell.column.id.toLowerCase() ===
                        'isActive'.toLowerCase()

                    return (
                        <TableCell
                            key={cell.id}
                            className="text-[14px] text-sideMenuTextColor2"
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
    height = 'max-h-[520px] overflow-auto',
    handleRemoveClick,
    updateFun,
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
        <div
            className={cn(
                'bg-[#EEFDFD]  overflow-y-auto z-10     w-full',
                height,
            )}
        >
            <Table className={cn(className, 'p-0   m-0')}>
                <TableHeader className="bg-[#EEFDFD] sticky   h-[51px]   top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const nameCell = header.column.id === 'name'

                                const statusCell =
                                    header.column.id === 'status' ||
                                    header.column.id === 'IsActive'
                                return (
                                    <TableHead
                                        className="bg-[#EEFDFD] "
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
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                        

                            return (
                                <>
                                    <TBLRow key={row?.id} row={row} />
                                    {`${rowOpen.id}` === `${row.id}` &&
                                        rowOpen.state && (
                                            <>
                                                <DragableSubCol
                                                  
                                                    row={row}
                                                />
                                            </>
                                        )}
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
