'use client'
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
import { UseFormReturn, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import Datepicker from '@/components/ui/datepicker'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover } from '@radix-ui/react-popover'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn, getChangesValues } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import useToast from '@/hooks/use-toast'
import {
    useCreateFinancialYear,
    useUpdateFinancialYear,
} from '@/service/query-hooks/setting/use-financial-year'
import { useTranslation } from 'react-i18next'
import {createAudit,updateAudit} from '@/lib/audit-trail-api';
import useUserCookie from '@/hooks/use-user'
import useMenu from '@/state/zustand/menu'
import Loader from '@/components/common/loaders/loader'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'



export type FormInputs = {
    id?: number | undefined
    financialYearName: string
    calendarYearFrom: Date | undefined
    calendarYearTo: Date | undefined
    payrollFromDate: Date | undefined
    payrollToDate: Date | undefined
    country: string
    isActive: boolean | undefined
}


const autoCompleteOptions = [
    { label: 'Myanmar', value: 'Myanmar' },
    { label: 'USA', value: 'USA' },
    { label: 'Tokyo', value: 'Japan' },
]

type PropsTypes = {
    editMode?: boolean
    editData?: any
    toggle: () => void
}

const FinancialCreateForm = ({ toggle, editData, editMode }: PropsTypes) => {
    const [calendarYearFrom, setCalendarYearFrom] = useState<Date>()
    const [calendarYearTo, setCalendarYearTo] = useState<Date>()
    const { showNotification } = useToast()
    const { t } = useTranslation('financialYear')
    const [sameCheck, setSameCheck] = useState<boolean>()
    const { create, isPending: isCreateLoading } = useCreateFinancialYear()
    const { update, isPending: isUpdateLoading } = useUpdateFinancialYear()
    const user = useUserCookie()
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const isLoading = isCreateLoading || isUpdateLoading


    const FormSchema = yup.object({
        id: yup.number(),
        financialYearName: yup.string().required(' ').trim().max(50,'moreThan50'),
        calendarYearFrom: yup.date().required(' '),
        calendarYearTo: yup
            .date()
            .required(' ')
            .test(
                'is-valid-date-range',
                t('dateRange'),
                function (value) {
                    const calendarYearFrom: Date = this.resolve(
                        yup.ref('calendarYearFrom'),
                    )
                    const minDate = new Date(calendarYearFrom)
                    minDate.setDate(minDate.getDate() + 364)
                    return value >= minDate
                },
            ),
        payrollFromDate: yup.date().required(' '),
        payrollToDate: yup
            .date()
            .required(' ')
            .test(
                'is-valid-date-range',
                t('dateRange'),
                function (value) {
                    const payrollFromDate: Date = this.resolve(
                        yup.ref('payrollFromDate'),
                    )
                    const minDate = new Date(payrollFromDate)
                    minDate.setDate(minDate.getDate() + 364)
                    return value >= minDate
                },
            ),
        country: yup.string().required(),
        isActive: yup.boolean().required(),
})


    
    

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: editMode ? editData?.id : 0,
            financialYearName: editMode ? editData?.financialYearName : '',
            calendarYearFrom: editMode ? editData?.calendarYearFrom : '',
            calendarYearTo: editMode ? editData?.calendarYearTo : undefined,
            payrollFromDate: editMode ? editData?.payrollFromDate :undefined,
            payrollToDate: editMode ? editData?.payrollToDate : undefined,
            country: editMode ? editData?.country : undefined,
            isActive: editMode ? editData?.isActive : true,
        },
    });

    const {dirtyFields} = form.formState;

    const isFromRequired = form.formState?.errors?.calendarYearFrom?.type
    const isToRequired = form.formState?.errors?.calendarYearTo?.type

    let isPayrollFromRequired:any = form.formState?.errors?.payrollFromDate?.type
    let isPayrollToRequired: any = form.formState?.errors?.payrollToDate?.type

    const maxError  = form.formState.errors.financialYearName?.message;




    useEffect(()=>{
       
        if(
    form.getValues('calendarYearFrom') !== undefined &&
    form.getValues('calendarYearTo') !== undefined &&
    form.getValues('payrollFromDate') !== undefined &&
    form.getValues('payrollToDate') !== undefined
){
    if(
        (form.getValues('calendarYearFrom') === form.getValues('payrollFromDate')) &&
        (form.getValues('calendarYearTo') === form.getValues('payrollToDate'))
    ){
        setSameCheck(true);
    }
}

       
    },[])


    useEffect(()=>{
       const rela = async()=>{
        const isValid = await FormSchema.isValid({
            calendarYearTo: await form.trigger('calendarYearTo'),
            payrollToDate: await form.trigger('payrollToDate'),
            payrollFromDate: await form.trigger('payrollFromDate'),
        });

        rela();
       }
    },[form.watch('calendarYearFrom'),form.watch('calendarYearTo')]);

    

   useEffect(()=>{
   if(maxError === 'moreThan50'){
    form.setError('financialYearName',{type:'max',message:t('nameError')})
   }
   },[maxError]);

   const auditPayload = {
    Is_Mobile: false,
    Emp_Name: user?.employee_name!,
    Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
    Parent_Menu_ID: selectedMenuId!,
    Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
}

    const handleOnSave = (data: FormInputs) => {
        if (editMode) {
            update(data, {
                onSuccess: (updateFinan) => {
                    //showNoti
                    showNotification({
                        message: updateFinan.message,
                        type: 'success',
                    })

                    //close modal
                    toggle();
                   const {
                    afterValue,
                    beforeValue} = getChangesValues(dirtyFields,form,editData);

                    //update audit
                    updateAudit({
                        ...auditPayload,
                        ValueAfter: afterValue,
                        ValueBefore: beforeValue!,
                        Record_Name: updateFinan!.data.FinancialYear_Name,
                    });
                },
                //onError
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
            onSuccess: (createFinan) => {
                //showNofi
                showNotification({
                    message: createFinan.message,
                    type: 'success',
                })
                //close modal
                toggle()

                //create audit
                createAudit({
                    ...auditPayload,
                    ValueAfter: createFinan.data,
                    Record_Name: createFinan!.data.FinancialYear_Name,
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

    useEffect(() => {
        const updatePayrollDates = async () => {
        
        if(form.getValues('calendarYearFrom') !== undefined && form.getValues('calendarYearTo') !== undefined){
           

            if (sameCheck) {
                form.setValue(
                    'payrollFromDate',
                    form.getValues('calendarYearFrom'),
                    {shouldDirty:true}
                )
                form.setValue('payrollToDate', form.getValues('calendarYearTo'),{shouldDirty:true})

                const isValid = await FormSchema.isValid({
                    calendarYearTo: await form.trigger('calendarYearTo'),
                    payrollToDate: await form.trigger('payrollToDate'),
                    payrollFromDate: await form.trigger('payrollFromDate'),
                });

    
    
                isPayrollToRequired = isValid
                isPayrollFromRequired = isValid
            }
        }
       
        }

        updatePayrollDates()

          
    }, [sameCheck]);





    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
                className="space-y-1 sm:space-y-5"
            >
                <FormField
                    control={form.control}
                    name="financialYearName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                {t('financialYear')}{' '}
                                <span className="ms-1 text-danger-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>
                                {t('country')}{' '}
                                <span className="ms-1 text-danger-500">*</span>
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            {...field}
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                `w-full  justify-between text-muted-foreground focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                                                !field.value &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            {field.value
                                                ? autoCompleteOptions.find(
                                                      (language) =>
                                                          language.value ===
                                                          field.value,
                                                  )?.label
                                                : t('modal.placeHolder.select')}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className={cn(`w-[200px] p-0`)}>
                                    <Command>
                                        <CommandInput
                                            placeholder={t(
                                                'modal.placeHolder.search',
                                            )}
                                            className="h-9"
                                        />
                                        <CommandEmpty>
                                            No item found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {autoCompleteOptions.map((item) => (
                                                <CommandItem
                                                    value={item.label}
                                                    key={item.value}
                                                    onSelect={(value) => {
                                                        // field.onChange(value);
                                                        field.onChange(
                                                            item.value,
                                                        )
                                                        // // form.setValue("country", item.value);
                                                    }}
                                                >
                                                    {item.label}
                                                    <CheckIcon
                                                        className={cn(
                                                            'ml-auto h-4 w-4',
                                                            item.value ===
                                                                field.value
                                                                ? 'opacity-100'
                                                                : 'opacity-0',
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />

                <FormItem>
                    <FormLabel
                        style={{
                            color:
                                sameCheck !== undefined &&
                                (isFromRequired || isToRequired)
                                    ? '#FF0000'
                                    : 'black',
                        }}
                    >
                        {t('calendarYearRange')}
                        <span className="ms-1 text-danger-500">*</span>
                    </FormLabel>
                    <div className="flex flex-col  lg:flex-row gap-2">
                        <FormField
                            control={form.control}
                            name="calendarYearFrom"
                            render={({ field }) => (
                                <FormControl>
                                    <Datepicker
                                     buttonClassNames="w-full "
                                     same={false}
                                     field={field}
                                     sameValue={editData?.calendarYearFrom}
                                     placeholder={t(`modal.placeHolder.from`)}
                                     disabled={{after:new Date(form.getValues('calendarYearTo'))}}
                                     onSelect={(value)=>{
                                        field.onChange(value)
                                        if (sameCheck) {
                                            form.setValue(
                                                'payrollFromDate',
                                                value!,
                                                {shouldDirty:true}
                                            )
                                        } 
                                     }}
                                    />
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="calendarYearTo"
                            render={({ field }) => (
                                    <FormControl>
                                        <Datepicker
                                            {...field}
                                            isRequired={isToRequired}
                                            same={false}
                                            field={field}
                                            sameValue={editData?.calendarYearTo}
                                            buttonClassNames="w-full"
                                            disabled={{before:new Date(form.getValues('calendarYearFrom'))}}
                                            placeholder={t(
                                                'modal.placeHolder.to',
                                            )}
                                            onSelect={(value) => {
                                                // Handle date selection or state update as needed
                                                setCalendarYearTo(value)
                                                field.onChange(value)
                                                if (sameCheck) {
                                                    form.setValue(
                                                        'payrollToDate',
                                                        value!,
                                                    {shouldDirty:true}
                                                    )
                                                }
                                            }}
                                        />
                                    </FormControl>
                            )}
                        />
                    </div>
                    {isToRequired === 'is-valid-date-range' && (
                        <p className="text-[#FF0000] text-xs">
                            {form.formState?.errors?.calendarYearTo?.message}
                        </p>
                    )}
                </FormItem>

                <FormItem>
                    <FormLabel
                        style={{
                            color:
                                sameCheck !== undefined &&
                                (isPayrollFromRequired || isToRequired)
                                    ? '#FF0000'
                                    : 'black',
                        }}
                    >
                        {t('financialYearRange')}
                        <span className="ms-1 text-danger-500">*</span>
                    </FormLabel>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <FormField
                            control={form.control}
                            name="payrollFromDate"
                            render={({ field }) => (
                                <FormControl>
                                    <Datepicker
                                        isRequired={isPayrollFromRequired}
                                        {...field}
                                        same={sameCheck}
                                        disabled={{after:new Date(form.getValues('payrollToDate'))}}
                                        sameValue={
                                            editMode
                                                ? editData?.payrollFromDate
                                                : calendarYearFrom
                                        }
                                        field={field}
                                        form={form}
                                        buttonClassNames="w-full"
                                        placeholder={t(
                                            'modal.placeHolder.from',
                                        )}
                                        onSelect={(value) => {
                                            // Handle date selection or state update as needed
                                            field.onChange(value)
                                        }}
                                    />
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="payrollToDate"
                            render={({ field }) => (
                                <FormControl>
                                    <Datepicker
                                        isRequired={isPayrollToRequired}
                                        {...field}
                                        field={field}
                                        same={sameCheck}
                                        disabled={{before:new Date(form.getValues('payrollFromDate'))}}
                                        sameValue={
                                            editMode
                                                ? editData?.payrollToDate
                                                : form.getValues(
                                                      'calendarYearTo',
                                                  )
                                        }
                                        buttonClassNames="w-full"
                                        form={form}
                                        placeholder={t('modal.placeHolder.to')}
                                        onSelect={(value) => {
                                            // Handle date selection or state update as needed
                                            field.onChange(value)
                                        }}
                                    />
                                </FormControl>
                            )}
                        />
                    </div>

                    {isToRequired === 'is-valid-date-range' && (
                        <p
                            className={cn(
                                'text-[#FF0000] text-xs',
                                !sameCheck && 'hidden',
                            )}
                        >
                            {form.formState?.errors?.calendarYearTo?.message}
                        </p>
                    )}

                    {isPayrollToRequired === 'is-valid-date-range' && (
                        <p
                            className={cn(
                                `text-[#FF0000]  text-xs`,
                                sameCheck && 'hidden',
                            )}
                        >
                            {form.formState?.errors?.payrollToDate?.message}
                        </p>
                    )}
                    <div className="flex items-center py-2  space-x-2">
                        <Checkbox
                            checked={sameCheck}
                            onCheckedChange={() => {
                                setSameCheck((prev) => !prev)
                            }}

                            id="terms"
                        />
                        <label
                            htmlFor="terms"
                            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {t('modal.sameWith')}
                        </label>
                    </div>
                </FormItem>

                <div className="flex items-center gap-1">
                    <Label htmlFor="active">{t('activeCurrent')}</Label>
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
                <ModalConfirmBtns
                    setSameCheck={(value) => {
                        if (sameCheck === undefined) {
                            setSameCheck(value)
                        }
                    }}
                    isLoading={isLoading}
                    editMode={editMode}
                    language="financialYear"
                    toggle={toggle}
                />
            </form>
        </Form>
    )
}

export default FinancialCreateForm
