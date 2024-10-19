import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import EmployeeCellAction from '../forms/employee-cellaction'
import EmployeeModal from '../forms/employee-modal'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import VaccineForm from './vaccine-form'


export type vaccineType = {
    type: string
    vaccine: string
    date: string
    dose: string
    status: string
    proof: string
}
const headerTypo = 'text-[14px] w-[120px]  font-bold text-[#687588]'


export const columns: ColumnDef<vaccineType>[] = [
    {
        accessorKey: 'type',
        header: ({ column }) => {
            const { t } = useTranslation('vaccineEmployee')

            return (
                <section className="text-start">
                    <p className={cn(headerTypo, 'w-full')}>
                        {t('type')}
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'vaccine',
        header: ({ column }) => {
            const { t } = useTranslation('vaccineEmployee')

            return (
                <section className="text-start">
                    <p className={cn(headerTypo, 'w-full')}>
                        {t('vaccine')}
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'date',
        header: ({ column }) => {
            const { t } = useTranslation('vaccineEmployee')

            return (
                <section className="text-start">
                    <p className={cn(headerTypo, 'w-full')}>
                        {t('date')}
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'dose',
        header: ({ column }) => {
            const { t } = useTranslation('vaccineEmployee')

            return (
                <section className="text-start">
                    <p className={cn(headerTypo, 'w-full')}>
                        {t('dose')}
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            const { t } = useTranslation('vaccineEmployee')

            return (
                <section className="text-start">
                    <p className={cn(headerTypo, 'w-full')}>
                        {t('status')}
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'proof',
        header: ({ column }) => {
            const { t } = useTranslation('vaccineEmployee')

            return (
                <section className="text-start">
                    <p className={cn(headerTypo, 'w-full')}>
                        {t('proof')}
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'action',
        header: ({ column }) => {
            const { t } = useTranslation('device')
            return (
                <div className="h-full w-[100px] px-2 flex items-center justify-center ">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { t } = useTranslation('vaccineEmployee')
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
                        handleDetail={handleDetail}
                        language="financialYear"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setItem}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
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
                        title={`${t(DetailValue ? 'vaccineDetail' : 'editVaccine')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={false}
                        open={value}
                        toggle={toggle}
                        form={
                            <VaccineForm
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
