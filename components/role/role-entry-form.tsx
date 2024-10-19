import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import useAuthStore from '@/state/zustand/auth-store'
import { useTranslation } from 'react-i18next'

const RoleEntryForm = () => {
    const form = useFormContext()
    const { t } = useTranslation('roleCreate')

   
    const isAdmin = useAuthStore((state) => state.userData.is_admin)
    const isAdmindd = useAuthStore((state) => state.userData)




    return (
        <>
            <section className="py-5 md:py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <FormField
                        control={form.control}
                        name="role_name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <div className="w-full space-y-2">
                                    <Label htmlFor="role-name">
                                        {t('role-name')}{' '}
                                        <span className="text-danger-500">
                                            *
                                        </span>
                                    </Label>
                                    <FormControl>
                                        <Input
                                            id="role-name"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <div className="w-full space-y-2">
                                    <Label htmlFor="role-description">
                                        {t('role-description')}
                                    </Label>
                                    <FormControl>
                                        <Input
                                            id="role-description"
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                {isAdmin ? (
                    <div className="flex flex-col lg:flex-row gap-2 md:gap-6 mt-6 lg:items-center md:px-6">
                        <FormField
                            control={form.control}
                            name="setup-adm"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox
                                                id="setup-adm"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div>
                                            <FormLabel
                                                htmlFor="setup-adm"
                                                className="text-sm text-gray-500"
                                            >
                                                {t('setup-admin')}
                                            </FormLabel>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                ) : null}
            </section>
            <FormField
                control={form.control}
                name="IsActive"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center gap-2 md:px-4">
                            <div className="space-y-0.5">
                                <Label className="text-md font-medium">
                                    {t('active')}
                                </Label>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="h-[20px] w-[39px]"
                                    thumbClassName="h-[14px] w-[14px]"
                                />
                            </FormControl>
                        </div>
                    </FormItem>
                )}
            />
        </>
    )
}
export default RoleEntryForm
