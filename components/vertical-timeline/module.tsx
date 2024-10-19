import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command'
import { cn } from '@/lib/utils'

type ModuelProps = {
    data: any[]
    selectedData: string | null | number
    setSelectedData: (value: any) => void
    title: string
    placeHolder: string
    nestedMenuLevel?: number
    isGrandChild?: boolean
}

const Module = ({
    data,
    selectedData,
    setSelectedData,
    title,
    placeHolder,
    nestedMenuLevel,
    isGrandChild
}: ModuelProps) => {
    
    useEffect(()=>{
        return ()=>{
            setSelectedData({value: ''});
        }
    }, [])
    return (
        <div className="p-5 max-sm:px-3">
            <h2 className="mb-2">{title}</h2>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        disabled={isGrandChild && nestedMenuLevel !== 3}
                        variant="outline"
                        role="combobox"
                        className={cn(
                            `w-full justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                        )}
                    >
                        {selectedData
                            ? data.find(
                                  (language) =>
                                      language?.value === selectedData,
                              )?.label
                            : placeHolder}
                        <CaretSortIcon className="ml-2  h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn(`w-[260px] p-0`)}>
                    <Command>
                        <CommandInput placeholder="Search..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No item found.</CommandEmpty>
                            <CommandGroup>
                                {data.map((item) => {
                                    if (!item) return
                                    return (
                                        <CommandItem
                                            value={item.label}
                                            key={item.value}
                                            onSelect={(e) => {
                                                setSelectedData(item)
                                            }}
                                        >
                                            {item.label}
                                            <CheckIcon
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    item.value === selectedData
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Module
