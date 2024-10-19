import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import EmployeeCellAction from '../forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeModal from '../forms/employee-modal'
import HrConcernForm from './hrconcern-form'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'

export type HrConcernType = {
    date: string
    note: string
    writtenBy: string
}

const headerTypo = 'text-[14px] w-[120px]  font-bold text-[#687588]'

export const columns: ColumnDef<HrConcernType>[] = [
    {
        accessorKey: 'date',
        header: ({ column }) => {
            const { t } = useTranslation('hrConcern')
            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('date')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'note',
        header: ({ column }) => {
            const { t } = useTranslation('hrConcern')
            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('note')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'writtenBy',
        header: ({ column }) => {
            const { t } = useTranslation('hrConcern')
            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('writtenBy')}</p>
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
            const { t } = useTranslation('hrConcern')
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
                        title={`${t(DetailValue ? 'hrConcernDetails' : 'hrEdit')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={false}
                        open={value}
                        toggle={toggle}
                        form={
                            <HrConcernForm
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
