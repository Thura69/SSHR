import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table'
import { DataTableProps } from '@/types/common'
import { useEffect, useState, useTransition } from 'react'
import useMenu from '@/state/zustand/menu'
import tableSelectStore from '@/state/zustand/table-select-state'
import { useTranslation } from 'react-i18next'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { ChevronDownIcon, Search } from 'lucide-react'
import SearchDrop from '@/components/ui/custom/search-drop'


function SearchAbleTable<TData, TValue>({
    columns,
    data,
    className,
    getSelectedRows,
    loading = false,
    detailValue,
    handleAllRowSelection,
    handleGetTableObj,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])
    const { selectedGrandSubMenu } = useMenu()
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const { isAllSelected, setIsAllSelected } = tableSelectStore()
    const { t } = useTranslation('common')
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [popoverOpen_2, setPopoverOpen_2] = useState(false)

    const [placeholderValue, setPlaceholderValue] = useState('');
    const [placeholderValue_2, setPlaceholderValue_2] = useState('');



    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center  bg-[#EEFDFD] p-4 gap-[12px]">
            <SearchDrop
                    type='drop'
                    popoverOpen={popoverOpen}
                    setPopoverOpen={setPopoverOpen}
                    placeHolder='Question Type'
                    value={placeholderValue}
                    setValue={setPlaceholderValue}
                    languageTitle="emailTemplate"
                    apiFields={{
                        value: 'Branch_ID',
                        label: 'Branch_Name',
                    }}
                />
                <SearchDrop
                    type='drop'
                    popoverOpen={popoverOpen_2}
                    setPopoverOpen={setPopoverOpen_2}
                    placeHolder='Category'
                    value={placeholderValue_2}
                    setValue={setPlaceholderValue_2}
                    languageTitle="emailTemplate"
                    apiFields={{
                        value: 'Branch_ID',
                        label: 'Branch_Name',
                    }}
                />
                <Input
                    startIcon={
                        <Search className="text-secondaryText h-6 w-6" />
                    }
                    placeholder="Search Questions"
                    value={
                        (table
                            .getColumn('questions')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('questions')
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-full p-3  font-bold rounded border-[#C3DDF4]  h-[45px]"
                />
            </div>
            <div className="rounded-md max-h-[300px] overflow-auto">
                <Table className="">
                    <TableHeader className="hidden">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                                className={
                                                    cell.column.id === 'select'
                                                        ? 'w-[20px] px-3 py-2 h-[45px]  '
                                                        : 'text-sideMenuTextColor2 px-3 py-2 h-[40px]'
                                                }
                                                key={cell.id}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24  text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default SearchAbleTable
