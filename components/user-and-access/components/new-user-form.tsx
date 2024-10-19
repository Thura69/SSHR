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
import { PasswordInput } from '@/components/ui/password-input'
import { Textarea } from '@/components/ui/textarea'
import {
    useSearchUser,
    useUserRoleFilterOptions,
    userUserCreate,
} from '@/service/query-hooks/user-and-access/user/use-user'
import InputDropdown from './input-dropdown'
import { usePathname, useRouter } from 'next/navigation'
import useToast from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import { createAudit, excludeKey } from '@/lib/audit-trail-api'
import useMenu from '@/state/zustand/menu'
import useAuthStore from '@/state/zustand/auth-store'
import _ from 'lodash'
import DropdownInput from './dropdown-input'
import { CrossCircle, TickCircle } from '@/components/common/icons'
import { Employee, UserMenuInterface } from '@/types/user-and-access/user'
import Loader from '@/components/common/loaders/loader'

interface NewUserFormInputs {
    Description?: string
    Password: string
    IsActive: boolean
}

const createAddUserSchema = (t: Function) => {
    return yup.object().shape({
        Role_ID: yup.number().required(' '),
        Employee_ID: yup.number().required(' '),
        Company_ID: yup.number(),
        Description: yup.string(),
        Password: yup
            .string()
            .required(t('passUpdate.form.validationMessage.password'))
            .min(8, t('passUpdate.form.validationMessage.char'))
            .matches(/[A-Z]/, t('passUpdate.form.validationMessage.upperCase'))
            .matches(/[a-z]/, t('passUpdate.form.validationMessage.lowerCase'))
            .matches(/[0-9]/, t('passUpdate.form.validationMessage.num')),
        IsActive: yup.boolean().required(' '),
    })
}

