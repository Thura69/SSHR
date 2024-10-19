'use client'
import Loader from '@/components/common/loaders/loader'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useToast from '@/hooks/use-toast'
import useUserCookie from '@/hooks/use-user'
import { createAudit, updateAudit } from '@/lib/audit-trail-api'
import { cn, getChangesValues } from '@/lib/utils'
import {
    useCreateDeviceSetups,
    useUpdateDeviceSetup,
} from '@/service/query-hooks/setting/use-deviceSetup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useMenu from '@/state/zustand/menu'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { autoCompleteOptions, baudRateOptions } from '../../utils'
import { Switch } from '@/components/ui/switch'
import { DeviceSetUpType } from '@/types/setting/device-setup-types'

type connection_type = 'USB Connection' | 'Network Connection'

function DeviceSetupForm({
    editMode,
    editData,
}: {
    editMode?: boolean
    editData?: DeviceSetUpType
}) {
    const { t } = useTranslation('deviceSetup')
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [usbDisable, setUsbDisable] = useState(false)
    const { update, isPending: upPen } = useUpdateDeviceSetup()
    const { create } = useCreateDeviceSetups()
    const { showNotification } = useToast()
    const user = useUserCookie()
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const [isSubmit, setIsSubmit] = useState(false)
    const router = useRouter()

    const isLoading = upPen

    const FormSchema = yup.object().shape({
        device_id: yup.number(),
        device_name: yup.string().required(''),
        device_number: yup
            .number()
            .required('')
            .typeError('Device number must be number!'),
        is_active: yup.boolean(),
        model: yup.string().required(''),
        allow_meal_allowance: yup.boolean(),
        connection_type: yup.string().required(''),
        interval: yup.number().required('').typeError(t('internalError')),
        mode: yup.string().required(''),
        baud_rate: yup
            .number()
            .when(
                'connection_type',
                (connection_type: connection_type[], schema) => {
                    if (connection_type[0] === 'Network Connection')
                        return schema.required('Baud rate is required')
                    return schema
                },
            ),
        ip_address: yup
            .string()
            .when(
                'connection_type',
                (connection_type: connection_type[], schema) => {
                    if (connection_type[0] === 'Network Connection')
                        return schema.required('Ip address is required')
                    return schema
                },
            ),
        port_number: yup
            .number()
            .when(
                'connection_type',
                (connection_type: connection_type[], schema) => {
                    if (connection_type[0] === 'Network Connection')
                        return schema.required('Port number is required')
                    return schema
                },
            ),
        password: yup
            .string()
            .when(
                'connection_type',
                (connection_type: connection_type[], schema) => {
                    if (connection_type[0] === 'Network Connection')
                        return schema.required('Ip address is required')
                    return schema
                },
            ),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {},
        values: editData,
    })

    useEffect(() => {
        if (form.getValues('baud_rate') !== undefined) {
            form.clearErrors('baud_rate')
        }
    }, [form.watch('baud_rate')])

    useEffect(() => {
        if (!editMode) {
            form.setValue('mode', 'Both')
            form.setValue('connection_type', 'Network Connection')
            form.setValue('is_active', true)
            form.setValue('allow_meal_allowance', false)
            form.setValue('baud_rate', undefined)
            form.setValue('port_number', undefined)
        }
    }, [])

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    const { dirtyFields } = form.formState

    const handleOnSave = async (data: any) => {
        if (editMode) {
            update(data, {
                onSuccess: (updateDevice) => {
                    //showNoti
                    showNotification({
                        message: updateDevice.message,
                        type: 'success',
                    })

                    //close modalb
                    const { afterValue, beforeValue } = getChangesValues(
                        dirtyFields,
                        form,
                        editData,
                    )

                    //update audit
                    updateAudit({
                        ...auditPayload,
                        ValueAfter: afterValue,
                        ValueBefore: beforeValue!,
                        Record_Name: editData?.device_name,
                    })
                    router.push('/settings/device-setup')
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
                    message: createCurr.message,
                    type: 'success',
                })

                createAudit({
                    ...auditPayload,
                    ValueAfter: createCurr.data,
                    Record_Name: createCurr.data?.device_name,
                })

                // router.push('/settings/device-setup');

                form.reset({
                    device_name: '',
                    // @ts-ignore
                    device_number: '',
                    model: '',
                    allow_meal_allowance: false,
                    // @ts-ignore
                    interval: '',
                    mode: 'Both',
                    is_active: true,
                    connection_type: 'Network Connection',
                    password: '',
                })
            },
            onError: (error) => {
                showNotification({
                    message: error.message,
                    type: 'danger',
                })
            },
        })

        setIsSubmit((e) => !e)

        form.reset(
            {
                ip_address: '',
                port_number: 0,
                baud_rate: 0,
                password: '',
            },
            { keepValues: true },
        )
    }

    useEffect(() => {
        if (form.watch('connection_type') === 'USB Connection') {
            // @ts-ignore
            form.setValue('port_number', undefined)
            // @ts-ignore
            form.setValue('ip_address', '')
            form.setValue('baud_rate', undefined)
            form.setValue('password', '')

            form.clearErrors([
                'ip_address',
                'port_number',
                'password',
                'baud_rate',
            ])

            return setUsbDisable(true)
        } else {
            return setUsbDisable(false)
        }
    }, [form.watch('connection_type'), isSubmit])

    const handleCancel = () => {
        router.push('/settings/device-setup')
    }

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(handleOnSave)}
                className="mt-[-20px]"
            >
                <div className="flex  flex-col lg:flex-row gap-[30px]  justify-center form-parent">
                    {/* form one start */}
                    <div className="form-one w-full lg:w-1/2 space-y-4   p-3 rounded">
                        {/* device name */}
                        <FormField
                            control={form.control}
                            name="device_name"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('device_name')}{' '}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="string" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* device name */}

                        {/* device no */}
                        <FormField
                            control={form.control}
                            name="device_number"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('deviceNo')}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* device no */}

                        {/* model */}
                        <FormField
                            control={form.control}
                            name="model"
                            render={({ field }) => (
                                <FormItem className="flex gap-1 flex-col">
                                    <FormLabel>
                                        {t('modalForm')}{' '}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Popover
                                            open={popoverOpen}
                                            onOpenChange={setPopoverOpen}
                                        >
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
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
                                                                  'modal.placeHolder.select',
                                                              )}
                                                        <CaretSortIcon className="ml-2  h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className={cn(
                                                    ` min-w-1/2   p-0`,
                                                )}
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
                                                                        value={
                                                                            item.label
                                                                        }
                                                                        key={
                                                                            item.value
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                'model',
                                                                                item.value,
                                                                                {
                                                                                    shouldDirty:
                                                                                        true,
                                                                                },
                                                                            )
                                                                            form.clearErrors(
                                                                                'model',
                                                                            )
                                                                            setPopoverOpen(
                                                                                false,
                                                                            )
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
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
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* model */}

                        {/* allow Meal */}
                        {/* <FormField
                            control={form.control}
                            name="AllowMealAllowance"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <div className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="text-sm">
                                            {t('allowMeal')}
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        /> */}
                        {/* allow Meal*/}

                        {/* interval time */}
                        <FormField
                            control={form.control}
                            name="interval"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm my-2">
                                        {t('IntervalTime')}{' '}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* interval time  */}

                        {/* Mode  */}
                        <FormField
                            control={form.control}
                            name="mode"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-sm">
                                        {t('mode')}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex  space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        checked={
                                                            field.value ===
                                                            'Both'
                                                        }
                                                        value="Both"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Both
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        checked={
                                                            field.value ===
                                                            'Entrance'
                                                        }
                                                        value="Entrance"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Entrance
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        checked={
                                                            field.value ===
                                                            'Exit'
                                                        }
                                                        value="Exit"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Exit
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* Mode  */}
                        {/* active */}
                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <div className="flex items-center space-x-2">
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            {/* <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            /> */}
                                        </FormControl>
                                        <FormLabel className="text-sm">
                                            {t('formActive')}
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        {/* active*/}
                    </div>
                    {/* form one end */}

                    {/* form two start */}
                    <div className="form-two  bg-gray-50 p-3 rounded  w-full lg:w-1/2 space-y-4">
                        <h2 className="font-bold text:xl sm:text-xl">
                            {t('setting')}
                        </h2>

                        {/* change componet */}
                        <FormField
                            control={form.control}
                            name="connection_type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-sm">
                                        {t('connection_type')}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex  space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        checked={
                                                            field.value ===
                                                            'USB Connection'
                                                        }
                                                        value="USB Connection"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {t('useConnection')}
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        checked={
                                                            field.value ===
                                                            'Network Connection'
                                                        }
                                                        value="Network Connection"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {t('networkConnection')}
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Baud rate */}
                        <FormField
                            control={form.control}
                            name="baud_rate"
                            render={({ field }) => (
                                <FormItem className="flex  flex-col">
                                    <FormLabel>
                                        {t('BaudRate')}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    disabled={usbDisable}
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        `w-full  justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                                                        !field.value &&
                                                            'text-muted-foreground',
                                                    )}
                                                >
                                                    {field.value
                                                        ? baudRateOptions.find(
                                                              (language) =>
                                                                  language.value ===
                                                                  field.value,
                                                          )?.label
                                                        : t(
                                                              'modal.placeHolder.select',
                                                          )}
                                                    <CaretSortIcon className="ml-2  h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className={cn(` min-w-1/2   p-0`)}
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
                                                        {baudRateOptions.map(
                                                            (item) => (
                                                                <CommandItem
                                                                    value={
                                                                        item.label
                                                                    }
                                                                    key={
                                                                        item.value
                                                                    }
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            'baud_rate',
                                                                            item.value,
                                                                            {
                                                                                shouldDirty:
                                                                                    true,
                                                                            },
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
                                </FormItem>
                            )}
                        />
                        {/* Baud rate */}

                        {/* ip address */}
                        <FormField
                            control={form.control}
                            name="ip_address"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('ipAddress')}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={usbDisable}
                                            className={cn(
                                                usbDisable &&
                                                    'bg-gray-100  focus-within:text-slate-700  border-slate-200 focus-visible:border-slate-200',
                                            )}
                                            readOnly={usbDisable}
                                            {...field}
                                            value={
                                                field.value === undefined
                                                    ? ''
                                                    : field.value
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* ip address*/}

                        {/* port number */}
                        <FormField
                            control={form.control}
                            name="port_number"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('portNo')}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete={'off'}
                                            disabled={usbDisable}
                                            type="number"
                                            className={cn(
                                                usbDisable &&
                                                    'bg-gray-100  focus-within:text-slate-700  border-slate-200 focus-visible:border-slate-200',
                                            )}
                                            readOnly={usbDisable}
                                            {...field}
                                            value={
                                                field.value === undefined
                                                    ? ''
                                                    : field.value
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* port number*/}

                        {/* password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className=" w-full">
                                    <FormLabel className="text-sm">
                                        {t('password')}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete={'off'}
                                            type="password"
                                            disabled={usbDisable}
                                            className={cn(
                                                usbDisable &&
                                                    'bg-gray-100  focus-within:text-slate-700  border-slate-200 focus-visible:border-slate-200',
                                            )}
                                            readOnly={usbDisable}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        {/* password*/}
                    </div>
                </div>

                {/* confirm buttons */}
                <div className="w-full flex my-[30px] justify-end gap-2">
                    <Button
                        type="submit"
                        variant="primary"
                        className={`px-9 py-2 md:px-12 md:py-3 ${isLoading && 'opacity-50'}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader />
                        ) : editMode ? (
                            t('update')
                        ) : (
                            t('save')
                        )}
                        {/* Save */}
                    </Button>
                    <Button
                        type="button"
                        onClick={handleCancel}
                        variant="outline"
                        disabled={isLoading}
                        className={`px-9 py-2 md:px-12 md:py-3 ${isLoading && 'opacity-50'}`}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default DeviceSetupForm
