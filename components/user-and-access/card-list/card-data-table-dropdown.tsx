import React, { Key, useMemo, useState } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { parseAsInteger, useQueryState } from 'nuqs'
import { DEFAULT_PAGE } from '@/constants/pagination'

interface Option {
    label: string
    value: any
    icon?: React.ComponentType<{ className?: string }>
}

interface DataTableFacetedFilterProps<TValue> {
    title: string
    options: Option[]
    align?: 'left' | 'center' | 'right'
    isLoading?: boolean
    columnName: string
    onSelect?: (selectedValues: TValue[]) => void // Define onSelect prop
}

export function CardDataTableDropdown<TValue>({
    title,
    options,
    align,
    isLoading,
    columnName,
    onSelect, // Add onSelect prop
}: DataTableFacetedFilterProps<TValue>) {
    const [queryValue, setValue] = useQueryState(columnName, {
        defaultValue: '',
        clearOnDefault: true,
    })
    const queryValues = queryValue
        ? (queryValue.split(',').map((value) => {
              // Type guard to check if the value can be parsed as a number
              if (!isNaN(Number(value))) {
                  return parseInt(value, 10) // Parse as number
              } else {
                  // Handle boolean values (assuming truthy/falsy conversion)
                  return value === 'true'
                      ? true
                      : value === 'false'
                        ? false
                        : value
              }
          }) as TValue[])
        : []

    const [selectedData, setSelectedData] = useState<{
        data: TValue[]
        name: string
    }>({
        data: [],
        name: title,
    })

    let selectedValues = selectedData.data
    selectedValues = queryValues as TValue[] // setting the default selected options

    const [page, setPage] = useQueryState('page', parseAsInteger)

    const handleOnSelect = (
        isSelected: boolean,
        option: {
            label: string
            value: TValue
            icon?: React.ComponentType<{ className?: string }>
        },
    ) => {
        const updatedValues = isSelected
            ? selectedValues.filter((val) => val !== option.value)
            : [...selectedValues, option.value]

        setSelectedData((prevData) => ({ ...prevData, data: updatedValues }))

        const value = transformArrayToString(updatedValues)
        if (value.includes('true') && value.includes('false')) {
            setPage(DEFAULT_PAGE)
            setValue(null)
        } else {
            setPage(DEFAULT_PAGE)
            setValue(value)
        }
    }

    const transformArrayToString = (arr: any[]) => {
        return arr.map((id: any) => id).join(',')
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        'w-full bg-transparent border-transparent m-0 p-0 flex justify-between h-fit',
                        {
                            'justify-center': align === 'center',
                            'border-zinc-50': selectedValues.length > 0,
                        },
                    )}
                >
                    {selectedValues.length === 0 ? (
                        <p className="m-0 p-0 ps-1 flex items-center text-zinc-500 font-bold">
                            {title}{' '}
                        </p>
                    ) : (
                        ''
                    )}
                    {selectedValues.length > 0 && (
                        <>
                            <div className="ms-1 flex flex-wrap justify-start gap-1">
                                {selectedValues.length > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.length} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) =>
                                            selectedValues.includes(
                                                option.value,
                                            ),
                                        )
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value as Key}
                                                className="rounded-sm px-1 font-normal block"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        {isLoading ? (
                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected = selectedValues.includes(
                                        option.value,
                                    )
                                    return (
                                        <CommandItem
                                            key={option.value as Key}
                                            onSelect={() =>
                                                handleOnSelect(
                                                    isSelected,
                                                    option,
                                                )
                                            }
                                        >
                                            <div
                                                className={cn(
                                                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                    isSelected
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'opacity-50 [&_svg]:invisible',
                                                )}
                                            >
                                                <CheckIcon
                                                    className={cn('h-4 w-4')}
                                                />
                                            </div>
                                            {option.icon && (
                                                <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                            )}
                                            <span>{option.label}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        ) : null}
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.includes(
                                    option.value,
                                )
                                return (
                                    <CommandItem
                                        key={option.value as Key}
                                        onSelect={() =>
                                            handleOnSelect(isSelected, option)
                                        }
                                    >
                                        <div
                                            className={cn(
                                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'opacity-50 [&_svg]:invisible',
                                            )}
                                        >
                                            <CheckIcon
                                                className={cn('h-4 w-4')}
                                            />
                                        </div>
                                        {option.icon && (
                                            <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            setSelectedData((prevData) => ({
                                                ...prevData,
                                                data: [],
                                            }))
                                            setValue(null)
                                        }}
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
