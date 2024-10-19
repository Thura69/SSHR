import React, { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Framework = Record<'value' | 'label', string>

interface FancyMultiSelectProps {
    disable?: boolean
    options: Framework[]
    selected: any
    setSelected: any
}

export const FancyMultiSelect: React.FC<FancyMultiSelectProps> = ({
    options,
    disable,
    selected,
    setSelected,
}) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')

    const handleUnselect = React.useCallback((framework: Framework) => {
        setSelected((prev: Framework[]) =>
            prev.filter((s: Framework) => s.value !== framework.value),
        )
    }, [])

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current
            if (input) {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    if (input.value === '') {
                        setSelected((prev: Framework[]) => {
                            const newSelected = [...prev]
                            newSelected.pop()
                            return newSelected
                        })
                    }
                }
                // This is not a default behaviour of the <input /> field
                if (e.key === 'Escape') {
                    input.blur()
                }
            }
        },
        [],
    )

    const selectables = options.filter(
        (framework) => !selected?.includes(framework),
    )

    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent mt-0"
        >
            <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-500">
                <div className="flex gap-1 flex-wrap">
                    {selected?.map((framework: Framework) => {
                        return (
                            <Badge
                                className={cn({
                                    'text-slate-500': disable,
                                })}
                                key={framework.value}
                                variant="secondary"
                            >
                                {framework.label}
                                <button
                                    disabled={disable}
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-80"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleUnselect(framework)
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    onClick={() => handleUnselect(framework)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        )
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        disabled={disable}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder="Select"
                        className={cn(
                            'ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1 placeholder:text-gray-800 placeholder:font-medium',
                            {
                                'placeholder:text-slate-500': disable,
                            },
                        )}
                    />
                </div>
            </div>
            <div className="relative mt-2 bg-white">
                {open && selectables.length > 0 ? (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        <CommandGroup className="h-full overflow-auto bg-white">
                            {selectables.map((framework: Framework) => {
                                return (
                                    <CommandItem
                                        key={framework.value}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                        onSelect={(value) => {
                                            setInputValue('')
                                            setSelected((prev: Framework[]) => [
                                                ...(prev?.length > 0
                                                    ? prev
                                                    : []),
                                                framework,
                                            ])
                                        }}
                                        className={'cursor-pointer'}
                                    >
                                        {framework.label}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </div>
                ) : null}
            </div>
        </Command>
    )
}
