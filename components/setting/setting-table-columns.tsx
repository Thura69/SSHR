'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import SortButton from '@/components/data-table/sort-button'
import { Button } from '@/components/ui/button'
import InactiveBadge from '@/components/common/inactive-badge'
import ActiveBadge from '@/components/common/active-badge'
import { EmployeeColumnFilter } from '@/components/employee-list/table-list/employee-column-filter'
import { STATUS_LABELS } from '@/lib/utils'

export type User = {
    name: string
    status: string
}

export const columns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="border-neutral-300 mt-1"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="border-neutral-300 mt-1"
            />
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <section className="flex justify-between items-center gap-2">
                <DataTableColumnInput
                    placeholder={'Name'}
                    containerClassName={'flex-1'}
                    className={'w-[120px] md:w-full'}
                />
                <SortButton column={column} />
            </section>
        ),
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <div className="flex justify-between items-center gap-2">
                <div className={'w-4'} />
                <EmployeeColumnFilter
                    align="center"
                    options={STATUS_LABELS}
                    column={column}
                    title={'Status'}
                />

                <SortButton column={column} />
            </div>
        ),
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return (
                <>{status === 'Active' ? <ActiveBadge /> : <InactiveBadge />}</>
            )
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            return (
                <div className="h-full   flex items-center justify-center">
                    <p className="font-bold text-zinc-500 text-center">
                        Action
                    </p>
                </div>
            )
        },
        cell: ({ row }) => (
            <div className={'flex justify-center w-[80px]'}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="hover:">
                        <Button variant="primary" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 rotate-90" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
]
