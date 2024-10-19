'use client'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import useToast from '@/hooks/use-toast'
import { createAudit, updateAudit } from '@/lib/audit-trail-api'
import { useTranslation } from 'react-i18next'
import menuStore from '@/state/zustand/menu'
import useUserCookie from '@/hooks/use-user'
import 'easymde/dist/easymde.min.css'
import Loader from '@/components/common/loaders/loader'
import QuillEditor from '@/components/common/quill-editor'
import { useRouter } from 'next/navigation'
import { ComboBox } from '../combo'
import {
    useCreatePosition,
    useUpdatePositon,
} from '@/service/query-hooks/setting/use-position'
import { PositionFormType, PositionType } from '@/types/setting/position-type'
import { findDiffFields } from '@/lib/utils'

type OptionType = {
    value: number
    label: string
}

const FormSchema = yup.object({
    name: yup.string().trim().max(50, 'max is 50').required(''),
    description: yup.string(),
    isActive: yup.boolean().required(),
    jobCategory: yup.number().min(1).required(),
    department: yup.number().min(1).required(),
    specification: yup.string(),
    benefits: yup.string(),
    remarks: yup.string(),
})

type PropTypes = {
    editMode?: boolean
    editData?: PositionType
    depData: OptionType[]
    jobCatData: OptionType[]
}

const PositionForm = ({
    editData,
    editMode,
    depData,
    jobCatData,
}: PropTypes) => {

    jobCatData.sort((a, b) =>
        a?.label.toLowerCase().localeCompare(b?.label.toLowerCase()),
    )
    depData.sort((a, b) =>
        a?.label.toLowerCase().localeCompare(b?.label.toLowerCase()),
    )
    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            name: editMode ? editData?.position_name : '',
            description: editMode ? editData?.job_description : '',
            isActive: editMode ? editData?.is_active : true,
            specification: editMode ? editData?.job_specifications : '',
            jobCategory: editMode ? editData?.jobcategory_id : 0,
            department: editMode ? editData?.department_id : 0,
            benefits: editMode ? editData?.benefits : '',
            remarks: editMode ? editData?.remarks : '',
        },
    })

    const nameWatch = form.watch('name')
    const maxErr = nameWatch.length > 50

    const router = useRouter()
    const { create, isPending: isCreateLoading } = useCreatePosition()
    const { isPending: isUpdateLoading, update } = useUpdatePositon()
    const { selectedMenuId, selectedGrandSubMenu } = menuStore()
    const { t } = useTranslation('position')

    const { showNotification } = useToast()
    const user = useUserCookie()
    const isLoading = isCreateLoading || isUpdateLoading

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: 'Position Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    const cancelHandler = () => {
        router.push('/settings/position')
    }

    const handleOnSave = async (data: PositionFormType) => {
        if (editMode) {
            const valueBefore = {
                name: editData?.position_name,
                description: editData?.job_description,
                isActive: editData?.is_active,
                specification: editData?.job_specifications,
                jobCategory: editData?.jobcategory_id,
                department: editData?.department_id,
                benefits: editData?.benefits,
                remarks: editData?.remarks,
            }
            update(
                { ...data, id: editData!.position_id },
                {
                    onSuccess: (updatedRes) => {
                        // showNofi
                        showNotification({
                            message: updatedRes.message,
                            type: 'success',
                        })
                        // back to positions
                        router.push('/settings/position')
                        const { diffAfter, diffBefore } = findDiffFields(
                            data,
                            valueBefore,
                        )

                        // update audit
                        updateAudit({
                            ...auditPayload,
                            ValueAfter: diffAfter,
                            ValueBefore: diffBefore,
                            Record_Name: editData?.position_name,
                        })
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
                // reset form
                form.reset()

                // showNofi
                showNotification({
                    message: createdRes.message,
                    type: 'success',
                })
                // close modal

                // create audit
                createAudit({
                    ...auditPayload,
                    ValueAfter: createdRes.data,
                    Record_Name: data.name,
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
                className="sm:space-y-6 space-y-4 position-form"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel className="text-sm">
                                {t('name')}
                                <span className="ms-1 text-danger-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className="border-gray-200" />
                            </FormControl>
                            {maxErr && (
                                <p className="text-danger-500 text-[12px] absolute -bottom-5 left-0">
                                    {t('maxError')}
                                </p>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jobCategory"
                    render={({ field }) => (
                        <ComboBox
                            field={field}
                            form={form}
                            options={jobCatData}
                            fieldName={'jobCategory'}
                            isRequire
                            label={t('jobCategory')}
                        />
                    )}
                />

                <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                        <ComboBox
                            field={field}
                            form={form}
                            options={depData}
                            fieldName={'department'}
                            isRequire
                            label={t('department')}
                        />
                    )}
                />

                <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('jobDescription')}</FormLabel>
                            <div className="spec-markdown-editor">
                                <QuillEditor
                                    className="prose max-w-[100%]  rounded-md focus-within:outline-none focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-primary-500"
                                    field={field}
                                />
                            </div>
                        </FormItem>
                    )}
                />

                <Controller
                    control={form.control}
                    name="specification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('jobSpecifications')}</FormLabel>
                            <div className="spec-markdown-editor">
                                <QuillEditor
                                    className="prose max-w-[100%]  rounded-md focus-within:outline-none focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-primary-500"
                                    field={field}
                                />
                            </div>
                        </FormItem>
                    )}
                />

                <Controller
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('jobBenefits')}</FormLabel>
                            <div>
                                <QuillEditor
                                    className="prose max-w-[100%]  rounded-md focus-within:outline-none focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-primary-500"
                                    field={field}
                                />
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="remarks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('remarks')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className="border border-slate-400 min-h-[150px]"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {editMode && (
                    <FormItem>
                        <FormLabel className="text-sm">
                            {t('totalEmployees')}
                        </FormLabel>
                        <FormControl>
                            <Input value={editData?.totalEmployees} disabled />
                        </FormControl>
                    </FormItem>
                )}

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
                <div className="w-full flex justify-end gap-2">
                    <Button
                        type="submit"
                        variant="primary"
                        className={` ${editMode ? 'px-4' : 'px-6'}  ${isLoading && 'opacity-50'} font-normal w-[100px]`}
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
                        variant="outline"
                        disabled={isLoading}
                        className={`w-[100px] ${isLoading && 'opacity-50'}`}
                        onClick={cancelHandler}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default PositionForm
