'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, PlusIcon } from 'lucide-react'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useBoolean, useDebounceCallback } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'

import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import { getMenuName, STATUS_LABELS } from '@/lib/utils'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Paging from '@/components/common/pagers/pagination'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { DataTable } from '@/components/data-table/data-table-two'
import { useDeleteRole, useRoles } from '@/service/query-hooks/use-roles'
import useUserCookie from '@/hooks/use-user'
import menuStore from '@/state/zustand/menu'
import { deleteAudit, getAudit } from '@/lib/audit-trail-api'
import useToast from '@/hooks/use-toast'
import { Confirm } from '@/components/common/modal/confirm'
import SelectHeader from '../data-table/select-header'
import SelectCell from '../data-table/select-cell'
import SortButton from '@/components/data-table/sort-button'
import { StatusFilter } from '@/components/setting/status-filter'

type Role = {
    role_id: number
    role_name: string
    RoleDescription: string
    edited_date: string
    created_by: number
    created_date: string
    edited_by: number
    is_active: boolean
    tenant_id: number
    IsAdmin: boolean
    Action?: any
}

const RoleListTable = () => {
    const route = useRouter()
    const user = useUserCookie()
    const { t } = useTranslation('roleList')
    const { showNotification } = useToast()

    const { data, isLoading, isError, refetch } = useRoles()
    const [name, setName] = useQueryState('name', {
        defaultValue: '',
        clearOnDefault: true,
    })

    console.log('This is role');
    console.log({ data });
    console.log('This is role');

    const { deleteById, isPending } = useDeleteRole()

    const {
        value: openDeleteModal,
        toggle,
        setTrue,
        setFalse,
    } = useBoolean(false)

    const [selectedRole, setSelectedRole] = useState<null | any>(null)
    const selectedMenu = menuStore((state) => state.selectedMenu)
    const selectedSubMenu = menuStore((state) => state.selectedSubMenu)

    const roleList = useMemo(
        () => (data ? data.data.map((d) => ({ ...d, id: d?.role_id })) : []),
        [data],
    )
    const memorizedData = useMemo(() => data, [data])
    const debouncedFun = useDebounceCallback(setName, 700)

    const pageMeta: any = data ? data.meta : null

    //audit
    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.Employee_Name!,
    //     Page_Name: 'role Register',
    //     Parent_Menu_ID: selectedMenu?.menu_id!,
    //     Sub_Menu_ID: selectedSubMenu?.menu_id!,
    // }

    // useEffect(() => {
    //     if (data && selectedMenu?.menu_id && selectedSubMenu?.parent_menu_id) {
    //         getAudit({
    //             ...auditPayload,
    //             Detail: data?.data,
    //             Record_Name: 'Job Categories',
    //         })
    //     }
    // }, [
    //     memorizedData,
    //     selectedSubMenu?.parent_menu_id,
    //     selectedMenu?.menu_id,
    //     data,
    // ])
    //audit

    const updateFilterName = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedFun(e.target.value)
    }
    const handleDeleteRole = (role: any) => {
        setTrue()
        setSelectedRole(role)
    }

    // const handleStatusFilter = (data: Set<string>) => {
    //     const isActive = String(data.has(STATUS_LABELS[0]['value']))

    //     if (data.size > 0) {
    //         setActive(String(isActive))
    //     } else if (data.size === 0) {
    //         setActive(null)
    //     }
    // }

    const columns: ColumnDef<any>[] = [
        {
            id: 'select',
            header: ({ table }) => <SelectHeader table={table} />,
            cell: ({ row }) => <SelectCell row={row} />,
        },
        {
            accessorKey: 'role_name',
            id: 'role_name',
            header: ({ column }) => (
                <section className="flex justify-between items-center gap-2">
                    <SortButton column={column} columnName="role_name" />
                    <DataTableColumnInput
                        name="role-name"
                        placeholder={t('role')}
                        containerClassName={'flex-1'}
                        onChange={updateFilterName}
                        defaultValue={name}
                    />
                </section>
            ),
            cell: ({ row }) => {
                const Role_Name = row.getValue('role_name') as string
                return <span className="px-2">{Role_Name}</span>
            },
        },
        {
            accessorKey: 'is_active',
            size: 100,
            header: ({ column }) => (
                <div className="flex justify-between items-center gap-2">
                    <SortButton column={column} columnName="is_active" />
                    <StatusFilter
                        align="center"
                        options={STATUS_LABELS}
                        column={column}
                        title={t('status')}
                    />
                    <div className={'w-8'} />
                </div>
            ),
            cell: ({ row }) => {
                const status = row.getValue('is_active') as string
                return (
                    <div className="">
                        {status ? <ActiveBadge /> : <InactiveBadge />}
                    </div>
                )
            },
        },
        {
            accessorKey: 'action',
            id: 'action',
            header: () => {
                return (
                    <div className="h-full bg-zinc-50 flex items-center justify-center">
                        <p className="font-bold text-zinc-500 text-center">
                            {t('action')}
                        </p>
                    </div>
                )
            },
            cell: ({ row }) => {
                const roleId = row.original.role_id as unknown as string
                const role = row.original

                return (
                    <div className={'flex justify-center'}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="">
                                <Button
                                    variant="primary"
                                    className="h-8 w-7 p-0 bg-primary-600 rounded-md hover:bg-primary-500"
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4 rotate-90" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                {selectedSubMenu?.is_edit ? (
                                    <a
                                        href={`/user-and-access/role-register/edit-role/${roleId}`}
                                    >
                                        <DropdownMenuItem>
                                            {t('edit')}
                                        </DropdownMenuItem>
                                    </a>
                                ) : null}
                                {selectedSubMenu?.is_delete ? (
                                    <DropdownMenuItem
                                        onClick={() => handleDeleteRole(role)}
                                    >
                                        {t('delete')}
                                    </DropdownMenuItem>
                                ) : null}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]

    const handleNavigateAddNew = () => {
        route.push('/user-and-access/role-register/add-user-role')
    }

    const handleConfirmDelete = () => {
        deleteById(String(selectedRole?.role_id), {
            onSuccess: (createdRes) => {
                // showNotification
                showNotification({
                    message: createdRes.message,
                    type: 'success',
                })
                // create audit
                // deleteAudit({
                //     ...auditPayload,
                //     ValueBefore: selectedRole,
                //     Record_Name: selectedRole.Role_Name,
                // })
                setTimeout(() => {
                    refetch()
                }, 10)
                setFalse()
            },
        })
    }

    if (isError) return <div>Error ....</div>

    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    {
                        title: selectedMenu ? getMenuName(selectedMenu) : '',
                        href: '/setting',
                    },
                    {
                        title: selectedSubMenu
                            ? getMenuName(selectedSubMenu)
                            : '',
                        href: '',
                    },
                ]}
            />

            <div className="py-4 w-full max-w-full overflow-auto setting-data-table">
                <div className="flex justify-between mb-4">
                    <h2 className="font-bold text-2xl">{t('title')}</h2>
                    {selectedSubMenu?.is_write ? (
                        <Button
                            variant="primary"
                            className="font-normal gap-1 text-sm h-9 px-4 py-3"
                            onClick={handleNavigateAddNew}
                        >
                            <PlusIcon className="size-4" />
                            <span className="hidden md:block">
                                {t('add-new')}
                            </span>
                        </Button>
                    ) : null}
                </div>
                <DataTable
                    key={data?.data ? data?.data?.length + ' ' : 'hi'}
                    loading={isLoading}
                    className="with-action-column with-select"
                    columns={columns}
                    data={roleList}
                />

                {!!data && data?.data?.length > 0 ? (
                    <Paging
                        loading={isLoading}
                        currentPage={pageMeta?.current_page}
                        perPage={pageMeta?.per_page}
                        totalCount={pageMeta?.total_count}
                    />
                ) : null}

                {openDeleteModal ? (
                    <Confirm
                        fun={handleConfirmDelete}
                        open={openDeleteModal}
                        toggle={toggle}
                        title={t('delete-title')}
                        message={t('delete-des')}
                        isLoading={isPending}
                    />
                ) : null}
            </div>
        </section>
    )
}

export default RoleListTable
