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
import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Popover } from '@radix-ui/react-popover'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
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
    useUpdateFinancialYear,
} from '@/service/query-hooks/setting/use-financial-year'
import { useTranslation } from 'react-i18next'
import { updateAudit } from '@/lib/audit-trail-api'
import useUserCookie from '@/hooks/use-user'
import useMenu from '@/state/zustand/menu'
import Datepicker from '@/components/ui/datepicker'

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

const FormSchema = yup.object({
    id: yup.number(),
    financialYearName: yup.string().required(' '),
    calendarYearFrom: yup.date().required(' '),
    calendarYearTo: yup.date().required(' '),
    payrollFromDate: yup.date().required(' '),
    payrollToDate: yup.date().required(' '),
    country: yup.string().required(),
    isActive: yup.boolean().required(),
})

const autoCompleteOptions = [
    { label: 'Myanmar', value: 'Myanmar' },
    { label: 'USA', value: 'USA' },
    { label: 'Tokyo', value: 'Japan' },
]

const FinancialEditForm = ({
    toggle,
    financialYear,
}: {
    toggle: () => void
    financialYear: any
}) => {
    const [calendarYearFrom, setCalendarYearFrom] = useState<Date>()
    const [calendarYearTo, setCalendarYearTo] = useState<Date>()
    const { showNotification } = useToast()
    const [sameCheck, setSameCheck] = useState<boolean>(false)
    const { update, isPending: isCreateLoading } = useUpdateFinancialYear()
    const { t } = useTranslation('financialYear')
    const user = useUserCookie()
    const { selectedMenuId, selectedSubMenuId } = useMenu()

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: financialYear.id,
            financialYearName: financialYear.financialYearName,
            calendarYearFrom: new Date(financialYear.calendarYearFrom),
            calendarYearTo: new Date(financialYear.calendarYearTo),
            payrollFromDate: new Date(financialYear.payrollFromDate),
            payrollToDate: new Date(financialYear.payrollToDate),
            country: financialYear.country,
            isActive: financialYear.isActive,
        },
    });

    const {dirtyFields} = form.formState;





    const isFromRequired = form.formState?.errors?.calendarYearFrom?.type
    const isToRequired = form.formState?.errors?.calendarYearTo?.type

    const isPayrollFromRequired = form.formState?.errors?.payrollFromDate?.type
    const isPayrollToRequired = form.formState?.errors?.payrollToDate?.type

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: 'Financial Year Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedSubMenuId!,
    }

    const handleOnSave = (data: FormInputs) => {

        update(data, {
            onSuccess: (createFinan) => {
                //showNofi
                showNotification({
                    message: createFinan.message,
                    type: 'success',
                })
                //close modal
                toggle();

                


                //   update audit
                updateAudit({
                    ...auditPayload,
                    ValueAfter: createFinan.data,
                    ValueBefore: financialYear!,
                    Record_Name: financialYear!.financialYearName,
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
    };



    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
                className="space-y-4"
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
                                                `w-[200px] justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
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
                                                : `Select`}
                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className={cn(`w-[200px] p-0`)}>
                                    <Command>
                                        <CommandInput
                                            placeholder="Search..."
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
                                                    onSelect={() => {
                                                        form.setValue(
                                                            'country',
                                                            item.value,
                                                        )
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel
                        style={{
                            color:
                                isFromRequired || isToRequired
                                    ? 'red'
                                    : 'black',
                        }}
                    >
                        {t('calendarYearRange')}{' '}
                        <span className="ms-1 text-danger-500">*</span>
                    </FormLabel>
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="calendarYearFrom"
                            render={({ field }) => (
                                <FormControl>
                                    <Datepicker
                                        {...field}
                                        same
                                        sameValue={field.value}
                                        buttonClassNames="w-1/2"
                                        placeholder="From"
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
                            name="calendarYearTo"
                            render={({ field }) => (
                                <FormControl>
                                    <Datepicker
                                        {...field}
                                        same
                                        sameValue={field.value}
                                        buttonClassNames="w-1/2"
                                        placeholder="To"
                                        onSelect={(value) => {
                                            // Handle date selection or state update as needed
                                            field.onChange(value)
                                        }}
                                    />
                                </FormControl>
                            )}
                        />
                    </div>
                </FormItem>
                <FormItem>
                    <FormLabel
                        style={{
                            color:
                                isPayrollFromRequired || isPayrollToRequired
                                    ? 'red'
                                    : 'black',
                        }}
                    >
                        {t('financialYearRange')}{' '}
                        <span className="ms-1 text-danger-500">*</span>
                    </FormLabel>
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="payrollFromDate"
                            render={({ field }) => (
                                <FormControl>
                                    <Datepicker
                                        {...field}
                                        same
                                        sameValue={field.value}
                                        buttonClassNames="w-1/2"
                                        placeholder="From"
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
                                        {...field}
                                        same
                                        sameValue={field.value}
                                        buttonClassNames="w-1/2"
                                        placeholder="To"
                                        onSelect={(value) => {
                                            // Handle date selection or state update as needed
                                            field.onChange(value)
                                        }}
                                    />
                                </FormControl>
                            )}
                        />
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
                <div className="w-full flex justify-end  mt-5 gap-2">
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-[80px]"
                    >
                        Save
                    </Button>
                    <Button
                        type="button"
                        onClick={toggle}
                        variant="outline"
                        className="w-[80px]"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FinancialEditForm
