import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import React from 'react'

const CheckBoxForm = ({ form, formInput }: { form: any; formInput: string })=> {
    return (
        <FormField
            control={form.control}
            name={formInput}
            render={({ field }) => (
                <FormItem className=" flex items-center justify-center">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default CheckBoxForm
