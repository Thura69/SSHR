'use client'
import isAuth from '@/components/auth/components/protected-route'
import EmployeeCardTable from '@/components/user-and-access/card-list/employee-card-table'
import EmployeeDataTable from '@/components/employee-list/table-list/employee-data-table'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination'
import { Button } from '@/components/ui/button'
import TableToggle from '@/components/user-and-access/components/table-toggle'
import {
    useDeleteUsers,
    useGetAllUsers,
} from '@/service/query-hooks/user-and-access/user/use-user'
import { PlusIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { useBoolean } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'
import useMenu from '@/state/zustand/menu'

import useUserStore, { viewTypeEnum } from '@/state/zustand/user'
import EmployeeFilterBar from '@/components/user-and-access/card-list/employee-filter-bar'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import useUserCookie from '@/hooks/use-user'
import { deleteAudit } from '@/lib/audit-trail-api'
import useToast from '@/hooks/use-toast'
import PageLoader from '@/components/common/loaders/page-loader'
import { UserMenuInterface } from '@/types/user-and-access/user'

const UserPage = () => {
    const { selectedMenu, setSelectedGrandSubMenu, setSelectedGrandSubMenuId } =
        useMenu()

    const pathname = usePathname()
    const childMenus = selectedMenu?.children?.flatMap((menu: any) => menu)

    const currentChildMenu: UserMenuInterface = childMenus?.find(
        (menu: any) => {
            return pathname === `/${menu.web_url}`
        },
    )
    const { showNotification } = useToast()
    const { value: dValue, toggle: dToggle } = useBoolean(false)

    const { deleteById, isPending } = useDeleteUsers()
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const user = useUserCookie()

    useEffect(() => {
        if (currentChildMenu) {
            setSelectedGrandSubMenuId(currentChildMenu?.menu_id)
            setSelectedGrandSubMenu(currentChildMenu)
        }
    }, [currentChildMenu])

    const selectedView = useUserStore((state) => state.viewType)
    const setSelectedView = useUserStore((state) => state.setViewType)
    const [deleteInfo, setDeleteInfo] = React.useState<{
        employee_name?: string
        user_id?: number
        employee_id?: number
        role_id?: number
        description?: string
        is_active?: boolean
        company_id?: number
    }>({})
    const handleSelect = (value: viewTypeEnum) => {
        setSelectedView(value)
    }
    const { t } = useTranslation('user')
    const router = useRouter()
    const { data, isLoading, isError } = useGetAllUsers()
    const handleEmployee_ID = (data: {
        employee_name?: string
        user_id?: number
        employee_id?: number
        role_id?: number
        description?: string
        is_active?: boolean
        company_id?: number
    }) => {
        setDeleteInfo(data)
    }

    console.log('This is user')
    console.log({ data })
    console.log('This is user')

    const memorizedData = useMemo(() => {
        return data
    }, [data])
    const modifiedData = useMemo(
        () => ({
            data:
                data?.data.map((d: any) => ({ ...d, id: d?.Employee_ID })) ??
                [],
        }),
        [data],
    )

    if (isError)
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-bold">Error...</p>
            </div>
        )
    const handleDelete = () => {
        // const auditPayload = {
        //     Is_Mobile: false,
        //     Emp_Name: user?.employee_name!,
        //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
        //     Parent_Menu_ID: selectedMenuId!,
        //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
        // }
        deleteById(`${deleteInfo?.user_id}`, {
            onSuccess: (data) => {
                if (!isPending) {
                    // deleteAudit({
                    //     ...auditPayload,
                    //     ValueBefore: deleteInfo,
                    //     Record_Name: 'Delete User',
                    // })
                    dToggle()
                }
                showNotification({
                    message: data.message,
                    type: 'success',
                })
            },
            onError: (error) => {
                showNotification({
                    message: error.message,
                    type: 'danger',
                })
            },
        })
    }

    return (
        <section className="w-full p-4 px-6">
            <section className="flex justify-between items-center">
                <Breadcrumbs
                    segments={[
                        {
                            title: t('breadcrumb.first'),
                            href: '/user-and-access',
                        },
                        {
                            title: t('breadcrumb.second'),
                            href: ``,
                        },
                    ]}
                >
                    {' '}
                </Breadcrumbs>
                <TableToggle
                    size="sm"
                    defaultValue={selectedView}
                    setSelected={handleSelect}
                ></TableToggle>
            </section>

            <div className="flex flex-row justify-between py-5">
                <div>
                    <h1 className="text-2xl font-bold text-left">
                        {t('table.title')}
                    </h1>
                </div>

                {currentChildMenu?.is_write ? (
                    <div className="flex justify-center items-center">
                        <Button
                            variant="primary"
                            className="font-normal gap-1 text-sm h-9 px-4 py-3"
                            onClick={() =>
                                router.push('/user-and-access/user/add-user')
                            }
                        >
                            <PlusIcon className="size-4" />
                            <span className="hidden md:block">
                                {t('table.add')}
                            </span>
                        </Button>
                    </div>
                ) : null}
            </div>
            <>
                {selectedView === 'Card' ? <EmployeeFilterBar /> : null}
                {selectedView === 'Card' && !isLoading ? (
                    <>
                        <EmployeeCardTable
                            permission={{
                                IsDelete: currentChildMenu?.is_delete,
                                IsEdit: currentChildMenu?.is_edit,
                            }}
                            data={data.data || []}
                            toggle={dToggle}
                            handleEmployee_ID={handleEmployee_ID}
                        ></EmployeeCardTable>
                    </>
                ) : selectedView === 'List' ? (
                    <EmployeeDataTable
                        data={modifiedData.data}
                        isLoading={isLoading}
                    />
                ) : selectedView === 'Card' && isLoading ? (
                    <PageLoader></PageLoader>
                ) : null}
            </>
            {memorizedData &&
            memorizedData.meta &&
            memorizedData.meta.totalCount > 0 ? (
                <Paging
                    currentPage={memorizedData.meta.currentPage}
                    perPage={memorizedData.meta.perPage}
                    totalCount={memorizedData.meta.totalCount}
                />
            ) : (
                ''
            )}

            <DeleteConfirm
                message={t('modal.delete.description')}
                title={t('modal.delete.title')}
                isLoading={isPending}
                toggle={dToggle}
                open={dValue}
                fun={handleDelete}
            />
        </section>
    )
}

export default isAuth(UserPage)
