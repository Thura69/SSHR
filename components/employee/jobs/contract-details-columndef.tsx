'use client'
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import EmployeeCellAction from '../forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import { useBoolean } from 'usehooks-ts'
import { useState } from 'react'
import EmployeeModal from '../forms/employee-modal'
import ContractDetailsForm from './contract-details-form'

export type ContractDetails = {
    ecNumber: string
    type: string
    contractPeriod: string
}

const headerTypo = 'text-[14px] w-[150px]  font-bold text-[#687588]'

export const columns: ColumnDef<ContractDetails>[] = [
    {
        accessorKey: 'ecNumber',
        header: ({ column }) => {
            const { t } = useTranslation('contractDetailJobs')
            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('ecNumber')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'type',
        header: ({ column }) => {
            const { t } = useTranslation('contractDetailJobs')
            return (
                <section>
                    <p className={cn(headerTypo)}>{t('type')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'contractPeriod',
        header: ({ column }) => {
            const { t } = useTranslation('contractDetailJobs')
            return (
                <section>
                    <p className={cn(headerTypo)}>{t('contractPeriod')}</p>
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
            const { t } = useTranslation('contractDetailJobs')
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
                        title={`${t(DetailValue ? 'contractDetailsDetails' : 'editContractDetails')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={value}
                        open={value}
                        toggle={toggle}
                        form={
                            <ContractDetailsForm
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
