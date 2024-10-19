'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import SortButton from '@/components/data-table/sort-button'
import { STATUS_LABELS } from '@/lib/utils'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { StatusFilter } from '../setting/status-filter'
import DataTableColumnInput from '../data-table/data-table-column-input'

export type VerticleTime = {
    field: string
    value: string
    oldValue: string
}

export const columns: ColumnDef<VerticleTime>[] = [
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
        accessorKey: 'field',
        header: ({ column }) => {
            const [contractType, setContractType] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebouncedCallback(setContractType, 500)
            const searchContractHandler = (
                e: ChangeEvent<HTMLInputElement>,
            ) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-between items-center gap-2">
                    <DataTableColumnInput
                        placeholder={'Field'}
                        containerClassName={'flex-1'}
                        onChange={searchContractHandler}
                        defaultValue={contractType}
                        className={'w-[120px] md:w-full'}
                    />
                    <SortButton column={column} />
                </section>
            )
        },
    },

    {
        accessorKey: 'value',
        header: ({ column }) => {
            const { t } = useTranslation('contractType')

            return (
                <section className="flex justify-between items-center gap-2">
                    {/* <DataTableColumnInput
                        
                        placeholder={t('active')}
                        containerClassName={"flex-1"}
                        className={'w-[120px] md:w-full'}
                    /> */}
                    <StatusFilter
                        align="center"
                        options={STATUS_LABELS}
                        column={column}
                        title={t('Value')}
                        // isSingle={true}
                    />
                    <SortButton column={column} />
                </section>
            )
        },
    },
    {
        accessorKey: 'oldValue',
        header: ({ column }) => {
            const { t } = useTranslation('contractType')

            return (
                <section className="flex justify-between items-center gap-2">
                    {/* <DataTableColumnInput
                        
                        placeholder={t('active')}
                        containerClassName={"flex-1"}
                        className={'w-[120px] md:w-full'}
                    /> */}
                    <StatusFilter
                        align="center"
                        options={STATUS_LABELS}
                        column={column}
                        title={t('Old Value')}
                        // isSingle={true}
                    />
                    <SortButton column={column} />
                </section>
            )
        },
    },
]
