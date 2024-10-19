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
import { cn, getChangesValues } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
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
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import PublicAccordion from './modal/public-accordion'
import { format } from 'date-fns'
import Datepicker from '@/components/ui/datepicker'
import { Calendar } from './modal/custome-calendar'

const FormSchema = yup.object({
    id: yup.number(),
    Holiday_Name: yup.string().required(''),
    Company_ID: yup.array(),
    Location_ID: yup.array(),
    Holiday_Date: yup.string(),
    Branch_ID: yup.array(),
    From_Date: yup.string().required(''),
    To_Date: yup.string().required(''),
    Department_ID: yup.array(),
    Position_ID: yup.array(),
    ForAll: yup.boolean().required(),
    IsActive: yup.boolean(),
})

type PropTypes = {
    editMode?: boolean
    editData?: any
    toggle: () => void
    date?: any
}

const PublicHolidayForm = ({ editData, editMode, toggle }: PropTypes) => {
    const { create, isPending, isSuccess } = useCreatePublicHoliday()
    const { update, isError, isPending: upLoad } = useUpdatePublicHoliday()
    const { showNotification } = useToast()
    const { value, toggle: popToggle, setFalse } = useBoolean(false)
    const user = useUserCookie()
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const { t } = useTranslation('publicHoliday')
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })

    const isLoaddding = isPending || upLoad

    const [financialYearId, _] = useQueryState(
        'financial_year_id',
        parseAsInteger,
    );


    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: editMode ? editData.Holiday_Setting_ID : 0,
            Holiday_Name: editMode ? editData.Holiday_Name : '',
            Holiday_Date: editMode ? editData.Holiday_Date : '',
            Company_ID: editMode ? editData.Company_ID : [],
            Location_ID: editMode ? editData.Location_ID : [],
            Branch_ID: editMode ? editData.Branch_ID : [],
            Department_ID: editMode ? editData.Department_ID : [],
            Position_ID: editMode ? editData.Position_ID : [],
            ForAll: editMode ? editData?.ForAll : undefined,
            IsActive: editMode ? editData?.IsActive : true
        }
    });

    const isFromRequired = form.formState?.errors?.From_Date?.type
    const isToRequired = form.formState?.errors?.To_Date?.type


    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    const { dirtyFields } = form.formState;

    useEffect(()=>{
       if(date?.from !== undefined &&  date?.to !== undefined){

        form.setValue('From_Date',`${date?.from}`);
        form.setValue('To_Date',`${date?.to}`);

       }else{

        //@ts-ignore
        form.setValue('From_Date',undefined);
          //@ts-ignore
        form.setValue('To_Date',undefined)
       }
    },[date]);


    const onSubmit = (data: any) => {
       
        data['FinancialYear_ID'] = financialYearId 

        if (data?.ForAll) {
            data['Branch_ID'] = []
            data['Company_ID'] = []
            data['Department_ID'] = []
            data['Location_ID'] = []
            data['Position_ID'] = []
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
                        Record_Name: updateHoliday?.data.Holiday_Name,
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
                    ValueAfter: createCurr.result,
                    Record_Name: createCurr!.result.Holiday_Name,
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
        (form.watch('Company_ID')?.length || 0) +
        (form.watch('Branch_ID')?.length || 0) +
        (form.watch('Department_ID')?.length || 0) +
        (form.watch('Location_ID')?.length || 0) +
        (form.watch('Position_ID')?.length || 0)

    useEffect(() => {
        if (editMode && form.watch('ForAll')) {
        } else {
            if (selectedNumber > 0) {
                form.setValue('ForAll', false, { shouldDirty: true })
            } else {
                //@ts-ignore
                form.setValue('ForAll', undefined, { shouldDirty: true })
            }
        }
    }, [selectedNumber])

    useEffect(() => {
        if (form.watch('ForAll')) {
            popToggle()
            form.setValue('Branch_ID', [])
            form.setValue('Company_ID', [])
            form.setValue('Department_ID', [])
            form.setValue('Location_ID', [])
            form.setValue('Position_ID', [])
        } else if (!form.watch('ForAll') && !selectedNumber) {
            //@ts-ignore
            form.setValue('ForAll', undefined, { shouldDirty: true })
        }
    }, [form.watch('ForAll')]);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="Holiday_Name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                {t('name')}
                                <span className="ms-1 text-danger-500">*</span>
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
                            <FormLabel className={cn(( isFromRequired && isToRequired ) && 'text-danger-500')}>{t('date')} <span className="ms-1 text-danger-500">*</span></FormLabel>
                            <FormControl>
                                <Popover modal={true}>
                                    <PopoverTrigger
                                        className="m-0 border bg-green-500"
                                        asChild
                                    >
                                        <Button
                                            id="date"
                                            variant={'ghost'}
                                            className={cn(
                                                'w-full ring-1 bg-transparent  focus:ring-zinc-200  ring-gray-200 justify-start text-left font-normal',
                                                !date &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            {date?.from ? (
                                                date.to ? (
                                                    <>
                                                        {format(
                                                            date.from,
                                                            'LLL dd, y',
                                                        )}{' '}
                                                        -{' '}
                                                        {format(
                                                            date.to,
                                                            'LLL dd, y',
                                                        )}
                                                    </>
                                                ) : (
                                                    format(
                                                        date.from,
                                                        'LLL dd, y',
                                                    )
                                                )
                                            ) : (
                                                <span>
                                                   { t('pickADate')}
                                                </span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={date?.from}
                                            captionLayout="dropdown-buttons"
                                            selected={date}
                                            onSelect={setDate}
                                            fromYear={1960}
                                            toYear={2030}
                                            numberOfMonths={1}
                                            footer={<></>}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="ForAll"
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
                                                {form.watch('ForAll')
                                                    ? 'All'
                                                    : selectedNumber}{' '}
                                                {t('modal.placeHolder.select')}
                                                <CaretSortIcon className="ml-2  h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className={cn(` lg:w-[350px] p-0`)}
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
                        name="IsActive"
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
    )
}

export default PublicHolidayForm
