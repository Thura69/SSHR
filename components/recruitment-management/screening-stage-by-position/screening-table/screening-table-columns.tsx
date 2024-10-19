import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import RowDragHandleCell from '@/components/common/form/fields/draggable-column'
import { TrashIcon } from '@/components/common/icons'
import { COLORS } from '@/constants'

type Screening = {
    id: number
    name: string
}

const headerTypo = 'text-[14px] w-[120px]  font-bold text-[#687588]'

export const columns: ColumnDef<Screening>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            const { t } = useTranslation('screeningStageByPosition')
            return (
                <section className="text-start">
                    <p className={cn(headerTypo)}>{t('screeningStage')}</p>
                </section>
            )
        },
        cell: ({ row }) => (
            <RowDragHandleCell value={row.original.name} rowId={row.id} />
        ),
    },
    {
        accessorKey: 'action',
        header: ({ column }) => {
            const { t } = useTranslation('screeni  ngStageByPosition')
            return (
                <div className="h-full w-[80px] px-2 flex items-center justify-center  ">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { t } = useTranslation('career')

            return (
                <div className={'flex items-center justify-center '}>
                    <div className="flex h-[23px] w-[23px] rounded-[6px] justify-center items-center  bg-danger-200">
                        <TrashIcon
                            className="w-[16px] h-[16px]"
                            fill={COLORS.danger[500]}
                        />
                    </div>
                </div>
            )
        },
    },
]
