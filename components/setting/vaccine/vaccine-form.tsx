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
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

import useToast from '@/hooks/use-toast'
import { createAudit, updateAudit } from '@/lib/audit-trail-api'
import { useTranslation } from 'react-i18next'

import useMenu from '@/state/zustand/menu'
import useUserCookie from '@/hooks/use-user'
import { CreateVaccineType } from '@/types/setting/vaccine-type'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { cn, getChangesValues } from '@/lib/utils'
import { useGetAllVaccineType } from '@/service/query-hooks/setting/use-vaccineType'
import { VaccineTypeType } from '@/types/setting/rvaccine-type'
import {
    useCreateVaccine,
    useUpdateVaccine,
} from '@/service/query-hooks/setting/use-vaccine'
import { Skeleton } from '@/components/ui/skeleton'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import Loader from '@/components/common/loaders/loader'
import Text from '@/hooks/test'
import { toast } from 'react-toastify'

type PropTypes = {
    editMode?: boolean
    editData?: CreateVaccineType
    toggle: () => void
}

const VaccineForm = ({ editData, editMode, toggle }: PropTypes) => {
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const { t } = useTranslation('vaccine')
    const { showNotification } = useToast()
    const { create, isPending: isCreateLoading } = useCreateVaccine()
    const { update, isPending: isUpdateLoading } = useUpdateVaccine()
    const {
        isError,
        isLoading: isVaccineTypeLoading,
        data: vaccineTypeData,
    } = useGetAllVaccineType({ allActive: true })

    const [popoverOpen, setPopoverOpen] = useState(false)

    const user = useUserCookie()
    const isLoading = isCreateLoading || isUpdateLoading || isVaccineTypeLoading

    const memorizedData = useMemo(
        () => vaccineTypeData?.data,
        [vaccineTypeData],
    )

    const FormSchema = yup.object({
        id: yup.number(),
        vaccineTypeName: yup.string().required(),
        name: yup.string().required(' ').max(50, t('nameError')),
        description: yup.string(),
        status: yup.boolean().required(),
        vaccineTypeId: yup.number().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: editMode ? editData!.id : 0,
            vaccineTypeName: editMode ? editData!.vaccineTypeName : undefined,
            vaccineTypeId: editMode ? editData?.vaccineTypeId : 0,
            name: editMode ? editData!.name : '',
            description: editMode ? editData!.description : '',
            status: editMode ? editData!.status : true,
        },
    })
    const { dirtyFields } = form.formState

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    const handleOnSave = async (data: CreateVaccineType) => {


        if (editMode) {
        

            update(data, {
                onSuccess: (updateCurrency) => {
                    //showNoti
                    showNotification({
                        message: (
                            updateCurrency.message
                        ),
                        type: 'success',
                    }),
                        // toast(<Text/>)
                        //close modal
                        toggle()

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
                        Record_Name: updateCurrency?.data.vaccine_name,
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
                    message: createCurr.message,
                    type: 'success',
                })

                //close modal
                toggle()

                //create audit
                createAudit({
                    ...auditPayload,
                    ValueAfter: createCurr.data,
                    Record_Name: createCurr.data.vaccine_name,
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
                    name="vaccineTypeName"
                    render={({ field }) => (
                        <FormItem className="flex  flex-col">
                            <FormLabel>
                                {t('vaccineType')}{' '}
                                <span className="ms-1 text-danger-500">*</span>
                            </FormLabel>
                            <Popover
                                modal
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
                                            {field.value &&
                                            !isVaccineTypeLoading ? (
                                                memorizedData?.find(
                                                    (
                                                        language: VaccineTypeType,
                                                    ) =>
                                                        language.vaccine_type_name ===
                                                        field.value,
                                                )?.vaccine_type_name
                                            ) : editMode ? (
                                                <Loader />
                                            ) : (
                                                t('modal.placeHolder.select')
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
                                                {!isLoading ? (
                                                    memorizedData?.map(
                                                        (
                                                            item: VaccineTypeType,
                                                        ) => (
                                                            <CommandItem
                                                                value={
                                                                    item.vaccine_type_name
                                                                }
                                                                key={
                                                                    item.vaccine_type_id
                                                                }
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        'vaccineTypeName',
                                                                        item.vaccine_type_name,
                                                                        {
                                                                            shouldDirty:
                                                                                true,
                                                                        },
                                                                    )
                                                                    form.setValue(
                                                                        'vaccineTypeId',
                                                                        item.vaccine_type_id,
                                                                    )
                                                                    setPopoverOpen(
                                                                        false,
                                                                    )
                                                                }}
                                                            >
                                                                {
                                                                    item.vaccine_type_name
                                                                }
                                                                <CheckIcon
                                                                    className={cn(
                                                                        'ml-auto h-4 w-4',
                                                                        item.vaccine_type_name ===
                                                                            field.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0',
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ),
                                                    )
                                                ) : (
                                                    <section className="w-full space-y-4">
                                                        <Skeleton className="w-full h-3" />
                                                        <Skeleton className="w-full h-3" />
                                                        <Skeleton className="w-full h-3" />
                                                    </section>
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                {t('vaccine')}{' '}
                                <span className="ms-1 text-danger-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
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

                <div className="flex items-center gap-1">
                    <Label htmlFor="active">{t('formActive')}</Label>
                    <br />
                    <FormField
                        control={form.control}
                        name="status"
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
                    isLoading={isLoading}
                    toggle={toggle}
                    editMode={editMode}
                    language="vaccine"
                />
            </form>
        </Form>
    )
}

export default VaccineForm
