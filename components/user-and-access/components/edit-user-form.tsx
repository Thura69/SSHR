'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Label } from '../../ui/label'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form'
import { Button } from '../../ui/button'
import { Switch } from '../../ui/switch'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    useSearchUser,
    useUserRoleFilterOptions,
    userUserEdit,
} from '@/service/query-hooks/user-and-access/user/use-user'
import InputDropdown from './input-dropdown'
import { usePathname, useRouter } from 'next/navigation'
import useToast from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import useMenu from '@/state/zustand/menu'
import { excludeKey, updateAudit } from '@/lib/audit-trail-api'
import useAuthStore from '@/state/zustand/auth-store'
import DropdownInput from './dropdown-input'
import _ from 'lodash'
import { CrossCircle, TickCircle } from '@/components/common/icons'
import { CustomPasswordInput } from './custom-password-input'
import {
    EditUserFormInputs,
    Employee,
    UserMenuInterface,
} from '@/types/user-and-access/user'
import Loader from '@/components/common/loaders/loader'

interface Props {
    data: Employee[]
    id: string
}

let EditUserSchema = yup.object({
    user_id: yup.number(),
    employee_id: yup.number(),
    company_id: yup.number(),
    role_id: yup.number(),
    description: yup.string(),
    password: yup.string(),
    is_active: yup.boolean(),
})

