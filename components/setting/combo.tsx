import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

// type OptionTypes = Record<'value' | 'label', string>
type OptionType = {
    value: number
    label: string
}

interface ComboBoxProps {
    form: any
    field: any
    options: OptionType[]
    placeholder?: React.ReactNode
    label?: string
    isRequire?: boolean
    fieldName: string
}

export const ComboBox: React.FC<ComboBoxProps> = ({
    form,
    field,
    options,
    placeholder,
    label,
    fieldName,
    isRequire = false,
}) => {
    const { t } = useTranslation('common')
    const [select, setSelect] = useState(false)
    const [open, setOpen] = useState(false)

    const err = form.getFieldState(fieldName)

    //  const error = form.
    return (
        <FormItem className="flex flex-col relative gap-[5px]">
            {label ? (
                <FormLabel className={cn(select && 'text-black')}>
                    {label}{' '}
                    {isRequire && <span className={cn('text-red-500')}>*</span>}
                </FormLabel>
            ) : null}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground ',
                                'focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-primary-500',
                                !select &&
                                    err?.invalid &&
                                    'ring-offset-2 ring-2 ring-primary-500',
                            )}
                        >
                            {field.value
                                ? options.find(
                                      (company) =>
                                          company.value === field.value,
                                  )?.label
                                : placeholder ?? t('select')}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className={`w-full p-0 `}>
                    <Command>
                        <CommandInput
                            placeholder={`${t('search')} ...`}
                            className="h-9"
                        />
                        <CommandEmpty>No result found.</CommandEmpty>
                        <CommandGroup>
                            <ScrollArea
                                className="w-full rounded-md"
                                style={{
                                    height: Math.min(7, options.length) * 34,
                                }}
                            >
                                {options.map((company) => (
                                    <CommandItem
                                        value={company.label}
                                        key={`${company.value} / ${company.label}`}
                                        onSelect={() => {
                                            form.setValue(
                                                field.name,
                                                company.value,
                                            )
                                            setSelect(true)
                                            setOpen(false)
                                        }}
                                    >
                                        {company.label}
                                        <CheckIcon
                                            className={cn(
                                                'ml-auto h-4 w-4',
                                                company.value === field.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </ScrollArea>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </FormItem>
    )
}
