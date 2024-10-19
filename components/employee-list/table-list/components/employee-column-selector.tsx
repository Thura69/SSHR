import * as React from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

export interface Option {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>
    title?: string
    options: Option[]
    align?: 'left' | 'center' | 'right'
    isSingle?: boolean
    getSelectedValues?: (selectedValues: Set<string>) => void
    type?: string
}

export function EmployeeColumnSelect<TData, TValue>({
    column,
    title,
    options,
    align,
    isSingle = false,
    getSelectedValues
}: DataTableFacetedFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues()
    const selectedValues = new Set(column?.getFilterValue() as string[])

    const handleOptionSelection = ({
        isSelected,
        option,
    }: {
        isSelected: boolean
        option: Option
    }) => {
        if (isSelected) {
            selectedValues.delete(option.value as string)
        } else {
            isSingle && selectedValues.clear()
            selectedValues.add(option.value as string)
        }
        getSelectedValues && getSelectedValues(selectedValues)
        const filterValues = Array.from(selectedValues)
        column?.setFilterValue(filterValues.length ? filterValues : undefined)
        // if(type === 'status'){
        //     setPage('1')
        // }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                        'min-h-8 h-fit w-full bg-transparent border-transparent m-0 p-0 flex justify-start',
                        {
                            'justify-center': align === 'center',
                            'border-zinc-50': selectedValues?.size > 0,
                        },
                    )}
                >
                    {selectedValues?.size === 0 ? (
                        <p className="m-0 p-0 ps-1 flex items-center text-zinc-500 font-bold">
                            {title}
                        </p>
                    ) : (
                        ''
                    )}

                    {selectedValues?.size > 0 && (
                        <>
                            <div className="ms-1 flex flex-wrap justify-start gap-1">
                                {selectedValues.size > 3 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) =>
                                            selectedValues.has(
                                                option.value as string,
                                            ),
                                        )
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
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
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(
                                    option.value as string,
                                )
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() =>
                                            handleOptionSelection({
                                                isSelected,
                                                option,
                                            })
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

                                        {facets?.get(option.value) && (
                                            <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                {facets.get(option.value)}
                                            </span>
                                        )}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>

                        {/* {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() =>
                                            column?.setFilterValue(undefined)
                                        }
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )} */}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
