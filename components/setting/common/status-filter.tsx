import * as React from 'react'
import { useEffect } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'

import { capitalizeFirstLetter, cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
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
import { useTranslation } from 'react-i18next'

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>
    title?: string
    options: {
        label: string
        value: string
        icon?: React.ComponentType<{ className?: string }>
    }[]
    align?: 'left' | 'center' | 'right'
    isSingle?: boolean
    getSelectedValues?: (selectedValues: Set<string>) => void
}

export function StatusFilter<TData, TValue>({
    column,
    title,
    options,
    align,
    isSingle = false,
    getSelectedValues,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues()
    const { t } = useTranslation('common')
    const selectedValues = new Set(column?.getFilterValue() as string[])
    const [active, setActive] = useQueryState('is_active', {
        defaultValue: '',
        clearOnDefault: true,
    })
    const [_, setPage] = useQueryState('page', parseAsInteger)

    const currentActive =
        active === 'true'
            ? 'active'
            : active === 'false'
              ? 'inactive'
              : undefined
    if (currentActive) {
        selectedValues.add(currentActive)
    }
    useEffect(() => {
        getSelectedValues && getSelectedValues(selectedValues)

        const values = selectedValues.values()
        const firstValue = values.next().value

        const clearFilter =
            selectedValues.has('active') && selectedValues.has('inactive')

        if (selectedValues.size === 0 || clearFilter) {
            setActive('')
            return
        }

        const status =
            firstValue === 'active'
                ? 'true'
                : firstValue === 'inactive'
                  ? 'false'
                  : undefined
        if (status) {
            setActive(status)
            !currentActive && setPage(DEFAULT_PAGE)
        }
    }, [selectedValues])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        'min-h-8 h-fit  w-full bg-transparent border-transparent m-0 p-0 flex justify-start max-w-[100px]',
                        {
                            'justify-center': align === 'center',
                            'border-zinc-50': selectedValues?.size > 0,
                        },
                    )}
                >
                    <p className="m-0 p-0 ps-1 flex items-center text-zinc-500 font-bold">
                        {/* {title}
                        < */}
                        {capitalizeFirstLetter(currentActive as string) ||
                            title}
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(
                                    option.value,
                                )
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                setActive('')
                                                selectedValues.delete(
                                                    option.value,
                                                )
                                            } else {
                                                isSingle &&
                                                    selectedValues.clear()
                                                selectedValues.add(option.value)
                                            }
                                            const filterValues =
                                                Array.from(selectedValues)
                                            column?.setFilterValue(
                                                filterValues.length
                                                    ? filterValues
                                                    : undefined,
                                            )
                                        }}
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
                                        <span>
                                            {option.label === 'active'
                                                ? t('active')
                                                : t('inactive')}
                                        </span>
                                        {facets?.get(option.value) && (
                                            <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                {facets.get(option.value)}
                                            </span>
                                        )}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            setActive('')
                                            column?.setFilterValue(undefined)
                                        }}
                                        className="justify-center text-start"
                                    >
                                        {t('clearFilter')}
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
