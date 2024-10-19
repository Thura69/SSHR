import { ColumnDef } from '@tanstack/react-table'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { useTranslation } from 'react-i18next'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import { useBoolean } from 'usehooks-ts'
import { useState } from 'react'
import EmployeeCellAction from '../forms/employee-cellaction'
import EmployeeModal from '../forms/employee-modal'
import FamilyForm from './family-form'
import EmergencyForm from './emergency-form'

export type FamilyType = {
    name: string
    relationShip: string
    contactNo: string
    primaryContact: string
}

export const columns: ColumnDef<FamilyType>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <section className=" text-start">
                    <p className="text-[14px] w-[120px]  font-bold text-[#687588]">
                        Name
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'relationShip',
        header: ({ column }) => {
            return (
                <section>
                    <p className="text-[14px] w-[140px] font-bold text-[#687588]">
                        Relation Ship
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'contactNo',
        header: ({ column }) => {
            return (
                <section>
                    <p className="text-[14px] w-[120px] font-bold text-[#687588]">
                        Contact No.
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'primaryContact',
        header: ({ column }) => {
            return (
                <section>
                    <p className="text-[14px] w-[150px] font-bold text-[#687588]">
                        Primary Contact
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { t } = useTranslation('familyContact')

            return (
                <div className="h-full w-[100px] px-2 flex items-center justify-center ">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { t } = useTranslation('emergencyContact')
            const [item, setItem] = useState([])
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)
            const {
                value: DetailValue,
                setFalse: DetailFalse,
                setTrue: DetailTrue,
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
                        title={`${t(DetailValue ? 'emergencyDetails' : 'editEmergency')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={false}
                        open={value}
                        toggle={toggle}
                        form={<EmergencyForm editMode={value} detailValue={DetailValue}  editData={item} toggle={toggle} />}
                    />
                </div>
            )
        },
    },
]
