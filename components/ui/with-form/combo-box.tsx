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
import React from 'react'

type FRAMEWORKS = Record<'value' | 'label', string>

interface ComboBoxProps {
    form: any
    field: any
    options: FRAMEWORKS[]
    placeholder?: React.ReactNode
    label?: string
    isRequire?: boolean
    disable?: boolean
}

export const ComboBox: React.FC<ComboBoxProps> = ({
    form,
    field,
    options,
    placeholder,
    label,
    isRequire = false,
    disable,
}) => {
    return (
        <FormItem className="">
            {label ? (
                <FormLabel>
                    {label}{' '}
                    {isRequire ? (
                        <span className={'text-red-500'}> *</span>
                    ) : (
                        ''
                    )}
                </FormLabel>
            ) : null}
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            disabled={disable}
                            variant="outline"
                            role="combobox"
                            className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground',
                            )}
                        >
                            {field.value
                                ? options.find(
                                      (company) =>
                                          company.value === field.value,
                                  )?.label
                                : placeholder ?? 'Select'}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder="Search..." className="h-9" />
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
                                        key={company.value}
                                        onSelect={() => {
                                            form.setValue(
                                                field.name,
                                                company.value,
                                            )
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
