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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

import useToast from '@/hooks/use-toast'
import { createAudit, updateAudit } from '@/lib/audit-trail-api'
import { useTranslation } from 'react-i18next'

import useMenu from '@/state/zustand/menu'
import useUserCookie from '@/hooks/use-user'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CreateCurrencyType } from '@/types/setting/currency'
import {
    useCreateCurrency,
    useUpdateCurrency,
} from '@/service/query-hooks/setting/use-currency'
import { autoCompleteOptions } from '@/lib/currency'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'

const FormSchema = yup.object({
    id: yup.number(),
    currencyType: yup.string().required(' '),
    description: yup.string(),
    defaultCurrency: yup.boolean().required(),
})

type PropTypes = {
    editMode?: boolean
    editData?: CreateCurrencyType
    toggle: () => void
}

const CurrencyForm = ({ editData, editMode, toggle }: PropTypes) => {
    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: editMode ? editData!.id : 0,
            currencyType: editMode ? editData!.currencyType : '',
            description: editMode ? editData!.description : '',
            defaultCurrency: editMode ? editData!.default : false,
        },
    })

    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const { t } = useTranslation('currency')
    const { showNotification } = useToast()
    const { create, isPending: isCreateLoading } = useCreateCurrency()
    const { update, isPending: isUpdateLoading } = useUpdateCurrency()
    const user = useUserCookie()
    const [popoverOpen, setPopoverOpen] = useState(false)
    const isLoading = isCreateLoading || isUpdateLoading

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: 'Job Type Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    const handleOnSave = async (data: CreateCurrencyType) => {
        if (editMode) {
            update(data, {
                onSuccess: (updateCurrency) => {
                    //showNoti
                    showNotification({
                        message: updateCurrency.message,
                        type: 'success',
                    }),
                        //close modal
                        toggle()

                    //update audit
                    updateAudit({
                        ...auditPayload,
                        ValueAfter: updateCurrency.data,
                        ValueBefore: updateCurrency!,
                        Record_Name: updateCurrency?.data.CurrencyType,
                    })
                },
            })
            return
        }
        create(data, {
            onSuccess: (createCurr) => {
                showNotification({
                    message: createCurr.message,
                    type: 'success',
                })

                //close modal
                toggle()

                //create audit
                createAudit({
                    ...auditPayload,
                    ValueAfter: createCurr.data,
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
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="currencyType"
                    render={({ field }) => (
                        <FormItem className="flex  flex-col">
                            <FormLabel>
                                {t('currencyType')}{' '}
                                <span className="ms-1 text-danger-500">*</span>
                            </FormLabel>
                            <Popover
                                open={popoverOpen}
                                onOpenChange={setPopoverOpen}
                            >
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                           {...field}
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                `w-full   justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
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
                                                : t(
                                                      'modal.placeHolder.currencyType',
                                                  )}
                                            <CaretSortIcon className="ml-2  h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className={cn(` min-w-full   p-0`)}
                                >
                                    <Command>
                                        <CommandInput
                                            placeholder={t(
                                                'modal.placeHolder.search',
                                            )}
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                No item found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {autoCompleteOptions.map(
                                                    (item) => (
                                                        <CommandItem
                                                            value={item.label}
                                                            key={item.value}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    'currencyType',
                                                                    item.value,
                                                                )
                                                                setPopoverOpen(
                                                                    false,
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
                                                    ),
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
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

                {/* exchange and default Checkbox */}
                <div className=" flex justify-between">
                    <div className="flex items-center gap-1">
                        <Label htmlFor="active">{t('defaultCurrency')}</Label>
                        <br />
                        <FormField
                            control={form.control}
                            name="defaultCurrency"
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
                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {t('useExchangeRate')}
                        </label>
                        <Checkbox id="terms" />
                    </div>
                </div>
                <ModalConfirmBtns
                    isLoading={isLoading}
                    editMode={editMode}
                    language="currency"
                    toggle={toggle}
                />
            </form>
        </Form>
    )
}

export default CurrencyForm
