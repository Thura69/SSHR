'use client'

import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import EmployeeCellAction from '../forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeModal from '../forms/employee-modal'
import { useBoolean } from 'usehooks-ts'
import { useState } from 'react'
import JobHistoryDetails from './jobhistory-details-jobs'
import JobHistoryForm from './jobhistory-detail-form'

export type JobHistoryDetails = {
    position: string
    positionStartDate: string
    positionEndDate: string
    department: string
    salary: string
}

const headerTypo = 'text-[14px] w-[150px]  font-bold text-[#687588]'

export const columns: ColumnDef<JobHistoryDetails>[] = [
    {
        accessorKey: 'position',
        header: ({ column }) => {
            const { t } = useTranslation('jobHistoryJobs')

            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('position')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'positionStartDate',
        header: ({ column }) => {
            const { t } = useTranslation('jobHistoryJobs')
            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('positionStartDate')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'positionEndDate',
        header: ({ column }) => {
            const { t } = useTranslation('jobHistoryJobs')
            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('positionEndDate')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'department',
        header: ({ column }) => {
            const { t } = useTranslation('jobHistoryJobs')
            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('department')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'salary',
        header: ({ column }) => {
            const { t } = useTranslation('jobHistoryJobs')
            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('salary')}</p>
                </section>
            )
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
            const { t } = useTranslation('jobHistoryJobs')
            const [item, setItem] = useState([])
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: DetailValue,
                setFalse: DetailFalse,
                setTrue: DetailTrue,
            } = useBoolean(false)

            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)

            const handleEdit = (row: any) => {
                const rowData = row.original
                setItem(rowData)
                toggle()
                DetailFalse()
            }

            const handleDetail = (row: any) => {
                const rowData = row.original
                setItem(rowData)
                toggle()
                DetailTrue()
            }

            const handleDelete = () => {}
            const selectedGrandSubMenu = { IsEdit: true, IsDelete: true }
            return (
                <div className={'flex items-center justify-center '}>
                    <EmployeeCellAction
                        language="financialYear"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setItem}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        handleDetail={handleDetail}
                        row={row}
                    />
                    <DeleteConfirm
                        message={t('deleteText')}
                        title={t('deleteTitle')}
                        isLoading={false}
                        toggle={dToggle}
                        open={dValue}
                        fun={handleDelete}
                    />
                    <EmployeeModal
                        title={`${t(DetailValue ? 'detailsJobHistory' : 'editJobHistory')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={false}
                        open={value}
                        toggle={toggle}
                        form={
                            <JobHistoryForm
                                editMode={value}
                                detailValue={DetailValue}
                                editData={item}
                                toggle={toggle}
                            />
                        }
                    />
                </div>
            )
        },
    },
]
