import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import useFormStore from '@/state/zustand/form-store'
import React from 'react'

const CheckBoxAlert =({
    form,
    formInput,
    formCheck,
    type,
    setFormInputName,
}: {
    form: any
    formInput: string
    formCheck: string
    setValue: any
    type: string
    setFormInputName: any
}) => {
    const { removeFormInputName } = useFormStore()

    const handleClick = (e: any) => {
        form.setValue(`${formCheck}`, e, { shouldDirty: true })

        if (e === false) {
            setFormInputName(formInput)
        } else if (e === true) {
            removeFormInputName(formInput)
        }
    }

    return (
        <FormField
            control={form.control}
            name={formCheck}
            render={({ field }) => (
                <FormItem className=" flex items-center justify-center">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={handleClick}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default CheckBoxAlert
