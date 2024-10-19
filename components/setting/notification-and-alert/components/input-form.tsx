import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const InputForm = ({ form, formInput }: { form: any; formInput: string }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const isRequired = form.formState?.errors[formInput]

        if (isRequired?.message === 'required') {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [form.formState?.errors[formInput]])

    return (
        <div className="flex    w-full  rounded  border-slate-200">
            <FormField
                control={form.control}
                name={formInput}
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Input
                                type="number"
                                pattern="[0-9]*"
                                className=" border-slate-300 rounded-none  focus-visible:ring-primary-200 outline-none"
                                {...field}
                                value={field.value}
                            />
                        </FormControl>
                        {show ? <></> : <FormMessage className="  w-[150%]" />}
                    </FormItem>
                )}
            ></FormField>
            <Button
                className=" h-[36px] w-[110px] cursor-default rounded-none bg-gray-200"
                variant={'outline'}
            >
                Day
            </Button>
        </div>
    )
}

export default InputForm
