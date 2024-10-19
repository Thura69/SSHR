'use client'

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import useMenu from '@/state/zustand/menu'
import tableSelectStore from '@/state/zustand/table-select-state'
import { DataTableProps } from '@/types/common'
import TableSekeleton from '../ui/custom/table-skeleton'

const TableRowComponent = ({ row }: { row: Row<any> }) => {
    return (
        <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className="bg-white"
        >
            {row.getVisibleCells().map((cell) => {
                return (
                    <TableCell
                        key={cell.id}
                        className={cn('h-[52px] p-0 border-r')}
                    >
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

export function ReportListDataTable<TData, TValue>({
    columns,
    data,
    className,
    getSelectedRows,
    loading = false,
    handleGetTableObj,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const { selectedGrandSubMenu } = useMenu()
    const { isAllSelected, setIsAllSelected } = tableSelectStore()

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        manualSorting: true,
        manualPagination: true,
        getRowId: (row: any) => row.id,
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

    const allRowSelected = table.getIsAllRowsSelected()

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

    return (
        <div className={cn('rounded-md', className)}>
            <div className="relative overflow-auto w-full h-full border rounded">
                <Table>
                    <TableHeader className="bg-zinc-50 sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-white">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={cn(
                                            'border-gray-200 border-b bg-zinc-50 border-r ',
                                            {
                                                'border-r':
                                                    header.index > 0 &&
                                                    header.index <
                                                        columns.length - 1,
                                            },
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
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className={'border-b'}>
                        {table.getRowModel().rows?.length ? (
                            table
                                .getRowModel()
                                .rows.map((row) => (
                                    <TableRowComponent row={row} />
                                ))
                        ) : (
                            <TableRow className="bg-white">
                                <TableCell
                                    colSpan={12}
                                    className="h-24 text-center"
                                >
                                    {!loading ? (
                                        'No results.'
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
