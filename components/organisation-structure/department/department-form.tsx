'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { ColorPicker, Skeleton } from 'antd'
import { Textarea } from '@/components/ui/textarea'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import {
    useCreateDepartments,
    useGetOneDepartment,
    useUpdateDepartment,
} from '@/service/query-hooks/organisation-structure/use-department'
import useToast from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import useMenu from '@/state/zustand/menu'
import useUserCookie from '@/hooks/use-user'
import { createAudit, updateAudit } from '@/lib/audit-trail-api'
import { Switch } from '@/components/ui/switch'
import { cn, getChangesValues } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function DepartmentForm({ id }: { id?: string[] | string }) {
    const { t } = useTranslation('department')
    const [color, setColor] = useState('')
    const { create, isPending } = useCreateDepartments()
    const { update, isPending: upPening } = useUpdateDepartment()
    const { showNotification } = useToast()
    const { isPending: getLoading, getById } = useGetOneDepartment()
    const router = useRouter() 
    const user = useUserCookie()
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const [editData, setEditData] = useState<any>()
    const [colorBoxOpen, setColorBoxOpen] = useState<boolean>(false)
    const [colorBoxFocus, setColorBoxFocus] = useState<boolean>(false)

    const loading = getLoading || upPening || isPending

    const FormSchema = yup.object({
        id: yup.number(),
        department_name: yup.string().required().trim().max(50, t('nameError')),
        department_color: yup.string(),
        description: yup.string(),
        is_multi_punch_on: yup.boolean(),
        probation_period: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .typeError('required'),
        weekly_work_hour: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .typeError('required'),
        daily_work_hour: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .typeError('required'),
        TotalEmployees: yup.number(),
        is_active: yup.boolean(),
        allow_ot: yup.boolean(),
    })

    useEffect(() => {
        if (id) {
            getById(id, {
                onSuccess: (createCurr) => {
                    const data = createCurr?.data

                    form.setValue('department_name', data?.department_name)
                    form.setValue('allow_ot', data?.allow_ot)
                    form.setValue('daily_work_hour', data?.daily_work_hour)
                    form.setValue('department_color', data?.department_color)
                    form.setValue('description', data?.description)
                    form.setValue('is_active', data?.is_active)
                    form.setValue('is_multi_punch_on', data?.is_multi_punch_on)
                    form.setValue('probation_period', data?.probation_period)
                    form.setValue('weekly_work_hour', data?.weekly_work_hour)
                    form.setValue('id', data?.department_id)
                    form.setValue('TotalEmployees', data?.totalEmployees)

                    setEditData(data)
                },
                onError: (error) => {
                    showNotification({
                        message: error.message,
                        type: 'danger',
                    })
                },
            })
        }
    }, [id])

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: 0,
            department_name: undefined,
            department_color: '#1CBCC8',
            description: '',
            is_multi_punch_on: id ? editData?.is_multi_punch_on : false,
            probation_period: 0,
            allow_ot: id ? editData?.allow_ot : false,
            weekly_work_hour: 0,
            daily_work_hour: 0,
            TotalEmployees: 0,
            is_active: id ? editData?.is_active : true,
        },
    })
    const { dirtyFields } = form.formState

    const dailyWorkRequired = form.formState?.errors?.daily_work_hour?.type
    const departmentRequired = form.formState?.errors?.department_name?.type
    const probationRequired = form.formState?.errors?.probation_period?.type
    const weeklyRequired = form.formState?.errors?.weekly_work_hour?.type

    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
    //     Parent_Menu_ID: selectedMenuId!,
    //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    // }

    // useEffect(() => {
    //     // Attach click event listener when component mounts
    //     window.addEventListener('click', ()=>{setColorBoxOpen(false)});

    //     // Cleanup: Remove event listener when component unmounts
    //     return () => {
    //       window.removeEventListener('click', ()=>{setColorBoxOpen(false)});
    //     };
    //   }, []);

    const handleOnSave = (data: any) => {

       
        if (id) {
            console.log("Update data")
            console.log(data)
            console.log("Update data")
            data.total_employee = 0;

            update(data, {
                onSuccess: (updateDevice) => {
                    showNotification({
                        message: updateDevice.message,
                        type: 'success',
                    });

                  


            
          

                    // const { afterValue, beforeValue } = getChangesValues(
                    //     dirtyFields,
                    //     form,
                    //     editData,
                    // )

                    // updateAudit({
                    //     ...auditPayload,
                    //     ValueAfter: afterValue,
                    //     ValueBefore: beforeValue!,
                    //     Record_Name: editData!.department_name,
                    // })

                    router.replace(`/organisation-structure/department`)
                },
                onError: (error) => {
                    showNotification({
                        message: error.message,
                        type: 'danger',
                    })
                },
            })
            return
        } else {
            console.log("This is data")
            console.log(data);
            console.log("This is data")
          
            create(data, {
                onSuccess: (updateCurrency) => {
                    showNotification({
                        message: updateCurrency.message,
                        type: 'success',
                    })

                    // createAudit({
                    //     Record_Name: data.department_name,
                    //     ...auditPayload,
                    //     ValueAfter: updateCurrency.data,
                    // })

                    form.setValue('department_name', '')
                    form.setValue('department_color', '#1CBCC8')
                    form.setValue('is_active', true)
                    form.setValue('description', '')
                    form.setValue('is_multi_punch_on', false)
                    form.setValue('probation_period', 0)
                    form.setValue('weekly_work_hour', 0)
                    form.setValue('daily_work_hour', 0)
                    form.setValue('TotalEmployees', 0)

                    setColor('#1CBCC8')
                },
                onError: (error) => {
                    showNotification({
                        message: error.message,
                        type: 'danger',
                    })
                },
            })
        }
    }

    if (getLoading)
        return (
            <>
                <Skeleton />
            </>
        )

    return (
        <Form {...form}>
            <form
                {...form}
                onSubmit={form.handleSubmit(handleOnSave)}
                className=" space-y-4 "
            >
                <div className="form-one w-full flex-col lg:flex-row  flex   mx-auto   gap-[30px]  rounded">
                    <div className=" w-full lg:w-1/2 space-y-4">
                        {/* department name */}
                        <FormField
                            control={form.control}
                            name="department_name"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('name')}{' '}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="string" {...field} />
                                    </FormControl>
                                    {departmentRequired === 'max' && (
                                        <FormMessage />
                                    )}
                                </FormItem>
                            )}
                        />
                        {/* department name */}
                        {/* weekly work hour  */}
                        <FormField
                            control={form.control}
                            name="daily_work_hour"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('daily')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    {dailyWorkRequired === 'typeError' ? (
                                        <></>
                                    ) : (
                                        <FormMessage />
                                    )}
                                </FormItem>
                            )}
                        />
                        {/* weekly work hour */}
                        {/* Probation Period */}
                        <FormField
                            control={form.control}
                            name="probation_period"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('probation')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    {probationRequired === 'typeError' ? (
                                        <></>
                                    ) : (
                                        <FormMessage />
                                    )}
                                </FormItem>
                            )}
                        />
                        {/* Probation Period */}

                        <div className=" space-y-4 hidden lg:flex flex-col">
                            {/* Record Punch */}
                            <FormField
                                control={form.control}
                                name="is_multi_punch_on"
                                render={({ field }) => (
                                    <FormItem className=" w-[200px]">
                                        <div className="space-x-2 flex">
                                            <FormLabel className="text-sm  w-full">
                                                {t('record')}
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    id="active"
                                                    className="h-[20px] w-[39px]"
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    thumbClassName="h-[12px] w-[12px]"
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* Allow  overtime */}
                            <FormField
                                control={form.control}
                                name="allow_ot"
                                render={({ field }) => (
                                    <FormItem className=" w-full">
                                        <div className=" space-x-2 flex w-[200px]">
                                            <FormLabel className="text-sm  w-full">
                                                {t('allowOvertime')}
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    id="active"
                                                    className="h-[20px] w-[39px]"
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    thumbClassName="h-[12px] w-[12px]"
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* Allow overtime */}
                            {/* Active */}
                            <FormField
                                control={form.control}
                                name="is_active"
                                render={({ field }) => (
                                    <FormItem className="w-[200px]">
                                        <div className="space-x-2 flex ">
                                            <FormLabel className="text-sm w-full">
                                                {t('formActive')}
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    id="active"
                                                    className="h-[20px] w-[39px]"
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    thumbClassName="h-[12px] w-[12px]"
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* form two */}
                    <div className=" w-full lg:w-1/2 space-y-4">
                        {/* department color */}
                        <FormField
                            control={form.control}
                            name="department_color"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('color')}{' '}
                                    </FormLabel>
                                    <FormControl className="">
                                        <Button
                                            variant={'ghost'}
                                            className={cn(
                                                'flex w-full cursor-pointer  border px-1 border-gray-400 relative rounded-xl h-[37px] items-center justify-center ring-offset-background focus-within:ring-2 focus-within:border-gray-400  focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-500',
                                            )}
                                        >
                                            <p
                                                onClick={() =>
                                                    setColorBoxOpen(
                                                        (prev) => !prev,
                                                    )
                                                }
                                                className={cn(
                                                    'flex h-[36px] bg-green-300  rounded-[10px] absolute left-0 z-0  bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent select-none file:text-sm file:font-medium placeholder:text-slate-400',
                                                )}
                                            >
                                                {field.value}
                                            </p>

                                            <ColorPicker
                                                onChange={(_, hex) => {
                                                    form.setValue(
                                                        'department_color',
                                                        hex,
                                                    )
                                                }}
                                                className="border-none flex items-center justify-end z-10 bg-transparent  w-full  "
                                                value={form.getValues(
                                                    'department_color',
                                                )}
                                                defaultValue={'#1CBCC8'}
                                            />
                                        </Button>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* department color */}

                        {/* Daily  Period */}
                        <FormField
                            control={form.control}
                            name="weekly_work_hour"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('weekly')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    {weeklyRequired === 'typeError' ? (
                                        <></>
                                    ) : (
                                        <FormMessage />
                                    )}
                                </FormItem>
                            )}
                        />
                        {/* Probation Period */}

                        {/* weekly work hour  */}

                        {id && (
                            <FormField
                                control={form.control}
                                name="TotalEmployees"
                                render={({ field }) => (
                                    <FormItem className=" w-full">
                                        <FormLabel className="text-sm">
                                            {t('totle')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={true}
                                                readOnly
                                                className="bg-gray-50 focus-visible:border-slate-200 "
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                        {/* weekly work hour */}
                        {/* description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('description')}{' '}
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* description */}

                        <div className=" space-y-4 flex flex-col lg:hidden">
                            {/* Record Punch */}
                            <FormField
                                control={form.control}
                                name="is_multi_punch_on"
                                render={({ field }) => (
                                    <FormItem className=" w-[200px]">
                                        <div className="space-x-2 flex">
                                            <FormLabel className="text-sm  w-full">
                                                {t('record')}
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    id="active"
                                                    className="h-[20px] w-[39px]"
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    thumbClassName="h-[12px] w-[12px]"
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* Allow  overtime */}
                            <FormField
                                control={form.control}
                                name="allow_ot"
                                render={({ field }) => (
                                    <FormItem className=" w-full">
                                        <div className=" space-x-2 flex w-[200px]">
                                            <FormLabel className="text-sm  w-full">
                                                {t('allowOvertime')}
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    id="active"
                                                    className="h-[20px] w-[39px]"
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    thumbClassName="h-[12px] w-[12px]"
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {/* Allow overtime */}
                            {/* Active */}
                            <FormField
                                control={form.control}
                                name="is_active"
                                render={({ field }) => (
                                    <FormItem className="w-[200px]">
                                        <div className="space-x-2 flex ">
                                            <FormLabel className="text-sm w-full">
                                                {t('active')}
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    id="active"
                                                    className="h-[20px] w-[39px]"
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    thumbClassName="h-[12px] w-[12px]"
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Record Punch */}
                    </div>
                </div>
                <ModalConfirmBtns
                    isLoading={loading}
                    toggle={() => {
                        router.replace(`/organisation-structure/department`)
                    }}
                    editMode={(id && true) || false}
                    language="department"
                />
            </form>
        </Form>
    )
}

export default DepartmentForm
