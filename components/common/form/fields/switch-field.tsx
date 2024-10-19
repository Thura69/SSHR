import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type SwitchFieldProps = {
    fieldName: string
    languageName: string
    required: boolean
    fieldHeight: string 
    fieldWidth: string
    placeholder?: string
    flexDirection?: string
    disabled?: boolean
}

const SwitchField: React.FC<SwitchFieldProps> = ({
    fieldName,
    languageName,
    required,
    fieldHeight,
    fieldWidth,
    placeholder = 'plac Holder',
    flexDirection = 'flex-col justify-start',
    disabled = false,
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={cn(fieldWidth)}>
                    <div className={cn('flex  gap-3  ', flexDirection)}>
                        <FormLabel className="figma-text-label font-light ">
                            {t(fieldName)}{' '}
                        </FormLabel>
                        <FormControl>
                            <Switch
                                disabled={disabled}
                                id="active"
                                className="h-[20px] w-[39px] disabled:opacity-100"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                thumbClassName="h-[12px] w-[12px]"
                            />
                        </FormControl>
                    </div>
                </FormItem>
            )}
        />
    )
}

export default SwitchField
