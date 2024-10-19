import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeCellAction from '@/components/employee/forms/employee-cellaction'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import HeadCountRequestForm from '../form'
import { HeadCountDataTable } from '../types/head-count-request-types'
import { format } from 'date-fns'
import HeadCountUrgencyBadge, {
    urgency_level_enum,
} from '@/components/common/head-count-urgency-badge'
import { Badge } from '@/components/ui/badge'
import ArrayBadge from '@/components/common/array-badge'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<HeadCountDataTable>[] = [
    {
        accessorKey: 'position_name',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-start">
                    {t('position_id')}
                </p>
            )
        },
        cell: ({ row }) => {
            const position_name = row.getValue('position_name') as string
            return <div className="flex justify-start">{position_name}</div>
        },
    },
    {
        accessorKey: 'no_of_position',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-center">
                    {t('no_of_position')}
                </p>
            )
        },
        cell: ({ row }) => {
            const position = row.getValue('no_of_position') as string
            return <div className="flex justify-center">{position}</div>
        },
    },
    {
        accessorKey: 'company_name',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')

            return (
                <p className="font-bold text-zinc-500 text-start">
                    {t('company_id')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('company_name') as string
            return <div className="flex justify-start">{status}</div>
        },
    },
    {
        accessorKey: 'location_name',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-start">
                    {t('location_id')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('location_name') as string
            return <p className="flex justify-start">{status}</p>
        },
    },
    {
        accessorKey: 'branch_name',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-start">
                    {t('branch_id')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('branch_name') as string
            return <p className="flex justify-start">{status}</p>
        },
    },
    {
        accessorKey: 'department_name',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-start">
                    {t('department_id')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('department_name') as string
            return <p className="flex justify-start">{status}</p>
        },
    },
    {
        accessorKey: 'section_name',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-start">
                    {t('section_id')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('section_name') as string
            return <p className="flex justify-start">{status}</p>
        },
    },
    {
        accessorKey: 'job_location',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-start">
                    {t('job_location')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('job_location') as string
            return <p className="flex justify-start">{status}</p>
        },
    },
    {
        accessorKey: 'job_type_name',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-start">
                    {t('job_type_id')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('job_type_name') as string
            return <p className="flex justify-start">{status}</p>
        },
    },
    {
        accessorKey: 'additional_skill_set',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-center justify-center">
                    {t('skill_set_id')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('additional_skill_set') as string[]
            return <ArrayBadge data={status} />
        },
    },
    {
        accessorKey: 'urgency_level',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')

            return (
                <p className="font-bold text-zinc-500 text-center">
                    {t('urgency_level')}
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('urgency_level') as urgency_level_enum
            return (
                <div className="flex justify-center">
                    <HeadCountUrgencyBadge value={status} rounded={true} />
                </div>
            )
        },
    },
    {
        accessorKey: 'target_onboarding_date',
        header: ({ column }) => {
            const { t } = useTranslation('headCountRequest')
            return (
                <p className="font-bold text-zinc-500 text-center">
                    {t('target_onboarding_date')}
                </p>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue('target_onboarding_date') as Date
            const formattedDate = format(date, 'dd/MM/yyyy')
            return <p className="text-center">{formattedDate}</p>
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { t } = useTranslation('contractDetailJobs')

            return (
                <div className="h-full w-[100px] px-2 flex items-center justify-center ">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { t } = useTranslation('headCountRequest')
            const [item, setItem] = useState([])
            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)

            const handleEdit = (row: any) => {}
            const handleDetail = (row: any) => {}
            const handleDelete = () => {}
            const selectedGrandSubMenu = { IsEdit: true, IsDelete: true }
            return (
                <div className={'flex items-center justify-center '}>
                    <EmployeeCellAction
                        language="headCountRequest"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setItem}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        isDetail={false}
                        handleDetail={handleDetail}
                        row={row}
                    />
                    <DeleteConfirm
                        message={t('cancelText')}
                        title={t('cancelTitel')}
                        isLoading={false}
                        toggle={dToggle}
                        open={dValue}
                        fun={handleDelete}
                    />
                </div>
            )
        },
    },
]
