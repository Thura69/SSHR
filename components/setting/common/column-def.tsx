'use client'

import { ColumnDef } from '@tanstack/react-table'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import SortButton from '@/components/data-table/sort-button'
import InactiveBadge from '@/components/common/inactive-badge'
import ActiveBadge from '@/components/common/active-badge'
import { STATUS_LABELS, cn } from '@/lib/utils'
import CellAction from '@/components/setting/common/cell-action'
import { useTranslation } from 'react-i18next'
import { ChangeEvent } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { parseAsInteger, useQueryState } from 'nuqs'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { SettingColumnDefType, menuTypes } from '@/types/setting'
import useMenu from '@/state/zustand/menu'
import { urlMapObj } from '@/service/apis/setting/setting-map-obj'
import { useBoolean } from 'usehooks-ts'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { StatusFilter } from './status-filter'
export const columns: ColumnDef<SettingColumnDefType>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            const { selectedGrandSubMenu } = useMenu()
            const menu = urlMapObj[selectedGrandSubMenu?.web_url as menuTypes]
            const { t } = useTranslation(menu)
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
                <section className="flex w-full  justify-between items-center gap-2">
                    <SortButton columnName="name" column={column} />
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
        accessorKey: 'status',
        header: ({ column }) => {
            const { selectedGrandSubMenu } = useMenu()
            const menu = urlMapObj[selectedGrandSubMenu?.web_url as menuTypes]
            const { t } = useTranslation(menu)
            return (
                <section
                    className={cn(
                        'flex justify-center items-center gap-2  w-[200px]',
                    )}
                >
                    <SortButton column={column} columnName="status" />
                    <StatusFilter
                        align="center"
                        options={STATUS_LABELS}
                        column={column}
                        title={t('status')}
                        // isSingle={true}
                    />
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return (
                <div className=" flex justify-start items-start">
                    {status ? <ActiveBadge /> : <InactiveBadge />}
                </div>
            )
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { selectedGrandSubMenu } = useMenu()
            const menu = urlMapObj[selectedGrandSubMenu?.web_url as menuTypes]
            const { t } = useTranslation(menu)

            return (
                <div className="h-full bg-zinc-50  w-full px-2 flex items-center justify-center">
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
