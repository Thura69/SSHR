import { additionalData } from '@/components/setting/code-generator/utils'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Form,
} from '@/components/ui/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { MultiSelectDrop } from '@/components/common/form/multi-select-drop'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

type PropsTypes = {
    editMode?: boolean
    editData?: any
    toggle: () => void
}

export const SectionForm = ({ toggle, editData, editMode }: PropsTypes) => {
    const { t } = useTranslation('section')
    const [popoverOpen, setPopoverOpen] = useState(false)

    const FormSchema = yup.object({
        id: yup.number(),
        Department_Name: yup.string().required(),
        section_name: yup.string().required().trim().max(50, t('nameError')),
        Total_Employee:yup.string(),
        description: yup.string(),
        is_active: yup.boolean().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: editMode ? editData?.id : 0,
            Department_Name: editMode ? editData?.Department_Name : '',
            section_name: editMode ? editData?.section_name : '',
            Total_Employee:editMode?editData?.Total_Employees:'',
            description: editMode ? editData?.description : '',
            is_active: editMode ? editData?.is_active : true,
        },
    })

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((e) => {
                    console.log(e)
                })}
            >
                <div className=" space-y-2">
                    
                    <FormField
                        control={form.control}
                        name="Department_Name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {t('departmentName')}{' '}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </FormLabel>
                                <MultiSelectDrop
                                    popoverOpen={popoverOpen}
                                    setPopoverOpen={setPopoverOpen}
                                    languageTitle="section"
                                    additionalData={additionalData}
                                    fieldName='Department_Name'
                                    field={field}
                                />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="section_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {t('sectionName')}{' '}
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
                  {
                    editMode &&   <FormField
                    control={form.control}
                    name="Total_Employee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('totalEmployee')}</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                  }
                    
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
                        <Label htmlFor="Active">{t('Active')}</Label>
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
                </div>
                <ModalConfirmBtns
                    isLoading={false}
                    editMode={editMode}
                    language="section"
                    toggle={toggle}
                />
            </form>
        </Form>
    )
}
