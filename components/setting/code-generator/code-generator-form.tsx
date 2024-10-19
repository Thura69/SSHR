'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import useMenu from '@/state/zustand/menu'
import { useTranslation } from 'react-i18next'
import useToast from '@/hooks/use-toast'
import useUserCookie from '@/hooks/use-user'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import makeAnimated from 'react-select/animated'
import { useGetAllEmpStatus } from '@/service/query-hooks/setting/useEmploymentStatus'
// import { FancyMultiSelect } from '../common/fancy-multiselect'
import {
    useCreateCodeGeneraors,
    useUpdateCodeGenerator,
} from '@/service/query-hooks/setting/use-codeGenerator'
import { createAudit, updateAudit } from '@/lib/audit-trail-api'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn, getChangesValues } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Loader } from 'lucide-react'
import { MyInterface, TypesType, additionalData } from './utils'
import FancyMultiSelect from '../common/fancy-multiselect'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'

type Framework = Record<'value' | 'label', string>

type PropTypes = {
    editMode?: boolean
    editData?: any
    toggle: () => void
}

const FormSchema = yup.object({
    id: yup.number(),
    employeeStatus: yup.array().when('type', (type: TypesType[], schema) => {
        if (type[0] === 'Employee') return schema.required().min(1)
        return schema
    }),
    prefix: yup.string().required(''),
    type: yup.string().required(),
    sequence: yup.number().required(),
    format: yup.string().required(),
    remark: yup.string(),
    generateCode: yup.boolean(),
})

function CodeGeneratorForm({ editData, editMode, toggle }: PropTypes) {
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    const { isLoading: empLo, data: EmpData, isError } = useGetAllEmpStatus()
    const { isPending, create, isSuccess } = useCreateCodeGeneraors()
    const { isPending: uplo, update, isError: upEr } = useUpdateCodeGenerator()
    const [isPositionEmp, setIsPositionEmp] = useState(false)
    const [popoverOpen, setPopoverOpen] = useState(false)

    const { t } = useTranslation('codeGenerator')
    const { showNotification } = useToast()
    const user = useUserCookie()
    const animatedComponents = makeAnimated()
    const isLoading = empLo || uplo || isPending


    

    const memorizedDta = useMemo(() => EmpData, [EmpData])

    const modifiedData = memorizedDta?.data?.map((empData: any) => {
        return {
            value: empData.employment_status_id,
            label: empData.employment_status_name,
        }
    })

    // const combinedData = modifiedData ? [...modifiedData, ...additionalData] : additionalData;

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: editMode ? editData!.id : 0,
            employeeStatus: editMode
                ? editData!.employeeStatue?.map((empData: any) => {
                      return {
                          value: empData.employment_status_id,
                          label: empData.employment_status_name,
                      }
                  })
                : undefined,
            type: editMode ? editData!.positionType : '',
            prefix: editMode ? editData!.prefix : '',
            sequence: editMode ? editData!.serialNo : '',
            format: editMode ? editData!.format : '',
            remark: editMode ? editData!.remark : '',
            generateCode: editMode ? editData!.generateCode : false,
        },
    })

    // const auditPayload = {
    //     Is_Mobile: false,
    //     Emp_Name: user?.employee_name!,
    //     Page_Name: selectedGrandSubMenu?.menu_name + ' Page',
    //     Parent_Menu_ID: selectedMenuId!,
    //     Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
    //     Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    // }

    const { dirtyFields } = form.formState
    const { control } = form

    const handleOnSave = async (data: any) => {
        if (data.employeeStatus?.length === 0) {
            setIsPositionEmp(true)
        } else setIsPositionEmp(false)

        data.employeeStatus = data.employeeStatus.map((e: any) => {
            return e.value
        })

        if (editMode) {
            update(data, {
                onSuccess: (updateCurrency) => {
                    showNotification({
                        message: updateCurrency.message,
                        type: 'success',
                    }),
                        toggle()

                    const { afterValue, beforeValue } = getChangesValues(
                        dirtyFields,
                        form,
                        editData,
                    )

                    // updateAudit({
                    //     ...auditPayload,
                    //     ValueAfter: afterValue,
                    //     ValueBefore: beforeValue!,
                    //     Record_Name: updateCurrency?.data.Prefix,
                    // })
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

                toggle()

                // createAudit({
                //     ...auditPayload,
                //     ValueAfter: createCurr.data,
                //     Record_Name: createCurr.data?.Prefix,
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

    if (!modifiedData) return <div>Loading</div>

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
               
            >
                <div  className={cn(`space-y-2 `,form.getValues('type') === 'Employee' && 'h-[420px] p-2 overflow-y-auto')}>
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => {
                        return (
                            <FormItem className="flex flex-col">
                                <FormLabel className="mb-1">
                                    {t('type')}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <Popover
                                    modal
                                    open={popoverOpen}
                                    onOpenChange={setPopoverOpen}
                                >
                                    <PopoverTrigger
                                        asChild
                                        
                                        disabled={editMode}
                                      
                                    >
                                        <FormControl>
                                            <Button
                                                {...field}
                                                variant="outline"
                                                role="combobox"
                                                disabled={editMode}
                                                className={cn(
                                                    `w-full justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                            >
                                                {field.value
                                                    ? additionalData.find(
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
                                        className={cn(` min-w-full   p-0`)}
                                    >
                                        <Command className=''>
                                            <CommandInput
                                                placeholder={t(
                                                    'modal.placeHolder.search',
                                                )}
                                                className="h-9"
                                            />
                                            <CommandList className=''>
                                                <CommandEmpty>
                                                    No item found.
                                                </CommandEmpty>
                                                <CommandGroup >
                                                    {additionalData.map(
                                                        (item) => (
                                                            <CommandItem
                                                                value={
                                                                    item.label
                                                                }
                                                                key={item.value}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        'type',
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
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="employeeStatus"
                    render={({ field }) => (
                        <FormItem
                            className={cn(
                                'flex-col mb-3  py-2  hidden',
                                form.getValues('type') === 'Employee' && 'flex',
                            )}
                        >
                            <FormLabel className="mb-1">
                                {t('employeeStatus')}
                                <span className="ms-1 text-danger-500">*</span>
                            </FormLabel>
                            <FormControl>
                                {empLo ? (
                                    <Loader />
                                ) : (
                                    <FancyMultiSelect
                                        isEmpty={isPositionEmp}
                                        {...field}
                                        incomeStatus={editData?.employeeStatue}
                                        form={form}
                                        field={field}
                                        FRAMEWORKS={modifiedData}
                                    />
                                )}
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="sequence"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="text-sm">
                                    {t('serialNo')}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        disabled={editMode}
                                        readOnly={editMode}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="prefix"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">
                                    {t('prefix')}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={editMode}
                                        readOnly={editMode}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                {t('format')}{' '}
                                <span className="ms-1 text-danger-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={editMode}
                                    readOnly={editMode}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="remark"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('remark')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="border border-slate-400"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-1">
                    <Label htmlFor="active">{t('generateNewCode')}</Label>
                    <br />
                    <FormField
                        control={form.control}
                        name="generateCode"
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
                </div>
                
                <ModalConfirmBtns
                    isLoading={isLoading}
                    editMode={editMode}
                    language="codeGenerator"
                    toggle={toggle}
                />
            </form>
        </Form>
    )
}

export default CodeGeneratorForm
