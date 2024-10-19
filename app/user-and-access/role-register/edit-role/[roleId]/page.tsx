'use client'

import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useMediaQuery } from 'usehooks-ts'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import ModulePermissionForm from '@/components/role/module-permission-form'
import RoleEntryForm from '@/components/role/role-entry-form'
import useUser from '@/hooks/use-user'
import useUserCookie from '@/hooks/use-user'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { useEditRole, useGetRoleById } from '@/service/query-hooks/use-roles'
import isAuth from '@/components/auth/components/protected-route'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import menuStore from '@/state/zustand/menu'
import useToast from '@/hooks/use-toast'
import { updateAudit } from '@/lib/audit-trail-api'
import {
    getChangesFromTwoObjects,
    getMenuName,
    queryStringGenerator,
} from '@/lib/utils'

const EmployeePermissionTable = dynamic(
    () => import('@/components/role/employee-permission-table'),
    { ssr: false },
)

const PermissionTypesToNumber: { [index: string]: any } = {
    Myself: 1,
    Other: 2,
    'Myself+Other': 3,
    All: 4,
}

function EditRolePage({ params: { roleId } }: { params: { roleId: string } }) {
    const { data: roleData, status, isLoading } = useGetRoleById(roleId)
    const router = useRouter()
    const isMobile = useMediaQuery('(max-width:480px)')
    const [selectedRows, setSelectedRows] = useState<any[]>([])
    const [selectedMainMenus, setSelectedMainMenus] = useState<number[]>([])
    const userData = useUser()

    const { t } = useTranslation('roleEdit')

    const RoleEntrySchema = yup.object({
        role_name: yup.string().trim().required('').max(50, t('maxError')),
        description: yup.string(),
        'setup-adm': yup.boolean(),
        IsActive: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(RoleEntrySchema),
        defaultValues: {
            IsActive: false,
            description: '',
            role_name: '',
            'setup-adm': false,
        },
    })

    const watchIsAdmin = form.watch('setup-adm')

    const user = useUserCookie()
    const selectedMenu = menuStore((state) => state.selectedMenu)
    const selectedSubMenu = menuStore((state) => state.selectedSubMenu)
    const { showNotification } = useToast()

    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: 'role Register',
    //     Parent_Menu_ID: selectedMenu?.menu_id!,
    //     Sub_Menu_ID: selectedSubMenu?.menu_id!,
    // }

    useEffect(() => {
        if (status === 'success') {
            if (roleData?.data?.role) {
                const roleDataObj = roleData?.data?.role

                form.setValue('role_name', roleDataObj?.role_name ?? '')
                form.setValue('description', roleDataObj?.description ?? '')
                form.setValue('IsActive', roleDataObj?.is_active ?? false)
                form.setValue('setup-adm', roleDataObj?.is_admin ?? false)
            }

            if (roleData?.data?.menu && !watchIsAdmin) {
                const menuDataObj = roleData?.data?.menu

                const selectedMenuIds = menuDataObj?.map(
                    (menu: any) => menu?.menu_id,
                )
                setSelectedMainMenus(selectedMenuIds)

                menuDataObj?.forEach((menu: any) => {
                    if (menu?.menu_id) {
                        const idKey = `ID-${menu?.menu_id}` as unknown as string
                        // @ts-ignore
                        form.setValue(idKey, true)
                    } else {
                        const idKey = `ID-${menu?.menu_id}` as unknown as string
                        // @ts-ignore
                        form.setValue(idKey, false)
                    }

                    // IsRead
                    if (menu?.is_read && menu?.menu_id) {
                        const idKey =
                            `ID-${menu?.menu_id}/is_read` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, true)
                    } else {
                        const idKey =
                            `ID-${menu?.menu_id}/is_read` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, false)
                    }
                    if (menu?.read_type && menu?.menu_id) {
                        const typeKey =
                            `ID-${menu?.menu_id}/is_read_type` as unknown as string
                        // @ts-ignore
                        const typeNumber =
                            PermissionTypesToNumber[menu?.read_type]
                        // @ts-ignore
                        form.setValue(typeKey, typeNumber)
                    }

                    // IsWrite
                    if (menu?.is_write && menu?.menu_id) {
                        const idKey =
                            `ID-${menu?.menu_id}/is_write` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, true)
                    } else {
                        const idKey =
                            `ID-${menu?.menu_id}/is_write` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, false)
                    }
                    if (menu?.write_type && menu?.menu_id) {
                        const typeKey =
                            `ID-${menu?.menu_id}/is_write_type` as unknown as string
                        // @ts-ignore
                        const typeNumber =
                            PermissionTypesToNumber[menu?.write_type]
                        // @ts-ignore
                        form.setValue(typeKey, typeNumber)
                    }

                    // IsEdit
                    if (menu?.is_edit && menu?.menu_id) {
                        const idKey =
                            `ID-${menu?.menu_id}/is_edit` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, true)
                    } else {
                        const idKey =
                            `ID-${menu?.menu_id}/is_edit` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, false)
                    }
                    if (menu?.edit_type && menu?.menu_id) {
                        const typeKey = `ID-${menu?.menu_id}/is_edit_type`
                        // @ts-ignore
                        const typeNumber =
                            PermissionTypesToNumber[menu?.edit_type]
                        // @ts-ignore
                        form.setValue(typeKey, typeNumber)
                    }

                    // IsDelete
                    if (menu?.is_delete && menu?.menu_id) {
                        const idKey =
                            `ID-${menu?.menu_id}/is_delete` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, true)
                    } else {
                        const idKey =
                            `ID-${menu?.menu_id}/is_delete` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, false)
                    }

                    if (menu?.delete_type && menu?.menu_id) {
                        const typeKey =
                            `ID-${menu?.menu_id}/is_delete_type` as unknown as string
                        // @ts-ignore
                        const typeNumber =
                            PermissionTypesToNumber[menu?.delete_type]
                        // @ts-ignore
                        form.setValue(typeKey, typeNumber)
                    }

                    // IsImport
                    if (menu?.is_import && menu?.menu_id) {
                        const idKey =
                            `ID-${menu?.menu_id}/is_import` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, true)
                    } else {
                        const idKey =
                            `ID-${menu?.menu_id}/is_import` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, false)
                    }

                    // IsExport
                    if (menu?.is_import && menu?.menu_id) {
                        const idKey =
                            `ID-${menu?.menu_id}/is_export` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, true)
                    } else {
                        const idKey =
                            `ID-${menu?.menu_id}/is_export` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, false)
                    }

                    // IsGrant
                    if (menu?.is_grant && menu?.menu_id) {
                        const idKey =
                            `ID-${menu?.menu_id}/is_grant` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, true)
                    } else {
                        const idKey =
                            `ID-${menu?.menu_id}/is_grant` as unknown as boolean
                        // @ts-ignore
                        form.setValue(idKey, false)
                    }
                })
            }

            if (roleData?.data?.emp_permission) {
                let modifiedEmployees: any[] = []

                roleData?.data?.emp_permission?.forEach((emp: any) => {
                    const filterCombination = queryStringGenerator({
                        branch_id: emp?.branch_id,
                        company_id: emp?.company_id,
                        department_id: emp?.department_id,
                        employee_id: emp?.employee_id,
                        location_id: emp?.location_id,
                        position_id: emp?.position_id,
                        section_id: emp?.section_id,
                    })

                    const ALL =
                        emp.company_id === 999999 &&
                        emp.location_id === 999999 &&
                        emp.branch_id === 999999 &&
                        emp.department_id === 999999 &&
                        emp.section_id === 999999 &&
                        emp.employee_id === 999999

                    emp['ALL'] = ALL
                    emp['key'] = filterCombination

                    if (!ALL)
                        modifiedEmployees.push({ ...emp, id: emp?.employee_id })
                })
                setSelectedRows(modifiedEmployees)
            }
        }
    }, [status, roleData])

    const { edit: updateRole, isPending } = useEditRole({ roleId })

    const PermissionNumberToTypes = {
        1: 'Myself',
        2: 'Other',
        3: 'Myself+Other',
        4: 'All',
    }

    const onSubmitHandler = (data: any) => {
        const selectedMenuIds: any = []
        const MenuArray: any[] = []
        const isAdmin = data['setup-adm'] ? data['setup-adm'] : false

        for (const key in data) {
            if (
                data[key] === true &&
                key.startsWith('ID-') &&
                !key.includes('/is')
            ) {
                const id = key.split('-')[1]
                selectedMenuIds.push(id)
            }
        }

        !isAdmin &&
            selectedMenuIds.forEach((menuId: string) => {
                const obj: any = {}
                obj.menu_id = Number(menuId)
                if (userData && userData.tenant_id) {
                    obj.tenant_id = userData.tenant_id
                }

                // check IsRead
                if (data[`ID-${menuId}/is_read`]) {
                    obj['is_read'] = true
                } else {
                    obj['is_read'] = false
                }

                // check ReadType
                if (data[`ID-${menuId}/is_read_type`]) {
                    const typeLev = data[`ID-${menuId}/is_read_type`] as string
                    // @ts-ignore
                    obj['read_type'] = PermissionNumberToTypes[typeLev]
                } else {
                    obj['read_type'] = null
                }

                // check IsWrite
                if (data[`ID-${menuId}/is_write`]) {
                    obj['is_write'] = true
                } else {
                    obj['is_write'] = false
                }

                // check IsWrite
                if (
                    data[`ID-${menuId}/is_write_type`] &&
                    data[`ID-${menuId}/is_write`]
                ) {
                    const typeLev = data[`ID-${menuId}/is_write_type`] as string
                    // @ts-ignore
                    obj['write_type'] = PermissionNumberToTypes[typeLev]
                } else {
                    obj['write_type'] = null
                }

                // check IsEdit
                if (data[`ID-${menuId}/is_edit`]) {
                    obj['is_edit'] = true
                } else {
                    obj['is_edit'] = false
                }

                // check Edit_Type
                if (
                    data[`ID-${menuId}/is_edit_type`] &&
                    data[`ID-${menuId}/is_edit`]
                ) {
                    const typeLev = data[`ID-${menuId}/is_edit_type`] as string
                    // @ts-ignore
                    obj['edit_type'] = PermissionNumberToTypes[typeLev]
                } else {
                    obj['edit_type'] = null
                }

                // check IsDelete
                if (data[`ID-${menuId}/is_delete`]) {
                    obj['is_delete'] = true
                } else {
                    obj['is_delete'] = false
                }

                // check Delete_Type
                if (
                    data[`ID-${menuId}/is_delete_type`] &&
                    data[`ID-${menuId}/is_delete`]
                ) {
                    const typeLev = data[
                        `ID-${menuId}/is_delete_type`
                    ] as string
                    // @ts-ignore
                    obj['delete_type'] = PermissionNumberToTypes[typeLev]
                } else {
                    obj['delete_type'] = null
                }

                // check IsImport
                if (data[`ID-${menuId}/is_import`]) {
                    obj['is_import'] = true
                } else {
                    obj['is_import'] = false
                }

                // check Import_Type
                if (
                    data[`ID-${menuId}/is_import_type`] &&
                    data[`ID-${menuId}/is_import`]
                ) {
                    const typeLev = data[
                        `ID-${menuId}/is_import_type`
                    ] as string
                    // @ts-ignore
                    obj['import_type'] = PermissionNumberToTypes[typeLev]
                } else {
                    obj['import_type'] = null
                }

                // check IsExport
                if (data[`ID-${menuId}/is_export`]) {
                    obj['is_export'] = true
                } else {
                    obj['is_export'] = false
                }

                // check Import_Type
                if (
                    data[`ID-${menuId}/is_export_type`] &&
                    data[`ID-${menuId}/is_export`]
                ) {
                    const typeLev = data[
                        `ID-${menuId}/is_export_type`
                    ] as string
                    // @ts-ignore
                    obj['export_type'] = PermissionNumberToTypes[typeLev]
                } else {
                    obj['export_type'] = null
                }

                if (data[`ID-${menuId}/is_grant`]) {
                    obj['is_grant'] = true
                } else {
                    obj['is_grant'] = false
                }

                MenuArray.push(obj)
            })

        const EmpPermission = !isAdmin
            ? selectedRows.map((emp: any) => ({
                  branch_id: emp?.branch_id,
                  company_id: emp?.company_id,
                  department_id: emp?.department_id,
                  employee_id: emp?.employee_id,
                  location_id: emp?.location_id,
                  section_id: emp?.section_id,
              }))
            : [
                  {
                      branch_id: 999999,
                      company_id: 999999,
                      department_id: 999999,
                      employee_id: 999999,
                      location_id: 999999,
                      position_id: 999999,
                      section_id: 999999,
                  },
              ]

        const payload = {
            role: {
                role_name: data.role_name,
                description: data.description,
                is_active: data.IsActive,
            },
            menu: MenuArray,
            emp_permission: EmpPermission,
            is_admin: isAdmin,
        }

        // const { afterValue, beforeValue } = getChangesFromTwoObjects(
        //     roleData?.data?.result,
        //     payload,
        // )

        updateRole(
            { payload, roleId },
            {
                onSuccess: (updateREs) => {
                    // showNoti
                    showNotification({
                        message: updateREs.message,
                        type: 'success',
                    })
                    // create audit
                    // updateAudit({
                    //     ...auditPayload,
                    //     ValueBefore: beforeValue,
                    //     ValueAfter: afterValue,
                    //     Record_Name: payload.Role.Role_Name,
                    // })
                    router.back()
                },
                onError: (data) => {
                    showNotification({ message: data.message, type: 'danger' })
                },
            },
        )
    }

    const handleGoBack = () => router.back()

    return (
        <section className="p-4 md:px-6">
            <Breadcrumbs
                truncationLength={isMobile ? 6 : 0}
                segments={[
                    {
                        title: selectedMenu
                            ? getMenuName(selectedMenu)
                            : 'User and Access',
                        href: `/user-and-access`,
                    },
                    {
                        title: selectedSubMenu
                            ? getMenuName(selectedSubMenu)
                            : 'role Register',
                        href: '/user-and-access/role-register',
                    },
                    {
                        title: t('edit-role'),
                        href: '',
                    },
                ]}
            />

            <p className="text-[24px] font-bold mt-[28px] mb-[34px] ">
                {t('title')}
            </p>

            <FormProvider {...form}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmitHandler)}
                        className="space-y-6"
                    >
                        <Accordion
                            type="multiple"
                            className="w-full mb-6 space-y-6 hover:no-underline"
                            defaultValue={['role-entry']}
                        >
                            <AccordionItem
                                value="role-entry"
                                className="border-0 bg-primary-50 rounded-2xl border-t border-t-primary-200 border-r-0 border-l-0 hover:no-underline"
                            >
                                <AccordionTrigger className="px-[16px] md:px-[40px] rouned">
                                    <span className="font-semibold">
                                        {t('role-entry')}
                                    </span>
                                </AccordionTrigger>

                                <AccordionContent
                                    value="role"
                                    className="bg-white px-4"
                                >
                                    <RoleEntryForm />
                                </AccordionContent>
                            </AccordionItem>

                            {watchIsAdmin === false ? (
                                <AccordionItem
                                    value="module-list"
                                    className="border-0 bg-primary-50 rounded-[6px] border-t border-t-primary-200 border-r-0 border-l-0 hover:no-underline"
                                >
                                    <AccordionTrigger className="px-[16px] md:px-[40px] rouned">
                                        <span className="font-semibold">
                                            {t('module-list')}
                                        </span>
                                    </AccordionTrigger>

                                    <AccordionContent
                                        value="role"
                                        className="bg-white px-4 py-8"
                                    >
                                        {!isLoading ? (
                                            <ModulePermissionForm
                                                selectedMainMenus={
                                                    selectedMainMenus
                                                }
                                                setSelectedMainMenus={
                                                    setSelectedMainMenus
                                                }
                                            />
                                        ) : (
                                            <Skeleton className="h-12 w-full rounded-md" />
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ) : null}

                            {watchIsAdmin === false ? (
                                <>
                                    {!isLoading ? (
                                        <EmployeePermissionTable
                                            selectedRows={selectedRows}
                                            setSelectedRows={setSelectedRows}
                                        />
                                    ) : (
                                        <Skeleton className="h-12 w-full rounded-md" />
                                    )}
                                </>
                            ) : null}
                        </Accordion>

                        <div className="flex gap-4 justify-end">
                            <Button
                                loading={isPending}
                                variant="primary"
                                className="px-9 py-2 md:px-12 md:py-3"
                                type="submit"
                            >
                                {t('update-save')}
                            </Button>
                            <Button
                                variant="outline"
                                className="px-9 py-2 md:px-12 md:py-3"
                                onClick={handleGoBack}
                            >
                                {t('cancel')}
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormProvider>
        </section>
    )
}

export default isAuth(EditRolePage)
