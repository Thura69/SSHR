import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { cn, STATUS_LABELS } from '@/lib/utils'
import { ChangeEvent, useState } from 'react'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import InactiveBadge from '@/components/common/inactive-badge'
import SkillSetForm from './skill-set-form'
import EmployeeCellAction from '@/components/employee/forms/employee-cellaction'
import ActiveBadge from '@/components/common/active-badge'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import ContractDetailsForm from '@/components/employee/jobs/contract-details-form'
import SortButton from '@/components/data-table/sort-button'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import { parseAsInteger, useQueryState } from 'nuqs'
import { DEFAULT_PAGE } from '@/constants/pagination'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { StatusFilter } from '@/components/setting/status-filter'
import PersonalStatus from '@/components/common/personal-status'

export type SkillSetDetails = {
    name: string
    type: string
    active: boolean
}
const headerTypo = 'text-[14px] w-[150px]  font-bold text-[#687588]'

export const columns: ColumnDef<SkillSetDetails>[] = [
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
            
            const { t } = useTranslation('skillSet')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const [name, setName] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className=" text-start flex items-center justify-start gap-2">
                    <SortButton columnName="name" column={column} />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('name') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                        className={'w-full'}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'type',
        header: ({ column }) => {
            const { t } = useTranslation('skillSet')
            const { value, setFalse, setTrue } = useBoolean(true)
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const [name, setName] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className=" text-start flex items-center justify-start gap-2">
                    <SortButton columnName="name" column={column} />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('type') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchNameHandler}
                        defaultValue={name}
                        className={'w-full'}
                    />
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('active') as string
            return (
                <div className="flex gap-[4px]  ">
                   <PersonalStatus userImg='https://images.unsplash.com/photo-1720887237257-3d1ad1a06c8a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' status='success'/>
                  <PersonalStatus userImg='https://images.unsplash.com/photo-1720887237257-3d1ad1a06c8a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' status='pending'/>
                  <PersonalStatus userImg='https://images.unsplash.com/photo-1720887237257-3d1ad1a06c8a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' status='declined'/> 
                </div>
            )
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            const { t } = useTranslation('skillSet')

            return (
                <section
                    className={cn('flex justify-start  items-center gap-2')}
                >
                    <SortButton column={column} columnName="status" />
                    <StatusFilter
                        align="center"
                        options={STATUS_LABELS}
                        column={column}
                        title={t('status')}
                        // isSingle={true}
                    />
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('active') as string
            return (
                <div className="w-[100px]">
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
            const { t } = useTranslation('skillSet')
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
                        title={`${t(DetailValue ? 'detail' : 'edit')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={value}
                        open={value}
                        toggle={toggle}
                        form={
                            <SkillSetForm
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
