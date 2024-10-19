import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ColorPicker, Skeleton } from 'antd'
import { useState } from 'react'

type ColorPickerFieldProps = {
    languageName: string
    fieldName: string
    fieldWidth: string
    disabled?: boolean
}

const ColorPickerfield: React.FC<ColorPickerFieldProps> = ({
    languageName,
    fieldName,
    fieldWidth,
    disabled = false,
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)
    const [colorBoxOpen, setColorBoxOpen] = useState<boolean>(false)

    return (
        <FormField
            control={form.control}
            name={'color'}
            render={({ field }) => (
                <FormItem className={fieldWidth}>
                    <FormLabel className="text-sm font-light">
                        {t('color')}{' '}
                    </FormLabel>
                    <FormControl className="">
                        <Button
                            disabled={disabled}
                            variant={'ghost'}
                            className={cn(
                                'flex w-full cursor-pointer  border px-1 border-gray-400 relative  rounded-lg h-[37px] items-center justify-center ring-offset-background  focus-within:ring-2 focus-within:border-gray-400  focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-500',
                                'disabled:border-none disabled:opacity-100  disabled:text-secondaryTextColor disabled:bg-[#F1F5FB] disabled:cursor-not-allowed',
                            )}
                        >
                            <p
                                onClick={() => setColorBoxOpen((prev) => !prev)}
                                className={cn(
                                    'flex h-[36px]  text-sideMenuTextColor2  rounded-[10px] absolute left-0 z-0  bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent select-none file:text-sm file:font-medium placeholder:text-slate-400',
                                    disabled && 'text-secondaryTextColor',
                                )}
                            >
                                {field.value}
                            </p>

                            <ColorPicker
                                onChange={(_, hex) => {
                                    form.setValue('color', hex)
                                }}
                                className={cn(
                                    'border-none flex items-center justify-end z-[9999]  border-2 bg-transparent  w-full',
                                    disabled && 'cursor-not-allowed ',
                                )}
                                value={form.getValues('color')}
                                defaultValue={'#1CBCC8'}
                            />
                        </Button>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default ColorPickerfield
