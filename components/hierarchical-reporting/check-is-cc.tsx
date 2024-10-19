import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const CheckIsCc = () => {
    const form = useFormContext()

    return (
        <section className="flex justify-between items-center py-3">
            <FormField
                control={form.control}
                name="send-email-by"
                render={({ field }) => (
                    <FormItem className="space-y-3" key={form.watch('send-email-by')}>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-4 items-center"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="step-by-step" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Send email by hierarchy level
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="all" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        Send email to all selected list
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )}
            />
        </section>
    )
}

export default CheckIsCc
