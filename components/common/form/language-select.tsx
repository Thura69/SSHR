import React, { FC, ReactNode, useState } from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Button } from '../../ui/button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon, LanguagesIcon } from 'lucide-react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '../../ui/command'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import usePreferenceState from '@/state/zustand/preference'

const autoCompleteOptions = [
    {
        label: 'English',
        value: 'en',
        icon: () => (
            <img
                src="https://flagcdn.com/us.svg"
                className="mr-2"
                width="20"
                alt="United States"
            />
        ),
    },
    // {
    //   label: 'Italy',
    //   value: 'fr',
    //   icon: () => (
    //     <img
    //       src="https://flagcdn.com/it.svg"
    //       width="20"
    //       className="mr-2"
    //       alt="Italy"
    //     />
    //   ),
    // },
    // {
    //   label: 'Japanese',
    //   value: 'jp',
    //   icon: () => (
    //     <img
    //       src="https://flagcdn.com/jp.svg"
    //       className="mr-2"
    //       width="20"
    //       alt="Japan"
    //     />
    //   ),
    // },
    {
        label: 'Myanmar',
        value: 'mm',
        icon: () => (
            <img
                src="https://flagcdn.com/w20/mm.png"
                className="mr-2"
                width="20"
                alt="Myanmar"
            />
        ),
    },
]

interface AutoCompleteProps {
    form: UseFormReturn<any | undefined>
    name: string
    description?: ReactNode
    label?: ReactNode
    // options?: Options;
    width?: number
    onLanguageChange?: Function
}

export const LanguageSelect: FC<AutoCompleteProps> = ({
    form,
    name,
    label,
    // options,
    description,
    width,
    onLanguageChange,
}) => {
    const selectedLanguage =
        usePreferenceState.getState().selectedLanguage || 'en'
    const handleOnSelect = (item: any) => {
        setIsOpen(!isOpen)
        form.setValue(name, item.value)
        onLanguageChange?.(item.value)
    }
    const [isOpen, setIsOpen] = useState(false)
    return (
        <FormProvider {...form}>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>{label}</FormLabel>
                        <Popover open={isOpen}>
                            <PopoverTrigger
                                asChild
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            `w-[${
                                                width ? width : '200'
                                            }px] justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                                            !field.value &&
                                                'text-muted-foreground',
                                            { width: `w-[${width}px]` },
                                        )}
                                    >
                                        {field.value ? (
                                            <>
                                                {autoCompleteOptions
                                                    .find(
                                                        (language) =>
                                                            language.value ===
                                                            field.value,
                                                    )
                                                    ?.icon()}{' '}
                                                {/* Display selected language icon */}
                                                {
                                                    autoCompleteOptions.find(
                                                        (language) =>
                                                            language.value ===
                                                            field.value,
                                                    )?.label
                                                }{' '}
                                                {/* Display selected language label */}
                                            </>
                                        ) : (
                                            <>
                                                {autoCompleteOptions
                                                    .find(
                                                        (language) =>
                                                            language.value ===
                                                            selectedLanguage,
                                                    )
                                                    ?.icon()}{' '}
                                                {/* Display selected language icon */}
                                                {
                                                    autoCompleteOptions.find(
                                                        (language) =>
                                                            language.value ===
                                                            selectedLanguage,
                                                    )?.label
                                                }{' '}
                                                {/* Display selected language label */}
                                            </>
                                        )}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                                className={cn(
                                    `w-[${width ? width : '200'}px] p-0`,
                                    {
                                        width: `w-[${width}px]`,
                                    },
                                )}
                            >
                                <Command>
                                    <CommandInput
                                        placeholder="Search..."
                                        className="h-9"
                                    />
                                    <CommandEmpty>No item found.</CommandEmpty>
                                    <CommandGroup>
                                        {autoCompleteOptions.map((item) => (
                                            <CommandItem
                                                value={item.label}
                                                key={item.value}
                                                onSelect={() =>
                                                    handleOnSelect(item)
                                                }
                                            >
                                                {item.icon()}
                                                {item.label}
                                                <CheckIcon
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        item.value ===
                                                            field.value ||
                                                            item.value ===
                                                                selectedLanguage
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormDescription>{description}</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </FormProvider>
    )
}
