import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeCellAction from '@/components/employee/forms/employee-cellaction'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import { cn, STATUS_LABELS } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import HiringSourceForm from '../hiring-source/form'
import EmailTemplateForm from './form'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import SortButton from '@/components/data-table/sort-button'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import { parseAsInteger, useQueryState } from 'nuqs'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { StatusFilter } from '@/components/setting/status-filter'

export type EmailTemplateType = {
    id: number
    templateName: string
    templateType: string
    status: boolean
}

const headerTypo = 'text-[14px] w-[220px]  font-bold text-[#687588]'

export const columns: ColumnDef<EmailTemplateType>[] = [
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
        accessorKey: 'templateName',
        header: ({ column }) => {
            const { t } = useTranslation('emailTemplate')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [name, setName] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex min-w-[150px] justify-between items-center gap-2">
                    <SortButton columnName="name" column={column} />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('templateName') : ''}
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
        accessorKey: 'templateType',
        header: ({ column }) => {
            const { t } = useTranslation('emailTemplate')

            const { value, setFalse, setTrue } = useBoolean(true)

            const [name, setName] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)

            const debouncedFun = useDebounceCallback(setName, 500)

            const searchNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }


            return (
                <section className="flex min-w-[150px] justify-between items-center gap-2">
                <SortButton columnName="name" column={column} />
                <DataTableColumnInput
                    onMouseDown={() => setFalse()}
                    onMouseOut={() => setTrue()}
                    placeholder={value ? t('templateType') : ''}
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
            const { t } = useTranslation('emailTemplate')
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
                    {/* <EmployeeModal
                        title={`${t(DetailValue ? 'detail' : 'edit')}`}
                        modelRatio="w-[100svw] lg:w-[700px]"
                        editMode={value}
                        open={value}
                        toggle={toggle}
                        form={
                            <EmailTemplateForm
                                editMode={value}
                                detailValue={DetailValue}
                                editData={item}
                                toggle={toggle}
                            />
                        }
                    /> */}
                </div>
            )
        },
    },
]
