'use client'

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState, useTransition } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import useMenu from '@/state/zustand/menu'
import TableSekeleton from '../ui/custom/table-skeleton'
import { useTranslation } from 'react-i18next'
import tableSelectStore from '@/state/zustand/table-select-state'
import { DataTableProps } from '@/types/common'

const TBLRow = ({ row }: { row: Row<any> }) => {
    return (
        <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className=" border-t hover:bg-gray-50 cursor-pointer   border-gray-200/50 bg-white  "
        >
            {row.getVisibleCells().map((cell) => {
                return (
                    <TableCell key={cell.id} className={cn('h-[52px] px-4')}>
                        <div className={'w-[40px] h-fit'}></div>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                        )}
                    </TableCell>
                )
            })}
        </TableRow>
    )
}

export function DataTable<TData, TValue>({
    columns,
    data,
    className,
    getSelectedRows,
    loading = false,
    handleAllRowSelection,
    handleGetTableObj,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const { selectedGrandSubMenu } = useMenu()
    const { isAllSelected, setIsAllSelected } = tableSelectStore()
    const { t } = useTranslation('common')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        manualSorting: true,
        manualPagination: true,
        getRowId: (row: any) => {
            return row.id
        },
        state: {
            rowSelection,
            sorting,
            columnVisibility: {
                action: selectedGrandSubMenu
                    ? selectedGrandSubMenu.is_edit &&
                      selectedGrandSubMenu.is_delete
                    : false,
            },
        },
    })

    const allRowSelected = table?.getIsAllPageRowsSelected()

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
        getSelectedRows && getSelectedRows(table.getSelectedRowModel().flatRows)
    }, [rowSelection])

    useEffect(() => {
        handleGetTableObj && handleGetTableObj(table)
    }, [table])

    // for all rows selected
    useEffect(() => {
        handleAllRowSelection && handleAllRowSelection(allRowSelected)
    }, [allRowSelected])

    return (
        <div className={cn('rounded-md', className)}>
            <div className="relative overflow-auto w-full h-full">
                <Table>
                    <TableHeader className="bg-zinc-50 sticky h-14   top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                'border-gray-100    border-b border-r',
                                                (header.id === 'select' ||
                                                    header.id ===
                                                        'department_id') &&
                                                    'w-[50px] text-center ',
                                                header.id === 'status' &&
                                                    'w-[250px]',
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
                                    className="h-24 text-center"
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
        </div>
    )
}
