import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'

type RadioFieldProps = {
    languageName: string
    fieldName: string
    isLabel: boolean
    values: [{ name: string; value: string }, { name: string; value: string }]
    disabled?: boolean
}

const RadiofieldCustom: React.FC<RadioFieldProps> = ({
    languageName,
    fieldName,
    isLabel = true,
    values,
    disabled = false,
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className="space-y-3">
                    {isLabel && (
                        <FormLabel className="font-light">
                            {t(fieldName)}
                        </FormLabel>
                    )}
                    <FormControl>
                        <RadioGroup
                            disabled={disabled}
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex space-x-4 "
                        >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem
                                        checked={
                                            field.value === values[0].value
                                        }
                                        value={values[0].value}
                                    />
                                </FormControl>
                                <FormLabel className={cn('font-normal text-slate-400',field.value === values[0].value && 'text-sideMenuTextColor2')}>
                                    {t(values[0].name)}
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem
                                        checked={
                                            field.value === values[1].value
                                        }
                                        value={values[1].value}
                                    />
                                </FormControl>
                                <FormLabel className={cn('font-normal text-slate-400 ',field.value === values[1].value && 'text-sideMenuTextColor2')}>
                                    {t(values[1].name)}
                                </FormLabel>
                            </FormItem>
                        </RadioGroup>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default RadiofieldCustom
