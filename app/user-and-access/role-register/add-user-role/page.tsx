'use client'

import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import React, { useState } from 'react'
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
import isAuth from '@/components/auth/components/protected-route'
import { useCreateRole } from '@/service/query-hooks/use-roles'
import { useRouter } from 'next/navigation'
import menuStore from '@/state/zustand/menu'
import { createAudit } from '@/lib/audit-trail-api'
import useToast from '@/hooks/use-toast'
import { getMenuName } from '@/lib/utils'

const EmployeePermissionTable = dynamic(
    () => import('@/components/role/employee-permission-table'),
    { ssr: false },
)

function AddUserRole() {
    const router = useRouter()
    const isMobile = useMediaQuery('(max-width:480px)')
    const [selectedEmployee, setSelectedEmployee] = useState<any[]>([])
    const [selectedMainMenus, setSelectedMainMenus] = useState<number[]>([])
    const [reset, setReset] = useState(false)
    const { t } = useTranslation('roleCreate')

    const RoleEntrySchema = yup.object({
        role_name: yup.string().trim().required('').max(50, t('maxError')),
        description: yup.string(),
        'setup-adm': yup.boolean(),
        isActive: yup.boolean(),
        'module-search': yup.string(),
        'all-module-checked': yup.boolean(),
    })
    const userData = useUser()

    
    const form = useForm({
        resolver: yupResolver(RoleEntrySchema),
        defaultValues: {
            role_name: '',
            isActive: true,
            description: '',
            'module-search': '',
            'setup-adm': false,
            'all-module-checked': false,
        },
    })

    const user = useUserCookie()
    const selectedMenu = menuStore((state) => state.selectedMenu)
    const selectedSubMenu = menuStore((state) => state.selectedSubMenu)
    const { showNotification } = useToast()

    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: 'role Register',
    //     Parent_Menu_ID: selectedMenu!.menu_id!,
    //     Sub_Menu_ID: selectedSubMenu!.menu_id!,
    //     Record_Name: selectedSubMenu!.menu_name!,
    // }

    const watchIsAdmin = form.watch('setup-adm')

    const { isPending, create } = useCreateRole()

    const PermissionNumberToTypes = {
        1: 'Myself',
        2: 'Other',
        3: 'Myself+Other',
        4: 'All',
    }

    const handleReset = () => {
        setSelectedMainMenus([])
        setSelectedEmployee([])
        form.reset()
        setReset(true)
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

        isAdmin === false &&
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
                if (
                    data[`ID-${menuId}/is_read_type`] &&
                    data[`ID-${menuId}/is_read`]
                ) {
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
                if (data[`ID-${menuId}/is_write_type`]) {
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
                if (data[`ID-${menuId}/is_edit_type`]) {
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
                if (data[`ID-${menuId}/is_delete_type`]) {
                    const typeLev = data[`ID-${menuId}/is_delete_type`] as string
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

                // check IsExport
                if (data[`ID-${menuId}/is_export`]) {
                    obj['is_export'] = true
                } else {
                    obj['is_export'] = false
                }

                if (data[`ID-${menuId}/is_grant`]) {
                    obj['is_grant'] = true
                } else {
                    obj['is_grant'] = false
                }

                MenuArray.push(obj)
            })

        const EmpPermission = !isAdmin
            ? selectedEmployee.map((emp: any) => ({
                  branch_id: emp?.branch_id,
                  company_id: emp?.company_id,
                  department_id: emp?.department_id,
                  employee_id: emp?.employee_id,
                  location_id: emp?.location_id,
                  position_id: emp?.position_id,
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
                is_active: data.isActive,
            },
            menu: MenuArray,
            emp_permission: EmpPermission,
            is_admin: isAdmin,
        }

        create(payload, {
            onSuccess: (createdRes) => {
                // showNoti
                showNotification({
                    message: createdRes.message,
                    type: 'success',
                })

                // create audit
                // createAudit({
                //     ...auditPayload,
                //     ValueAfter: createdRes.data.result,
                // }).then(handleReset)
            },
        })
    }

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
                        title: t('add-role'),
                        href: '',
                    },
                ]}
            />

            <p className="text-[24px] font-bold mt-[28px] mb-[34px]">
                {t('title')}
            </p>
            <FormProvider {...form}>
                <Form {...form}>
                    <form className="space-y-6">
                        <Accordion
                            type="multiple"
                            className="w-full mb-6 space-y-6 hover:no-underline"
                            defaultValue={['role-entry']}
                        >
                            <AccordionItem
                                value="role-entry"
                                className=" bg-primary-50 rounded-lg border-t border-t-primary-200 border-r-0 border-l-0 hover:no-underline"
                            >
                                <AccordionTrigger className="px-[16px] md:px-[40px] rounded ">
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

                            {!watchIsAdmin ? (
                                <AccordionItem
                                    value="module-list"
                                    className="border-0 rounded-lg bg-primary-50 border-t border-t-primary-200 border-r-0 border-l-0 hover:no-underline"
                                >
                                    <AccordionTrigger className="px-[16px] md:px-[40px] ">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">
                                                {t('module-list')}
                                            </span>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent
                                        value="user"
                                        className="bg-white md:px-4 py-8"
                                    >
                                        <ModulePermissionForm
                                            key={selectedMainMenus.length + ''}
                                            selectedMainMenus={
                                                selectedMainMenus
                                            }
                                            setSelectedMainMenus={
                                                setSelectedMainMenus
                                            }
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                            ) : null}

                            {!watchIsAdmin ? (
                                <EmployeePermissionTable
                                    reset={reset}
                                    setReset={setReset}
                                    selectedRows={selectedEmployee}
                                    setSelectedRows={setSelectedEmployee}
                                />
                            ) : null}
                        </Accordion>
                    </form>
                </Form>
            </FormProvider>
            <div className="flex gap-2 justify-center md:justify-end">
                <Button
                    variant="primary"
                    className="w-[100px] text-sm font-semibold h-[38px] flex justify-center items-center"
                    type="submit"
                    disabled={isPending}
                    onClick={form.handleSubmit(onSubmitHandler)}
                >
                    {t('create-save')}
                </Button>
                <Button
                    variant="outline"
                    className="w-[100px] text-sm font-semibold h-[38px] flex justify-center items-center"
                    onClick={() => router.back()}
                >
                    {t('cancel')}
                </Button>
            </div>
        </section>
    )
}

export default isAuth(AddUserRole)