export const EditUserForm = ({ data, id }: Props) => {
    const employeeName = useAuthStore.getState().userData.employee_name
    const { edit, isPending } = userUserEdit()
    const { data: searchData, isLoading: searchLoading } = useSearchUser()
    const [formData, setFormData] = useState<Employee | null>()
    const [prevData, setPrevData] = useState<Employee | null>()
    const [searchList, setSearchList] = useState<Employee[] | []>([])
    const [roleOptions, setRoleOptions] = useState<
        { label: string; value: string }[]
    >([])
    const router = useRouter()
    const { showNotification } = useToast()

    const { data: filterData, isLoading: filterLoading } =
        useUserRoleFilterOptions()
    const { t } = useTranslation('user')
    const form = useForm({
        resolver: yupResolver(EditUserSchema),
    })


    

    useEffect(() => {
        if (data) {
            setPrevData(data[0])
            setFormData(data[0])
            setSearchList(data)
        }
    }, [data])

    useMemo(() => {
        if (searchData && !searchLoading) {
            setSearchList(searchData.data)
        }
    }, [searchData, searchLoading])

    useMemo(() => {
        if (!filterLoading && filterData && filterData.data) {
            const roleArr: any[] = []
            if (!filterData.data.role) {
                filterData?.data.map((role: any) => {
                    if (role.role_name) {
                        roleArr.push({
                            label: role.role_name,
                            value: role.role_id,
                        })
                    }
                })
            } else {
                filterData?.data.role.map((role: any) => {
                    if (role.role_name) {
                        roleArr.push({
                            label: role.role_name,
                            value: role.role_id,
                        })
                    }
                })
            }

            const uniqRoleArr = _.uniqBy(roleArr, 'value')
            setRoleOptions(uniqRoleArr)
        }
    }, [filterLoading, filterData])

    const handleForm = (value: {
        value?: number
        label?: string
        type?: string
    }) => {
        let payload: { employee_name?: string; employee_no?: string } = {}
        value.type === 'Name'
            ? (payload.employee_name = value.label)
            : (payload.employee_no = value.label)

        if (!searchLoading) {
            let currentObject = searchList.filter(
                (item: any) => item.employee_id === value.value,
            )
            if (currentObject[0]) {
                currentObject[0].role_id =
                    formData?.role_id ||
                    prevData?.role_id ||
                    currentObject[0].role_id
                currentObject[0].role_name =
                    formData?.role_name ||
                    prevData?.role_name ||
                    currentObject[0].role_name
                setFormData(currentObject[0])
            }
        }
    }

    const watchNewPassword = form.watch('password', '') || ''
    const isPasswordFieldDirty = form.getFieldState('password').isDirty

    const hasEightCharacters = watchNewPassword.length >= 8
    const hasUppercaseCharacters = /[A-Z]/g.test(watchNewPassword)
    const hasLowercaseCharacters = /[a-z]/.test(watchNewPassword)
    const hasNumericCharacters = /[0-9]/.test(watchNewPassword)

    const getPasswordErrors = useMemo(
        () => (passwordCheck: boolean, label: string) => {
            if (isPasswordFieldDirty) {
                switch (true) {
                    case passwordCheck:
                        return (
                            <div className="flex flex-row items-center gap-2 pb-2">
                                <div className="px-1 md:px-0">
                                    <TickCircle />
                                </div>
                                <p className="text-sky-500  ">{label}</p>
                            </div>
                        )
                    case !passwordCheck:
                        return (
                            <div className="flex flex-row items-center gap-2 pb-2">
                                <div className="px-1 md:px-0">
                                    <CrossCircle />
                                </div>
                                <p className="text-danger-500  ">{label}</p>
                            </div>
                        )
                    default:
                        return <p>{label}</p>
                }
            }

            return null
        },
        [isPasswordFieldDirty],
    )

    const {
        selectedMenu,
        setSelectedGrandSubMenu,
        setSelectedGrandSubMenuId,
        selectedMenuId,
        selectedGrandSubMenuId,
        selectedSubMenuId,
    } = useMenu()
    const pathname = usePathname()
    const childMenus = selectedMenu?.children?.flatMap((menu: any) => menu)

    const currentChildMenu: UserMenuInterface = childMenus?.find(
        (menu: any) => {
            return pathname === `/${menu.web_url}`
        },
    )

    useEffect(() => {
        if (currentChildMenu) {
            setSelectedGrandSubMenuId(currentChildMenu?.menu_id)
            setSelectedGrandSubMenu(currentChildMenu)
        }
    }, [currentChildMenu])

    const onSubmitHandler: SubmitHandler<EditUserFormInputs> = (data) => {
        const payload = {
            id: prevData?.user_id,
            employee_id: formData?.employee_id,
            company_id: formData?.company_id,
            role_id: formData?.role_id,
            is_active: formData?.is_active,
            ...data,
        }
        // Check if Role_ID, Employee_ID, and Password are provided
        if (!payload.role_id || !payload.employee_id) {
            // If any of the required fields are missing, show an error message
            showNotification({
                message: 'role ID and Employee ID are required fields.',
                type: 'danger',
            })
            return // Exit the function early since validation failed
        }

        // const auditPayload = {
        //     Is_Mobile: false,
        //     Emp_Name: employeeName,
        //     Page_Name: 'Edit User',
        //     Parent_Menu_ID: selectedMenuId,
        //     Sub_Menu_ID: selectedSubMenuId,
        // }
        // const previousData = {
        //     Employee_ID: prevData?.employee_id,
        //     Company_ID: prevData?.company_id,
        //     Role_ID: prevData?.role_id,
        //     User_ID: prevData?.user_id,
        //     IsActive: prevData?.is_active,
        // }

        edit(payload, {
            onSuccess: (response) => {
                // updateAudit({
                //     ...auditPayload,
                //     ValueAfter: excludeKey(payload, 'Password'),
                //     ValueBefore: previousData,
                //     Record_Name: prevData?.Employee_Name,
                // })
                showNotification({
                    message: response.message,
                    type: 'success',
                })
                router.push('/user-and-access/user')
            },
            onError: (error: any) => {
                showNotification({
                    message: error.message,
                    type: 'danger',
                })
            },
        })
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <div className="md:flex gap-6">
                        <div className="flex-1 space-y-6 ">
                            <FormField
                                control={form.control}
                                name="employee_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('form.no')}
                                            <span className="ms-1 text-danger-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <InputDropdown
                                                emptyMessage={t('form.loading')}
                                                options={searchList}
                                                isLoading={searchLoading}
                                                placeholder={t('form.no')}
                                                setFormData={setFormData}
                                                value={{
                                                    label: formData?.employee_no,
                                                    value: formData?.employee_id,
                                                }}
                                                type="No"
                                                onValueChange={(value) => {
                                                    form.setValue(
                                                        'employee_id',
                                                        value.value as number,
                                                    )
                                                    form.trigger('employee_id')
                                                    handleForm({
                                                        ...value,
                                                        type: 'No',
                                                    })
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-2">
                                <div className="flex flex-row">
                                    <Label>{t('form.email')}</Label>
                                    <span className="pb-6"></span>
                                </div>
                                <div>
                                    <Input
                                        placeholder={t('form.email')}
                                        defaultValue={formData?.email}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-row">
                                    <Label>{t('form.location')}</Label>
                                    <span className="pb-6"></span>
                                </div>
                                <div>
                                    <Input
                                        placeholder={t('form.location')}
                                        defaultValue={formData?.location_name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-row">
                                    <Label>{t('form.department')}</Label>
                                    <span className="pb-6"></span>
                                </div>
                                <div>
                                    <Input
                                        placeholder={t('form.department')}
                                        defaultValue={formData?.department_name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-row">
                                    <Label>{t('form.position')}</Label>
                                    <span className="pb-6"></span>
                                </div>
                                <div>
                                    <Input
                                        placeholder={t('form.position')}
                                        defaultValue={formData?.position_name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">
                                            {t('form.password')}{' '}
                                            <span className="ms-1 text-danger-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <CustomPasswordInput
                                                placeholder={t('form.password')}
                                                defaultValue={'********'}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="md:hidden md:pt-6 md:mx-6 flex flex-row justify-between">
                                <div className="flex flex-col">
                                    {getPasswordErrors(
                                        hasEightCharacters,
                                        t('passUpdate.form.validation.char'),
                                    )}
                                    {getPasswordErrors(
                                        hasUppercaseCharacters,
                                        t(
                                            'passUpdate.form.validation.upperCase',
                                        ),
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    {getPasswordErrors(
                                        hasNumericCharacters,
                                        t('passUpdate.form.validation.num'),
                                    )}
                                    {getPasswordErrors(
                                        hasLowercaseCharacters,
                                        t(
                                            'passUpdate.form.validation.lowerCase',
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-6 md:p-0 md:m-0">
                            <FormField
                                control={form.control}
                                name="employee_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('form.name')}
                                            <span className="ms-1 text-danger-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <InputDropdown
                                                emptyMessage={t('form.loading')}
                                                options={searchList}
                                                isLoading={searchLoading}
                                                placeholder={t('form.name')}
                                                setFormData={setFormData}
                                                type="Name"
                                                value={{
                                                    label: formData?.employee_name,
                                                    value: formData?.employee_id,
                                                }}
                                                onValueChange={(value) => {
                                                    form.setValue(
                                                        'employee_id',
                                                        value.value as number,
                                                    )
                                                    form.trigger('employee_id') // Update the form value
                                                    handleForm({
                                                        ...value,
                                                        type: 'Name',
                                                    }) // Update the form value
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-2">
                                <div className="flex flex-row">
                                    <Label>{t('form.company')}</Label>
                                    <span className="pb-6"></span>
                                </div>
                                <div>
                                    <Input
                                        placeholder={t('form.company')}
                                        defaultValue={formData?.company_name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-row">
                                    <Label>{t('form.branch')}</Label>
                                    <span className="pb-6"></span>
                                </div>
                                <div>
                                    <Input
                                        placeholder={t('form.branch')}
                                        defaultValue={formData?.branch_name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-row">
                                    <Label>{t('form.section')}</Label>
                                    <span className="pb-6"></span>
                                </div>
                                <div>
                                    <Input
                                        placeholder={t('form.section')}
                                        defaultValue={formData?.section_name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="role_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('form.role')}
                                            <span className="ms-1 text-danger-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <DropdownInput
                                                emptyMessage={t('form.loading')}
                                                options={roleOptions}
                                                isLoading={filterLoading}
                                                placeholder={t('form.role')}
                                                setFormData={setFormData}
                                                getKey={(item) =>
                                                    parseInt(item.value)
                                                }
                                                getLabel={(item) => item.label}
                                                onValueChange={(value) => {
                                                    form.setValue(
                                                        'role_id',
                                                        value.value as number,
                                                    )
                                                    form.trigger('role_id')
                                                }}
                                                value={{
                                                    label: formData?.role_name,
                                                    value: formData?.role_id,
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="hidden md:flex pt-6 mx-6 flex-row justify-between">
                                <div className="flex flex-col">
                                    {getPasswordErrors(
                                        hasEightCharacters,
                                        t('passUpdate.form.validation.char'),
                                    )}
                                    {getPasswordErrors(
                                        hasUppercaseCharacters,
                                        t(
                                            'passUpdate.form.validation.upperCase',
                                        ),
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    {getPasswordErrors(
                                        hasNumericCharacters,
                                        t('passUpdate.form.validation.num'),
                                    )}
                                    {getPasswordErrors(
                                        hasLowercaseCharacters,
                                        t(
                                            'passUpdate.form.validation.lowerCase',
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="py-6">
                                <FormLabel>{t('form.remark')}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        defaultValue={formData?.description}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="is_active"
                        render={({ field }) => (
                            <FormItem className="pb-5 flex md:pb-0">
                                <FormLabel className=" pt-2 pr-2">
                                    {t('form.status')}
                                </FormLabel>
                                <FormControl>
                                    <Switch
                                        id="active"
                                        className="h-[20px] w-[39px]"
                                        thumbClassName="h-[12px] w-[12px]"
                                        checked={formData?.is_active}
                                        onCheckedChange={(value: boolean) => {
                                            setFormData((prevData) => {
                                                if (!prevData) return null
                                                return {
                                                    ...prevData,
                                                    IsActive: value,
                                                }
                                            })
                                            field.onChange(value)
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="gap-2 flex justify-center md:justify-end">
                        <Button
                            size="lg"
                            type="submit"
                            variant="primary"
                            className={`${isPending && 'opacity-70'} px-0 w-[150px] font-medium`}
                        >
                            {isPending ? <Loader /> : t('form.save')}
                        </Button>
                        <Button
                            size="lg"
                            type="reset"
                            variant="outline"
                            className="px-0 w-[150px]"
                            onClick={() => router.push('/user-and-access/user')}
                        >
                            {t('form.cancel')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