export const NewUserForm = () => {
    const employeeName = useAuthStore.getState().userData.employee_name
    const { t } = useTranslation('user')

    const [roleOptions, setRoleOptions] = useState<
        { label: string; value: string }[]
    >([])
    const { create, isPending } = userUserCreate()
    const { data, isLoading: userFetchLoading } = useSearchUser()
    const { data: filterData, isLoading: filterLoading } =
        useUserRoleFilterOptions()
    const [formData, setFormData] = useState<Employee | null>(null)
    const router = useRouter()
    const { showNotification } = useToast()
    const NewUserSchema = createAddUserSchema(t)
    const form = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues: {
            IsActive: true,
        },
    })
    const [key, setKey] = useState(0)
    const [nameKey, setNameKey] = useState(0)
    const [roleKey, setRoleKey] = useState(0)
    const watchNewPassword = form.watch('Password', '')
    const isPasswordFieldDirty = form.getFieldState('Password').isDirty

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

    //menu
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
            return pathname === `/${menu.Web_URL}`
        },
    )

    useEffect(() => {
        if (currentChildMenu) {
            setSelectedGrandSubMenuId(currentChildMenu?.menu_id)
            setSelectedGrandSubMenu(currentChildMenu)
        }
    }, [currentChildMenu])

    useMemo(() => {
        if (!filterLoading && filterData && filterData.data) {
            const roleArr: any[] = []
            if (!filterData.data.Role) {
                filterData?.data.map((role: any) => {
                    if (role.Role_Name) {
                        roleArr.push({
                            label: role.Role_Name,
                            value: role.Role_ID,
                        })
                    }
                })
            } else {
                filterData?.data.Role.map((role: any) => {
                    if (role.Role_Name) {
                        roleArr.push({
                            label: role.Role_Name,
                            value: role.Role_ID,
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
        let payload: { Employee_Name?: string; Employee_No?: string } = {}
        value.type === 'Name'
            ? (payload.Employee_Name = value.label)
            : (payload.Employee_No = value.label)
        if (!userFetchLoading) {
            const currentObject = data.data.filter(
                (item: any) => item.Employee_ID === value.value,
            )
            setFormData(currentObject[0] || null)
        }
    }

    const handleResetForm = () => {
        form.clearErrors()
        form.reset()
        form.setValue('Password', '')
        form.setValue('Description', '')
        setFormData(null)
        setKey((prevKey) => prevKey + 1)
        setNameKey((prevKey) => prevKey + 1)
        setRoleKey((prevKey) => prevKey + 1)
    }

    const onSubmitHandler: SubmitHandler<NewUserFormInputs> = (data) => {
        const payload = {
            ...data,
            Employee_ID: formData?.Employee_ID,
            Company_ID: formData?.Company_ID,
        }
        const auditPayload = {
            Is_Mobile: false,
            Emp_Name: employeeName,
            Page_Name: 'User Register Page',
            Parent_Menu_ID: selectedMenuId,
            Sub_Menu_ID: selectedSubMenuId,
            Recrod_Name: `User ${formData?.Employee_Name}`,
        }

        create(payload, {
            onSuccess: (response) => {
                createAudit({
                    ...auditPayload,
                    ValueAfter: excludeKey(payload, 'Password'),
                })
                showNotification({
                    message: response.message,
                    type: 'success',
                })
                handleResetForm()
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
                                name="Employee_ID"
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
                                                key={key}
                                                emptyMessage={t('form.empty')}
                                                options={data?.data}
                                                isLoading={userFetchLoading}
                                                placeholder={t('form.no')}
                                                setFormData={setFormData}
                                                value={{
                                                    label: formData?.Employee_No,
                                                    value: formData?.Employee_ID,
                                                }}
                                                type="No"
                                                onValueChange={(value) => {
                                                    form.setValue(
                                                        'Employee_ID',
                                                        value.value as number,
                                                    )
                                                    form.trigger('Employee_ID')
                                                    setFormData(null)
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
                                        defaultValue={formData?.Email}
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
                                        defaultValue={formData?.Location_Name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-row">
                                    <Label>{t('form.email')}</Label>
                                    <span className="pb-6"></span>
                                </div>
                                <div>
                                    <Input
                                        placeholder={t('form.email')}
                                        defaultValue={formData?.Department_Name}
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
                                        defaultValue={formData?.Position_Name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="Password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm">
                                            {t('form.password')}{' '}
                                            <span className="ms-1 text-danger-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder={t('form.password')}
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
                                name="Employee_ID"
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
                                                key={nameKey}
                                                emptyMessage={t('form.loading')}
                                                options={data?.data}
                                                isLoading={userFetchLoading}
                                                placeholder={t('form.name')}
                                                setFormData={setFormData}
                                                type="Name"
                                                value={{
                                                    label: formData?.Employee_Name,
                                                    value: formData?.Employee_ID,
                                                }}
                                                onValueChange={(value) => {
                                                    form.setValue(
                                                        'Employee_ID',
                                                        value.value as number,
                                                    )
                                                    form.trigger('Employee_ID') // Update the form value
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
                                        defaultValue={formData?.Company_Name}
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
                                        defaultValue={formData?.Branch_Name}
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
                                        defaultValue={formData?.Section_Name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="Role_ID"
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
                                                key={roleKey}
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
                                                        'Role_ID',
                                                        value.value as number,
                                                    )
                                                    form.trigger('Role_ID')
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
                        name="Description"
                        render={({ field }) => (
                            <FormItem className="py-6">
                                <FormLabel>{t('form.remark')}</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="IsActive"
                        render={({ field }) => (
                            <FormItem className="pb-5 flex md:pb-0">
                                <FormLabel className="pt-2 pr-2">
                                    {t('form.status')}
                                </FormLabel>
                                <FormControl>
                                    <Switch
                                        id="active"
                                        className="h-[20px] w-[39px]"
                                        thumbClassName="h-[12px] w-[12px]"
                                        checked={field.value}
                                        defaultChecked
                                        onCheckedChange={(value) =>
                                            field.onChange(value)
                                        }
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
