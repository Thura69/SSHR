'use client'

import { ColumnDef } from '@tanstack/react-table'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import SortButton from '@/components/data-table/sort-button'
import InactiveBadge from '@/components/common/inactive-badge'
import ActiveBadge from '@/components/common/active-badge'

import { STATUS_LABELS } from '@/lib/utils'
import CellAction from './cell-action'
import { useTranslation } from 'react-i18next'
import { parseAsInteger, useQueryState } from 'nuqs'
import { ChangeEvent } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { StatusFilter } from '@/components/setting/status-filter'
import { PositionColDefType } from '@/types/setting/position-type'
import { useBoolean } from 'usehooks-ts'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'

export type User = {
    name: string
    status: string
}

export const columns: ColumnDef<PositionColDefType>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            const { t } = useTranslation('position')
            const [name, setName] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const { value, setFalse, setTrue } = useBoolean(true)
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setName, 500)
            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }
            return (
                <section className="flex justify-between items-center gap-2">
                    <SortButton column={column} columnName="name" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('name') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'totalEmployees',
        header: ({ column }) => {
            const { t } = useTranslation('position')

            return (
                <div className="flex items-center  gap-4">
                    <SortButton column={column} columnName="employee_count" />
                    <div className="font-bold">{t('totalEmployees')}</div>
                </div>
            )
        },
        cell: ({ row }) => {
            return <>{row.getValue('totalEmployees')}</>
        },
    },

    {
        accessorKey: 'status',
        header: ({ column }) => {
            const { t } = useTranslation('position')
            return (
                <div className="flex justify-start items-center gap-2">
                    <SortButton column={column} columnName="status" />
                    <StatusFilter
                        align="center"
                        options={STATUS_LABELS}
                        column={column}
                        title={t('status')}
                    />
                </div>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return <>{status ? <ActiveBadge /> : <InactiveBadge />}</>
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { t } = useTranslation('position')

            return (
                <div className="h-full bg-zinc-50  w-full px-[10px] flex items-center justify-center">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            return <CellAction data={row.original} />
        },
    },
]
