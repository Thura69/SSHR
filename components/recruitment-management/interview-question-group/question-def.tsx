import SelectCell from '@/components/data-table/select-cell'
import SelectHeader from '@/components/data-table/select-header'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

export type QuestionsType = {
    select: number
    questions: string
}

const headerTypo = 'text-[14px] w-[220px]  font-bold text-[#687588]'

export const columns: ColumnDef<QuestionsType>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'questions',
        header: ({ column }) => {
            const { t } = useTranslation('interviewQuestionGroup')

            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('questions')}</p>
                </section>
            )
        },
    },
]
