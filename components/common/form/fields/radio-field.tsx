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
    languageName:string,
    fieldName:string,
    disabled?:boolean
}

const Radiofield:React.FC<RadioFieldProps> = ({
    languageName,
    fieldName,
    disabled
})=>{

    const form = useFormContext();
    const { t } = useTranslation(languageName)


    return (   <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
            <FormItem className="space-y-3">
                <FormLabel className="font-light">
                    {t(fieldName)}
                </FormLabel>
                <FormControl>
                    <RadioGroup
                        disabled={disabled}
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex  space-y-1"
                    >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem
                                    checked={
                                        field.value === 'yes'
                                    }
                                    value={'yes'}
                                />
                            </FormControl>
                            <FormLabel className="font-normal text-slate-400 ">
                                {t('yes')}
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                                <RadioGroupItem
                                    checked={
                                        field.value === 'no'
                                    }
                                    value={'no'}
                                />
                            </FormControl>
                            <FormLabel className="font-normal text-slate-400 ">
                                {t('no')}
                            </FormLabel>
                        </FormItem>
                    </RadioGroup>
                </FormControl>
            </FormItem>
        )}
    />  )
}

export default Radiofield;