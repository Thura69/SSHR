import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useBoolean } from 'usehooks-ts'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import EmployeeCellAction from '@/components/employee/forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import SkillSetForm from '../skill-sets/skill-set-form'
import { ColorPicker } from 'antd'
import ScreenForm from './screen-form'
import { ChevronDown, ChevronUp } from 'lucide-react'
import useRowOpenStore from '@/state/zustand/row'
import ScreenSubFrom from './screen-sub-from'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'

export type ScreeningDetails = {
    id: number
    name: string
    color: string
    active: boolean
}

const headerTypo = 'text-[14px] w-[200px]  font-bold text-[#687588]'

export const columns: ColumnDef<ScreeningDetails>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => {
            const { t } = useTranslation('screenStaging')

            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('name')}</p>
                </section>
            )
        },
        cell: ({ row }) => {
            const { rowOpen, setOpenType } = useRowOpenStore()
            const name = row.getValue('name') as string
            const id = row.original?.id

            //@ts-ignore
            const isOpen = rowOpen?.id === id && rowOpen?.state

            return (
                <div className="flex items-center justify-between">
                    {name}{' '}
                    {isOpen ? (
                        <ChevronUp
                            onClick={() =>
                                //@ts-ignore
                                setOpenType(id, false)
                            }
                            className="w-5 h-5 cursor-pointer" // Added cursor-pointer for better UX
                        />
                    ) : (
                        <ChevronDown
                            onClick={() =>
                                //@ts-ignore

                                setOpenType(id, true)
                            }
                            className="w-5 h-5 cursor-pointer" // Added cursor-pointer for better UX
                        />
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: 'color',
        header: ({ column }) => {
            const { t } = useTranslation('screenStaging')

            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>{t('color')}</p>
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('color') as string

            return (
                <ColorPicker
                    className=" text-start bg-[#F1F5FB] p-2 flex disabled:text-black justify-start h-full w-[80%]"
                    value={cn(`${status}`)}
                    showText
                    disabled
                />
            )
        },
    },
    {
        accessorKey: 'active',
        header: ({ column }) => {
            const { t } = useTranslation('screenStaging')

            return (
                <section className=" text-center">
                    <p className={'w-[110px]'}>{t('active')}</p>
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('active') as string
            return (
                <div className="w-[100px] ml-[10px]">
                    {status ? (
                        <ActiveBadge rounded />
                    ) : (
                        <InactiveBadge rounded />
                    )}
                </div>
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
            const { t } = useTranslation('screenStaging')
            const [item, setItem] = useState([])
            const { value, toggle, setTrue } = useBoolean(false)
            const {
                value: subValue,
                toggle: subToggle,
                setTrue: subTrue,
            } = useBoolean(false)

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

            const handleAdd = (row: any) => {
                subToggle()
            }

            const handleDelete = () => {}
            const selectedGrandSubMenu = {
                IsEdit: true,
                IsDelete: true,
                IsAdd: true,
            }
            return (
                <div className={'flex items-center justify-center '}>
                    <EmployeeCellAction
                        language="financialYear"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setItem}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        handleDetail={handleDetail}
                        handleAdd={handleAdd}
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
                        title={`${t(DetailValue ? 'detail' : 'edit')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={value}
                        open={value}
                        toggle={toggle}
                        form={
                            <ScreenForm
                                editMode={value}
                                detailValue={DetailValue}
                                editData={item}
                                toggle={toggle}
                            />
                        }
                    />
                    <EmployeeModal
                        title={`${t('addSub')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={subValue}
                        open={subValue}
                        toggle={subToggle}
                        form={
                            <ScreenSubFrom
                                editMode={false}
                                detailValue={false}
                                editData={item}
                                toggle={subToggle}
                            />
                        }
                    />
                </div>
            )
        },
    },
]
