import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandSeparator,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@radix-ui/react-icons'
import { CommandList } from 'cmdk'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Column } from '@tanstack/react-table'
import Loader from '@/components/common/loaders/loader'
import { Badge } from '@/components/ui/badge'
import CloseSvg from '@/components/common/icons/close-svg'

type SetValueFunction<T> = Dispatch<SetStateAction<T[]>>

interface MultiFilterProps<TData, TValue> {
    value: any
    setValue: any
    options: {
        label: string
        value: string | number
    }[]
    column?: Column<TData, TValue>
    title: string
    loading?: boolean
    width?: string
    translation: string,
    contentMargin?:string
}

function MultiFilter<TData, TValue>({
    value,
    setValue,
    options,
    width = 'lg:min-w-[200px] xl:min-w-[400px]',
    column,
    title,
    contentMargin ,
    loading,
    translation,
}: MultiFilterProps<TData, TValue>) {
    const { t } = useTranslation(translation)

    return (
        <section
            className={cn(
                `flex w-full ring-1 focus:ring-zinc-200 rounded-[4px] ring-[#C3DDF4] justify-between items-center gap-2 ${width}`,
            )}
        >
            <Popover modal>
                <PopoverTrigger>
                    <Button
                        variant="ghost"
                        role="combobox"
                        className={cn(
                            `ms-1 flex flex-col hover:bg-transparent justify-start items-start gap-1`,
                            !value && 'text-muted-foreground',
                            width,
                        )}
                    >
                        {value.length > 0 ? (
                            value.length > 2 ? (
                                <span>{`${value.length} ${t('selected')}`}</span>
                            ) : (
                                value.map((e: string, index: number) => (
                                    <Badge
                                        variant="secondary"
                                        key={index}
                                        className="rounded-sm  px-1 font-normal"
                                    >
                                        {e}
                                    </Badge>
                                ))
                            )
                        ) : (
                            <span className="font-bold">{title}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn(`p-0 w-[180px]`,contentMargin)} align='start'>
                    <Command inlist={3}>
                        <CommandInput
                            placeholder={t('modal.placeHolder.search')}
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>No item found.</CommandEmpty>
                            <ScrollArea className="h-[100px] ">
                                <CommandGroup>
                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        options.map((item) => {
                                            return (
                                                <CommandItem
                                                    className="cursor-pointer"
                                                    key={item.value}
                                                    onSelect={() => {
                                                        setValue(
                                                            (prev: any) => {
                                                                const updatedValues =
                                                                    [...prev]
                                                                const index =
                                                                    updatedValues.indexOf(
                                                                        item.label,
                                                                    )
                                                                if (
                                                                    index !== -1
                                                                ) {
                                                                    updatedValues.splice(
                                                                        index,
                                                                        1,
                                                                    ) // Remove existing value
                                                                } else {
                                                                    updatedValues.push(
                                                                        item.label,
                                                                    ) // Add value if it doesn't exist
                                                                }

                                                                return updatedValues
                                                            },
                                                        )
                                                    }}
                                                >
                                                    <div
                                                        className={cn(
                                                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                            value.includes(
                                                                item.label,
                                                            )
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'opacity-50 [&_svg]:invisible',
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                'h-4 w-4',
                                                            )}
                                                        />
                                                    </div>

                                                    {item.label}
                                                </CommandItem>
                                            )
                                        })
                                    )}
                                </CommandGroup>
                            </ScrollArea>
                        </CommandList>

                        {value.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => {
                                            setValue([])
                                        }}
                                        className="justify-center text-start"
                                    >
                                        {t('clearFilter')}
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </Command>
                </PopoverContent>
            </Popover>
        </section>
    )
}

export default MultiFilter
