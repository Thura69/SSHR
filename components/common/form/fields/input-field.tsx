import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Placeholder } from 'react-select/animated'

type DatePickerFieldProps = {
    fieldName: string
    languageName: string
    required: boolean
    fieldHeight: string
    fieldWidth: string
    placeholder?: string
    requiredLabel?: boolean
    disabled?: boolean
    type?: 'number' | 'text'
}

const InputField: React.FC<DatePickerFieldProps> = ({
    fieldName,
    languageName,
    required,
    fieldHeight,
    fieldWidth,
    placeholder = 'plac Holder',
    requiredLabel = true,
    disabled = false,
    type = 'text',
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={fieldWidth}>
                    {requiredLabel && (
                        <FormLabel className="font-light">
                            {t(fieldName)}{' '}
                            {required && (
                                <span className="ms-1 text-danger-500">*</span>
                            )}
                        </FormLabel>
                    )}
                    <FormControl>
                        <Input
                            type={type}
                            disabled={disabled}
                            className={cn(
                                fieldHeight,
                                'text-[14px] disabled:border-none disabled:opacity-100  disabled:text-secondaryTextColor disabled:bg-[#F1F5FB] border-[#A0AEC0]',
                            )}
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default InputField
