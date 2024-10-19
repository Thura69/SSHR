'use client'
import { useGetUserOptions } from '@/service/query-hooks/user-and-access/user/use-user'
import { DataTable } from '../../data-table/data-table-two'
import { ChangeEvent } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { useTranslation } from 'react-i18next'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_PAGE } from '@/constants/pagination'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import SortButton from '@/components/data-table/sort-button'
import EmployeeAvatar from '@/components/employee-list/table-list/components/employee-avatar'
import { CardDataTableDropdown } from '@/components/user-and-access/card-list/card-data-table-dropdown'
import { STATUS_LABELS } from '@/lib/utils'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useBoolean } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import menuStore from '@/state/zustand/menu'
import { usePathname } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { UserDeleteModal } from '@/components/user-and-access/components/user-delete-modal'
import {
    EmployeeData,
    OptionData,
    UserMenuInterface,
} from '@/types/user-and-access/user'
import { StatusFilter } from '@/components/setting/common/status-filter'

export interface EmployeeDataTableProps {
    data: Array<EmployeeData>
    isLoading: boolean
    OptionList?: OptionData
}

export default function EmployeeDataTable({
    data,
    isLoading,
}: EmployeeDataTableProps) {
    const columnHelper = createColumnHelper<any>()
    const { data: OptionList } = useGetUserOptions({ hasEmpty: false })
    const EmployeeColumns = [
        columnHelper.display({
            id: 'select',
            header: ({ table }) => <SelectHeader table={table} />,
            cell: ({ row }) => <SelectCell row={row} />,
        }),
        columnHelper.accessor('Employee_Name', {
            header: ({ column }) => {
                const { t } = useTranslation('user')
                const { setFalse, setTrue } = useBoolean(true)
                const [_, setPage] = useQueryState('page', parseAsInteger)
                const [name, setName] = useQueryState('employee_name', {
                    defaultValue: '',
                    clearOnDefault: true,
                })
                const debouncedFun = useDebouncedCallback((value: string) => {
                    setName(value)
                    setPage(DEFAULT_PAGE)
                }, 500)
                const searchNameHandler = (
                    e: ChangeEvent<HTMLInputElement>,
                ) => {
                    debouncedFun(e.target.value)
                }
                return (
                    <section className="flex justify-center items-center gap-2">
                        <SortButton
                            column={column}
                            columnName="Employee_Name"
                        />
                        <DataTableColumnInput
                            onMouseDown={() => setFalse()}
                            onMouseOut={() => setTrue()}
                            placeholder={t('table.filter.name')}
                            containerClassName={'w-[150px] xl:w-[200px]'}
                            onChange={searchNameHandler}
                            defaultValue={name}
                        />
                    </section>
                )
            },
            cell: ({ row }) => {
                return (
                    <EmployeeAvatar
                        userName={row.original.Employee_No}
                        fullName={row.original.Employee_Name as string}
                        image={row.original.ePhoto}
                    />
                )
            },
        }),
        columnHelper.accessor('Employee_No', {
            header: ({ column }) => {
                const { t } = useTranslation('user')
                const [name, setName] = useQueryState('employee_no', {
                    defaultValue: '',
                    clearOnDefault: true,
                })
                const [_, setPage] = useQueryState('page', parseAsInteger)
                const debouncedFun = useDebouncedCallback((value: string) => {
                    setName(value)
                    setPage(DEFAULT_PAGE)
                }, 500)
                const searchNameHandler = (
                    e: ChangeEvent<HTMLInputElement>,
                ) => {
                    debouncedFun(e.target.value)
                }
                return (
                    <section className="flex justify-center items-center gap-2">
                        <SortButton column={column} columnName="Employee_No" />
                        <DataTableColumnInput
                            placeholder={t('table.filter.no')}
                            containerClassName={'w-[150px] xl:w-[200px]'}
                            onChange={searchNameHandler}
                            defaultValue={name}
                        />
                    </section>
                )
            },
            cell: ({ row }) => {
                const Employee_No = row.getValue('Employee_No') as string
                return <span className="px-0">{Employee_No}</span>
            },
        }),
        columnHelper.accessor('Branch_Name', {
            header: ({ column }) => {
                const { t } = useTranslation('user')
                return (
                    <section className="flex justify-center items-center gap-2">
                        <SortButton column={column} columnName="Branch_Name" />
                        <div className="w-[100px] xl:w-[150px]">
                            <CardDataTableDropdown
                                options={OptionList?.Branch ?? []}
                                title={t('table.filter.branch')}
                                columnName="branch_id"
                            />
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const Branch_Name = row.getValue('Branch_Name') as string
                return <span className="px-0">{Branch_Name}</span>
            },
        }),
        columnHelper.accessor('Department_Name', {
            header: ({ column }) => {
                const { t } = useTranslation('user')
                return (
                    <section className="flex justify-center items-center gap-2">
                        <SortButton
                            column={column}
                            columnName="Department_Name"
                        />
                        <div className="w-[180px] xl:w-[200px]">
                            <CardDataTableDropdown
                                options={OptionList?.Department ?? []}
                                title={t('table.filter.department')}
                                columnName="department_id"
                            />
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const Department_Name = row.getValue(
                    'Department_Name',
                ) as string
                return <span className="px-0">{Department_Name}</span>
            },
        }),
        columnHelper.accessor('Position_Name', {
            header: ({ column }) => {
                const { t } = useTranslation('user')
                return (
                    <section className="flex justify-center items-center gap-2">
                        <SortButton
                            column={column}
                            columnName="Position_Name"
                        />
                        <div className="w-[150px] xl:w-[200px]">
                            <CardDataTableDropdown
                                options={OptionList?.Position ?? []}
                                title={t('table.filter.position')}
                                columnName="position_id"
                            />
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const Position_Name = row.getValue('Position_Name') as string
                return <span className="px-0">{Position_Name}</span>
            },
        }),
        columnHelper.accessor('Role_Name', {
            header: ({ column }) => {
                const { t } = useTranslation('user')
                return (
                    <section className="flex justify-center items-center gap-2">
                        <SortButton column={column} columnName="Role_Name" />
                        <div className="w-[100px] xl:w-[150px]">
                            <CardDataTableDropdown
                                options={OptionList?.Role ?? []}
                                title={t('table.filter.role')}
                                columnName="role_id"
                            />
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                const Role_Name = row.getValue('Role_Name') as string
                return <span className="px-0">{Role_Name}</span>
            },
        }),
        columnHelper.accessor('IsActive', {
            header: ({ column }) => {
                const { t } = useTranslation('user')
                return (
                    <section className="flex justify-start items-center gap-2">
                        <SortButton columnName="IsActive" column={column} />
                        <div className="w-4">
                            <StatusFilter
                                align="center"
                                options={STATUS_LABELS}
                                column={column}
                                title={t('table.filter.status')}
                            />
                        </div>
                    </section>
                )
            },
            cell: ({ row }) => {
                // const { t } = useTranslation('user')
                const IsActive = row.getValue('IsActive') as boolean
                return (
                    <>
                        {IsActive === true ? (
                            <ActiveBadge />
                        ) : (
                            <InactiveBadge />
                        )}
                    </>
                )
            },
        }),
        columnHelper.display({
            id: 'action',
            header: () => {
                const { t } = useTranslation('user')
                return (
                    <div className="h-full bg-zinc-50 flex items-center justify-center">
                        <p className="font-bold text-zinc-500 text-center">
                            {t('form.action')}
                        </p>
                    </div>
                )
            },
            cell: ({ row }) => {
                const { value, toggle, setFalse } = useBoolean(false)
                const { t } = useTranslation('user')
                const router = useRouter()
                const handleDeleteModal = () => {
                    toggle()
                }
                const { selectedMenu } = menuStore()
                const pathname = usePathname()
                const childMenus = selectedMenu?.children?.flatMap(
                    (menu: any) => menu,
                )

                const currentChildMenu: UserMenuInterface = childMenus?.find(
                    (menu: any) => {
                        return pathname === `/${menu.Web_URL}`
                    },
                )

                return (
                    <div className={'flex justify-center w-[80px]'}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="primary"
                                    className="h-8 w-7 p-0 bg-primary-600 rounded-md hover:bg-primary-500"
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4 rotate-90" />
                                </Button>
                            </DropdownMenuTrigger>
                            {currentChildMenu.is_edit ||
                            currentChildMenu.is_delete ? (
                                <DropdownMenuContent align="center">
                                    {currentChildMenu.is_edit ? (
                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.push(
                                                    `./user/edit-user/${row.original.Employee_ID}`,
                                                )
                                            }
                                        >
                                            {t('table.action.edit')}
                                        </DropdownMenuItem>
                                    ) : null}
                                    {currentChildMenu.is_delete ? (
                                        <DropdownMenuItem
                                            disabled={
                                                !currentChildMenu?.is_delete
                                            }
                                            onClick={handleDeleteModal}
                                        >
                                            {t('table.action.delete')}
                                        </DropdownMenuItem>
                                    ) : null}
                                </DropdownMenuContent>
                            ) : null}
                        </DropdownMenu>
                        <UserDeleteModal
                            open={value}
                            toggle={toggle}
                            setFalse={setFalse}
                            deleteInfo={{
                                Employee_Name: row.original.Employee_Name,
                                User_ID: row.original.User_ID,
                            }}
                            currentMenu={currentChildMenu}
                            previousData={{
                                User_ID: row.original.User_ID,
                                IsActive: row.original.IsActive,
                                Employee_ID: row.original.Employee_ID,
                                Role_ID: row.original.Role_ID,
                            }}
                        />
                    </div>
                )
            },
        }),
    ]

    return (
        <div className="employee-data-table">
            <DataTable
                loading={isLoading}
                columns={EmployeeColumns}
                data={data}
                className={'with-action-column with-select'}
            />
        </div>
    )
}
