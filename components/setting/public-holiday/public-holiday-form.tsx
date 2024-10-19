'use client'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn, formatDate, getChangesValues } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { CaretSortIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import PublicAccordion from '@/components/setting/public-holiday/modal/public-accordion'
import { format } from 'date-fns'
import { Calendar } from '@/components/setting/public-holiday/modal/custome-calendar'
import {
    useCreatePublicHoliday,
    useUpdatePublicHoliday,
} from '@/service/query-hooks/setting/use-publicHoliday'
import useToast from '@/hooks/use-toast'
import { useBoolean } from 'usehooks-ts'
import useUserCookie from '@/hooks/use-user'
import useMenu from '@/state/zustand/menu'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useTranslation } from 'react-i18next'
import { createAudit, updateAudit } from '@/lib/audit-trail-api'
import { DateRange } from 'react-day-picker'
import { DevTool } from '@hookform/devtools'
import DateRangePicker from '@/components/ui/date-range-picker'
import FormDateRange from './modal/form-date-range'
import Datepicker from '@/components/ui/datepicker'

type PropTypes = {
    editMode?: boolean
    editData?: any
    toggle: () => void
    date?: any
}

function PublicHolidayForm({ editData, editMode, toggle }: PropTypes) {
    const { create, isPending } = useCreatePublicHoliday()
    const { update, isPending: upLoad } = useUpdatePublicHoliday()
    const { showNotification } = useToast()
    const { value, toggle: popToggle } = useBoolean(false)
    const user = useUserCookie()
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const { t } = useTranslation('publicHoliday')
    const [start, setStart] = useState(true)
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })

    const isLoaddding = isPending || upLoad

    const [financialYearId, _] = useQueryState(
        'financial_year_id',
        parseAsInteger,
    )

    const FormSchema = yup.object({
        id: yup.number(),
        holiday_name: yup.string().required(''),
        company_id: yup.array(),
        location_id: yup.array(),
        Holiday_Date: yup.string(),
        branch_id: yup.array(),
        FromDate: yup
            .string()
            .when('Holiday_Date', (Holiday_Date: any, schema) => {
                if (Holiday_Date[0] === '') return schema.required('')
                return schema
            }),
        ToDate: yup
            .string()
            .when('Holiday_Date', (Holiday_Date: any, schema) => {
                if (Holiday_Date[0] === '') return schema.required('')
                return schema
            }),
        department_id: yup.array(),
        position_id: yup.array(),
        for_all: yup.boolean().required(),
        is_active: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: editMode ? editData.Holiday_Setting_ID : undefined,
            holiday_name: editMode ? editData.holiday_name : '',
            Holiday_Date: editMode ? editData.Holiday_Date : '',
            company_id: editMode ? editData.company_id : [],
            location_id: editMode ? editData.location_id : [],
            branch_id: editMode ? editData.branch_id : [],
            department_id: editMode ? editData.department_id : [],
            position_id: editMode ? editData.position_id : [],
            for_all: editMode ? editData?.for_all : undefined,
            is_active: editMode ? editData?.is_active : true,
        },
    })

    const { control } = form

    const isFromRequired = form.formState?.errors?.FromDate?.type
    const isToRequired = form.formState?.errors?.ToDate?.type

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    const { dirtyFields } = form.formState

    useEffect(() => {
        setStart(false)
    })

    useEffect(() => {
        if (date?.from !== undefined && date?.to !== undefined) {
            form.setValue('FromDate', `${date?.from}`)
            form.setValue('ToDate', `${date?.to}`)
        } else {
            //@ts-ignore
            form.setValue('FromDate', undefined)
            //@ts-ignore
            form.setValue('ToDate', undefined)
        }
    }, [date])

    const onSubmit = (data: any) => {
        data['FinancialYear_ID'] = financialYearId
        data['FromDate'] = formatDate(data.FromDate)
        data['ToDate'] = formatDate(data.ToDate)
        data['Holiday_Date'] = formatDate(data.Holiday_Date)

        if (data?.for_all) {
            data['branch_id'] = []
            data['company_id'] = []
            data['department_id'] = []
            data['location_id'] = []
            data['position_id'] = []
        }

        if (editMode) {
            update(data, {
                onSuccess: (updateHoliday) => {
                    //showNoti
                    showNotification({
                        message: updateHoliday.message,
                        type: 'success',
                    }),
                        //close modal
                        toggle()
                    const { afterValue, beforeValue } = getChangesValues(
                        dirtyFields,
                        form,
                        editData,
                    )
                    updateAudit({
                        ...auditPayload,
                        ValueAfter: afterValue,
                        ValueBefore: beforeValue,
                        Record_Name: editData?.holiday_name,
                    })
                },
                onError: (error) => {
                    showNotification({
                        message: error.message,
                        type: 'danger',
                    })
                },
            })
            return
        }
        create(data, {
            onSuccess: (createCurr) => {
                showNotification({
                    message: 'Saved Successfully',
                    type: 'success',
                }),
                    toggle()

                createAudit({
                    ...auditPayload,
                    ValueAfter: data,
                    Record_Name: data?.holiday_name,
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

    const selectedNumber =
        (form.watch('company_id')?.length || 0) +
        (form.watch('branch_id')?.length || 0) +
        (form.watch('department_id')?.length || 0) +
        (form.watch('location_id')?.length || 0) +
        (form.watch('position_id')?.length || 0)

    useEffect(() => {
        if (editMode && form.watch('for_all')) {
        } else {
            if (selectedNumber > 0) {
                form.setValue('for_all', false, { shouldDirty: true })
            } else {
                //@ts-ignore
                form.setValue('for_all', undefined, { shouldDirty: true })
            }
        }
    }, [selectedNumber])

    useEffect(() => {
        if (form.watch('for_all')) {
            popToggle()
            form.setValue('branch_id', [])
            form.setValue('company_id', [])
            form.setValue('department_id', [])
            form.setValue('location_id', [])
            form.setValue('position_id', [])
        } else if (!form.watch('for_all') && !selectedNumber) {
            //@ts-ignore
            form.setValue('for_all', undefined, { shouldDirty: true })
        }
    }, [form.watch('for_all')])

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="holiday_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">
                                    {t('name')}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Holiday_Date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    className={cn(
                                        isFromRequired &&
                                            isToRequired &&
                                            'text-danger-500',
                                    )}
                                >
                                    {t('date')}{' '}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    {editMode ? (
                                        <Datepicker
                                            onSelect={field.onChange}
                                            field={field}
                                            form={form}
                                            buttonClassNames="w-full"
                                        />
                                    ) : (
                                        <FormDateRange
                                            date={date}
                                            setDate={setDate}
                                        />
                                    )}
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="for_all"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Popover
                                        modal={true}
                                        open={value}
                                        onOpenChange={popToggle}
                                    >
                                        <PopoverTrigger asChild>
                                            <div className=" space-y-2">
                                                <FormLabel className="text-sm">
                                                    {t('applyfor')}
                                                    <span className="ms-1  text-danger-500">
                                                        *
                                                    </span>
                                                </FormLabel>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        `w-full  p-2  justify-between  focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                                                    )}
                                                >
                                                    {form.watch('for_all')
                                                        ? 'All'
                                                        : selectedNumber}{' '}
                                                    {t(
                                                        'modal.placeHolder.select',
                                                    )}
                                                    <CaretSortIcon className="ml-2  h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className={cn(` w-[300px] p-0 h-[170px] overflow-scroll`)}
                                        >
                                            <PublicAccordion form={form} />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    <div className="flex items-center gap-1">
                        <Label htmlFor="active">{t('activeCurrent')}</Label>
                        <br />
                        <FormField
                            control={form.control}
                            name="is_active"
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

                    <ModalConfirmBtns
                        isLoading={isLoaddding}
                        editMode={editMode}
                        toggle={toggle}
                        language="codeGenerator"
                    />
                </form>
            </Form>
            {/* {<DevTool control={form.control} />} */}
        </>
    )
}

export default PublicHolidayForm
