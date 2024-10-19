import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type RankRadioFieldProps = {
    languageName: string
    fieldName: string
    disabled?: boolean
}

const RadioRankfield: React.FC<RankRadioFieldProps> = ({
    languageName,
    fieldName,
    disabled = false,
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className="">
                    <FormLabel className="font-light">{t(fieldName)}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            disabled={disabled}
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex items-center gap-6"
                        >
                            <FormItem className="flex items-center  space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem
                                        checked={field.value === '1'}
                                        value={'1'}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal text-slate-400 ">
                                    {t('one')}
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center  space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem
                                        checked={field.value === '2'}
                                        value={'2'}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal text-slate-400 ">
                                    {t('two')}
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center  space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem
                                        checked={field.value === '3'}
                                        value={'3'}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal text-slate-400 ">
                                    {t('three')}
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center  space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem
                                        checked={field.value === '4'}
                                        value={'4'}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal text-slate-400 ">
                                    {t('four')}
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem
                                        checked={field.value === '5'}
                                        value={'5'}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal text-slate-400 ">
                                    {t('five')}
                                </FormLabel>
                            </FormItem>
                        </RadioGroup>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default RadioRankfield
