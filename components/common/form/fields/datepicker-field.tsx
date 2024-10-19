import Datepicker from '@/components/ui/datepicker'
import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
} from '@/components/ui/form'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type DatePickerFieldProps = {
    fieldName: string
    languageName: string
    required: boolean
    fieldHeight: string
    requiredLabel?: boolean
    fieldWidth: string
    disabled?: boolean
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
    fieldName,
    languageName,
    required,
    fieldHeight,
    fieldWidth,
    requiredLabel = true,
    disabled = false,
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)
    const [open,setOpen] = useState(false);

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
                        <Datepicker
                            height={`${fieldHeight} disabled:border-none 
                            disabled:text-secondaryTextColor
                            disabled:opacity-100 disabled:bg-[#F1F5FB] border-[#A0AEC0]  `}
                            buttonClassNames="w-full "
                            same={disabled}
                            field={field}
                            open={open}
                            setOpen={setOpen}
                            placeholder={t(`placeHolder.selectDate`)}
                            onSelect={(value) => {
                                form.setValue(fieldName, value!)
                                setOpen(false);
                            }}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default DatePickerField
