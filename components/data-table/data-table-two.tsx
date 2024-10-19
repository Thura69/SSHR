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
import TableSekeleton from '../ui/custom/table-skeleton'
import React from 'react'
import useAuthStore from '@/state/zustand/auth-store'
import { useQueryClient } from '@tanstack/react-query'
import useFormStore from '@/state/zustand/form-store'
import { handleClientScriptLoad } from 'next/script'

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    updateFun?:() =>void,
    handleRemoveClick?:(id:number)=>void,
    setData?: any
    className?: string
    getSelectedRows?: (data: any) => void
    loading?: boolean
    handleAllRowSelection?: (data: boolean) => void
    isAllRowSelected?: boolean
    handleGetTableObj?: (table: any) => void
}

const TBLRow = ({ row }: { row: Row<any> }) => {
    return (
        <TableRow
            className=" border-t hover:bg-gray-50 cursor-pointer   border-gray-200/50  bg-white  "
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
                    cell.column.id.toLowerCase() === 'isActive'.toLowerCase()

                return (
                    <TableCell
                        key={cell.id}
                        className={cn(
                            ' bg-white pl-12 ',
                            nameCell && ' p-0',
                            action && 'p-3',
                            status && 'pl-10',
                            isActive && ' pl-10',
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
    )
}

export function DataTable<TData,TValue>({
    columns,
    data,
    setData,
    className,
    handleRemoveClick,
    updateFun,
    loading = false,
}:DataTableProps<TData,TValue> ) {
    
    const { isAllSelected, setIsAllSelected } = tableSelectStore()
    const {setIsUpdate} = useFormStore();
    const { t } = useTranslation('common')
    const { setUpdate } = useAuthStore()

  

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
                setUpdate();

                setIsUpdate(true);

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
            handleRemoveClick:handleRemoveClick!
          
        }
    })

    const allRowSelected = table?.getIsAllRowsSelected()

    useEffect(() => {
        table.resetRowSelection();
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

    return (
       
            <div className="  bg-white z-10 relative overflow-auto w-full h-full">
                <Table className={cn(className, 'p-0   m-0')}>
                    <TableHeader className="bg-zinc-50 sticky   h-16   top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const nameCell = header.column.id === 'name';

                                    const statusCell =
                                        header.column.id === 'status' ||
                                        header.column.id === 'IsActive'
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                'border-gray-100 bg-zinc-50    border-b ',
                                                (header.id === 'select' ||
                                                    header.id ===
                                                        'Department_ID') &&
                                                    'w-[50px] text-center ',
                                                nameCell && 'pl-0',
                                                statusCell &&
                                                    'sm:w-[180px]  w-[120px]',
                                            )}
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
                            table
                                .getRowModel()
                                .rows.map((row) => (
                                    <TBLRow key={row?.id} row={row} />
                                ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center  bg-white"
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
