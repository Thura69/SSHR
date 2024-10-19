import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type TextAreaFieldProps = {
    title: string
    fieldName: string
    languageName: string
    required: boolean
    fieldHeight: string
    fieldWidth: string
    placeholder?: string
    disabled?: boolean
}

const TextAreaFieldWithTitle: React.FC<TextAreaFieldProps> = ({
    title,
    fieldName,
    languageName,
    required,
    fieldHeight,
    fieldWidth,
    placeholder,
    disabled = false,
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={fieldWidth}>
                    <FormLabel className="font-light">
                        {t(title)}{' '}
                        {required && (
                            <span className="ms-1 text-danger-500">*</span>
                        )}
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            disabled={disabled}
                            className={cn(
                                fieldHeight,
                                'text-[14px] disabled:text-secondaryTextColor border-[#A0AEC0] disabled:opacity-100 disabled:border-none  disabled:bg-[#F1F5FB]',
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

export default TextAreaFieldWithTitle
