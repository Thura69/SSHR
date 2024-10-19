import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import Loader from '@/components/common/loaders/loader'
import useToast from '@/hooks/use-toast'
import { createAudit, updateAudit } from '@/lib/audit-trail-api'
import { useTranslation } from 'react-i18next'
import useMenu from '@/state/zustand/menu'
import useUserCookie from '@/hooks/use-user'
import {
    useCreateSetting,
    useUpdateSetting,
} from '@/service/query-hooks/setting/use-setting-api'
import { SettingFormType, UpdateSettingType, menuTypes } from '@/types/setting'
import { urlMapObj } from '@/service/apis/setting/setting-map-obj'
import { getChangesValues } from '@/lib/utils'

type PropTypes = {
    editMode?: boolean
    editData?: UpdateSettingType
    toggle: () => void
}

const SettingForm = ({ editData, editMode, toggle }: PropTypes) => {
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const menu = urlMapObj[selectedGrandSubMenu?.web_url as menuTypes]
    const { create, isPending: isCreateLoading } = useCreateSetting(menu)
    const { isPending: isUpdateLoading, update } = useUpdateSetting(menu)
    const [value, setValue] = useState(false)
    const { t } = useTranslation(menu)

    const { showNotification } = useToast()
    const user = useUserCookie()
    const isLoading = isCreateLoading || isUpdateLoading

    const FormSchema = yup.object({
        name: yup.string().trim().required('').max(50, t('maxError')),
        description: yup.string().trim(),
        isActive: yup.boolean().required(),
    })
    3
    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            name: editMode ? editData!.name : '',
            description: editMode ? editData!.description : '',
            isActive: editMode ? editData!.isActive : true,
        },
    })

    const { dirtyFields } = form.formState

    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
    //     Parent_Menu_ID: selectedMenuId!,
    //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    // }

    const maxError = form.formState.errors.name?.type

    useEffect(() => {
        if (maxError === 'max') {
            setValue(true)
        } else {
            setValue(false)
        }
    }, [maxError])

    const handleOnSave = async (data: SettingFormType) => {
        if (editMode) {
            update(
                { ...data, id: editData!.id },
                {
                    onSuccess: (updatedRes) => {
                        // showNofi
                        showNotification({
                            message: updatedRes.message,
                            type: 'success',
                        })
                        // close modal
                        toggle()
                        // update audit

                        const { afterValue, beforeValue } = getChangesValues(
                            dirtyFields,
                            form,
                            editData,
                        )

                        // updateAudit({
                        //     ...auditPayload,
                        //     ValueAfter: afterValue,
                        //     ValueBefore: beforeValue,
                        //     Record_Name: editData!.name,
                        // })
                    },
                    onError: (error: any) => {
                        showNotification({
                            message: error.message,
                            type: 'danger',
                        })
                    },
                },
            )

            return
        }

        create(data, {
            onSuccess: (createdRes) => {
                // showNofi
                showNotification({
                    message: createdRes.message,
                    type: 'success',
                })
                // close modal
                toggle()

                // create audit
                // createAudit({
                //     Record_Name: data.name,
                //     ...auditPayload,
                //     ValueAfter: createdRes.data,
                // })
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
                className="space-y-4 "
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                {t('name')}{' '}
                                <span className="ms-1 text-danger-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            {value ? <FormMessage /> : ''}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('description')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className="border border-slate-400"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-1">
                    <Label htmlFor="active">{t('formActive')}</Label>
                    <br />
                    <FormField
                        control={form.control}
                        name="isActive"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Switch
                                        id="active"
                                        className="h-[20px] w-[39px]"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        thumbClassName="h-[12px] w-[12px]"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex justify-end gap-2 ">
                    <Button
                        type="submit"
                        variant="primary"
                        className={`${isLoading && 'opacity-50'} w-[100px] text-sm font-medium`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader />
                        ) : editMode ? (
                            t('update')
                        ) : (
                            t('save')
                        )}
                    </Button>
                    <Button
                        type="button"
                        onClick={toggle}
                        variant="outline"
                        disabled={isLoading}
                        className={`font-medium w-[100px] text-sm ${isLoading && 'opacity-50'}`}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SettingForm
