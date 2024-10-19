import SortButton from '@/components/data-table/sort-button'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import { DEFAULT_PAGE } from '@/constants/pagination'
import { ColumnDef } from '@tanstack/react-table'
import { parseAsInteger, useQueryState } from 'nuqs'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import useMenu from '@/state/zustand/menu'
import { STATUS_LABELS, cn } from '@/lib/utils'
// import { StatusFilter } from '@/components/setting/status-filter'
import { ColorPicker } from 'antd'
import useToast from '@/hooks/use-toast'
import useUserCookie from '@/hooks/use-user'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import { useDeleteDepartment } from '@/service/query-hooks/organisation-structure/use-department'
import { useRouter } from 'next/navigation'
import CellAction from '@/components/common/table/cell-action'
import { deleteAudit } from '@/lib/audit-trail-api'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import { Department } from '@/types/org-structure'
import { StatusFilter } from '@/components/setting/common/status-filter'

export const columns: ColumnDef<Department>[] = [
    {
        id: 'select',
        header: ({ table }) => <SelectHeader table={table} />,
        cell: ({ row }) => <SelectCell row={row} />,
    },
    {
        accessorKey: 'department_name',
        header: ({ column }) => {
            const { t } = useTranslation('department')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [department, setDepartment] = useQueryState('name', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebounceCallback(setDepartment, 500)

            const searchContractHandler = (
                e: ChangeEvent<HTMLInputElement>,
            ) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="name" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('name') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchContractHandler}
                        defaultValue={department}
                        className={'w-full'}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'department_color',
        enableHiding: true,
        header: ({ column }) => {
            const { t } = useTranslation('department')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [department, setDepartment] = useQueryState('color', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebounceCallback(setDepartment, 500)

            const searchContractHandler = (
                e: ChangeEvent<HTMLInputElement>,
            ) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section
                    className={cn(
                        'flex justify-start items-center gap-2  min-w-[200px]',
                    )}
                >
                    <SortButton column={column} columnName="color" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('color') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchContractHandler}
                        defaultValue={department}
                        className={'w-full'}
                    />
                </section>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue('department_color') as string

            return (
                <ColorPicker
                    className=" text-start flex justify-start  w-full"
                    value={cn(`${status}`)}
                    showText
                    disabled
                />
            )
            // return <div className={`bg-[${status}] w-[30px] h-[30px]`}>1</div>
        },
    },
    {
        accessorKey: 'total_employees',
        header: ({ column }) => {
            const { t } = useTranslation('department')

            const [department, setDepartment] = useQueryState(
                'employee_count',
                {
                    defaultValue: '',
                    clearOnDefault: true,
                },
            )
            const [_, setPage] = useQueryState('page', parseAsInteger)

            return (
                <section className="flex justify-start items-center gap-2 min-w-[200px]">
                    <SortButton column={column} columnName="employee_count" />
                    <p
                        className={cn(
                            'border-0 rounded-md ring-0 bg-transparent w-full  ring-gray-200 placeholder:text-zinc-500 ring-offset-0 p-2  ' +
                                'focus-within:ring-0  focus-visible:ring-zinc-200 px-2 focus-within:ring-offset-0  mb-0 ' +
                                'text-muted-foreground font-bold placeholder:text-sm w-full line-clamp-1 ',
                        )}
                    >
                        {t('totle')}
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'probation_period',
        header: ({ column }) => {
            const { t } = useTranslation('department')
            const { value, setFalse, setTrue } = useBoolean(true)

            const [department, setDepartment] = useQueryState('probation', {
                defaultValue: '',
                clearOnDefault: true,
            })
            const [_, setPage] = useQueryState('page', parseAsInteger)
            const debouncedFun = useDebounceCallback(setDepartment, 500)

            const searchContractHandler = (
                e: ChangeEvent<HTMLInputElement>,
            ) => {
                debouncedFun(e.target.value)
                setPage(DEFAULT_PAGE)
            }

            return (
                <section className="flex  justify-start items-center gap-2 min-w-[230px]">
                    <SortButton column={column} columnName="probation" />
                    <DataTableColumnInput
                        onMouseDown={() => setFalse()}
                        onMouseOut={() => setTrue()}
                        placeholder={value ? t('probation') : ''}
                        containerClassName={'flex-1'}
                        onChange={searchContractHandler}
                        defaultValue={department}
                        className={'w-full'}
                    />
                </section>
            )
        },
    },
    {
        accessorKey: 'is_active',
        enableHiding: true,
        header: ({ column }) => {
            const { t } = useTranslation('contractType')
            const { selectedGrandSubMenu } = useMenu()

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
            const status = row.getValue('is_active') as string
            return <>{status ? <ActiveBadge /> : <InactiveBadge />}</>
        },
    },
    {
        accessorKey: 'action',
        enableHiding: true,
        header: () => {
            const { t } = useTranslation('department')

            return (
                <div className="flex w-[80px]  items-center justify-center">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { deleteById, isPending } = useDeleteDepartment()
            const [deleteData, setDeleteData] = useState<any>()
            const { showNotification } = useToast()
            const { setTrue } = useBoolean(false)
            const {
                value: dValue,
                toggle: dToggle,
                setTrue: dSetTrue,
            } = useBoolean(false)
            const [singleCurrency, setSingleCurrency] = useState({
                currencyType: '',
                default: false,
                description: '',
                id: 0,
            })
            const { selectedMenuId, selectedGrandSubMenu } = useMenu()
            const { t } = useTranslation('department')
            const user = useUserCookie()
            const router = useRouter()

            // const auditPayload = {
            //     Is_Mobile: false,
            //     Emp_Name: user?.employee_name!,
            //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
            //     Parent_Menu_ID: selectedMenuId!,
            //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
            //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
            // }

            const handleDelete = () => {
                const rowData = deleteData.original.department_id // This gives you the user data of the selected row
                deleteById(rowData, {
                    onSuccess: (res) => {
                        showNotification({
                            message: res.message,
                            type: 'success',
                        })
                        // deleteAudit({
                        //     ...auditPayload,
                        //     ValueBefore: deleteData.original,
                        //     Record_Name: deleteData.original.department_name,
                        // })

                        dToggle()

                        //delete audit
                    },
                    onError: (error) => {
                        showNotification({
                            message: error.message,
                            type: 'danger',
                        })
                    },
                })
            }

            const handleEdit = (row: any) => {
                router.push(
                    `department/department-setting/${row.original.department_id}`,
                )
                const rowData = row.original
                setSingleCurrency(rowData)
                setTrue()
            }

            return (
                <div className={'flex  justify-center'}>
                    <CellAction
                        language="codeGenerator"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setDeleteData}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        row={row}
                    />
                    <DeleteConfirm
                        message={t('deleteText')}
                        title={t('deleteTitle')}
                        isLoading={isPending}
                        toggle={dToggle}
                        open={dValue}
                        fun={handleDelete}
                    />
                </div>
            )
        },
    },
]
