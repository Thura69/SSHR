import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export type FormInputs = {
    name: string
    description?: string
    isActive?: boolean
}

const FormSchema = yup.object({
    name: yup.string().required(' '),
    description: yup.string(),
    isActive: yup.boolean(),
})

const SettingCreateForm = ({ toggle }: { toggle: () => void }) => {
    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            name: '',
            description: '',
            isActive: true,
        },
    })

    const handleOnSave = (data: FormInputs) => {
        toggle()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm">
                                Name{' '}
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-1">
                    <Label htmlFor="active">Active</Label>
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
                <div className="w-full flex justify-end gap-2">
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

export default SettingCreateForm
