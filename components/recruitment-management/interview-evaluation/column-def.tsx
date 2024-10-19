import { ColumnDef } from '@tanstack/react-table'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { useTranslation } from 'react-i18next'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { cn } from '@/lib/utils'
import SortButton from '@/components/data-table/sort-button'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'



export type HiringManager = {
    id: number
    img: string
    status: string
}

export type InterviewEvaluation = {
    id: number
    jobTitle: string
    candidateName: string
    screeningStage: string
    hiringManager: HiringManager[]
    rating: number
    nextScreeningStage: string
}

const headerTypo = 'text-[14px] w-[220px]  font-bold text-[#687588]'

export const columns: ColumnDef<InterviewEvaluation>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className="flex items-center  justify-center">
                <SelectHeader table={table} />
            </div>
        ),
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'jobTitle',
        header: ({ column }) => {
            const { t } = useTranslation(' candidates')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const [name, setName] = useQueryState('codeNo', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className={cn(" text-start flex items-center justify-start gap-2",headerTypo)}>
                    <SortButton columnName="codeNo" column={column} />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('codeNo') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                        className={'w-full'}
                    />
                </section>
            )
        },
    },
]
