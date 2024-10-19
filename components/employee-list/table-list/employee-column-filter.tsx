import * as React from 'react'
import { useEffect } from 'react'
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
    CommandSeparator,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { DataTableFacetedFilterProps } from '@/types/common'


export function EmployeeColumnFilter<TData, TValue>({
    column,
    title,
    options,
    align,
    isSingle = false,
    getSelectedValues,
}: DataTableFacetedFilterProps<TData, TValue>) {

    const facets = column?.getFacetedUniqueValues()
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
        (column?.getFilterValue() as string[]) || [],
    )

    useEffect(() => {
        getSelectedValues && getSelectedValues(selectedValues)
    }, [selectedValues])

    const toggleSelectedValue = (value: string) => {
        const selectedIndex = selectedValues.indexOf(value)
        if (selectedIndex !== -1) {
            setSelectedValues(selectedValues.filter((item) => item !== value))
        } else {
            isSingle
                ? setSelectedValues([value])
                : setSelectedValues([...selectedValues, value])
        }
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
                            'border-zinc-50': selectedValues?.length > 0,
                        },
                    )}
                >
                    {selectedValues?.length === 0 ? (
                        <p className="m-0 p-0 ps-1 flex items-center text-zinc-500 font-bold">
                            {title}
                        </p>
                    ) : (
                        ''
                    )}
                    {selectedValues?.length > 0 && (
                        <>
                            <div className="ms-1 flex flex-wrap justify-start gap-1">
                                {selectedValues.length > 3 ? (
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
                                        .map((option) => {
                                            return (
                                                <Badge
                                                    variant="secondary"
                                                    key={option.value}
                                                    className="rounded-sm px-1 font-normal"
                                                >
                                                    {option.label}
                                                </Badge>
                                            )
                                        })
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
                                const isSelected = selectedValues.includes(
                                    option.value,
                                )
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            toggleSelectedValue(option.value)
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
                        {selectedValues.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => setSelectedValues([])}
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
