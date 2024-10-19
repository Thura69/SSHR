import SortButton from '@/components/data-table/sort-button'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import React from 'react'
import { DateRange } from 'react-day-picker'

interface CalendarRangeFilterProps {
    setDate: (value: any) => void
    setFromYear: any
    setToYear: any
    column: any
    date: DateRange | undefined
    title: string
    width?: string
    filter?: string
    diasble?: boolean
    columnName?: string
}

const CalendarRangeFilter = ({
    setDate,
    setFromYear,
    setToYear,
    column,
    diasble,
    columnName,
    width = 'min-w-[150px]',
    date,
    title,
    filter,
}: CalendarRangeFilterProps) => {
    let footer = (
        <Button
            onClick={() => {
                setDate({ from: undefined, to: undefined })
                setFromYear(null)
                setToYear(null)
            }}
            className="w-full  mt-2"
            variant={'ghost'}
        >
            {filter}
        </Button>
    )

    return (
        <section className={cn('flex justify-start items-center gap-2')}>
            <SortButton
                disabled={diasble}
                column={column}
                columnName={columnName}
            />
            <div className={cn('grid gap-2')}>
                <Popover>
                    <PopoverTrigger className="m-0" asChild>
                        <Button
                            disabled={diasble}
                            id="date"
                            variant={'ghost'}
                            className={cn(
                                ' ring-1 bg-transparent  focus:ring-zinc-200  ring-secondary-200 justify-start text-left font-normal',
                                !date && 'text-muted-foreground',
                            )}
                        >
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, 'LLL dd, y')} -{' '}
                                        {format(date.to, 'LLL dd, y')}
                                    </>
                                ) : (
                                    format(date.from, 'LLL dd, y')
                                )
                            ) : (
                                <span className="font-bold">{title}</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            captionLayout="dropdown-buttons"
                            selected={date}
                            onSelect={setDate}
                            fromYear={1960}
                            toYear={2030}
                            numberOfMonths={1}
                            footer={date?.from || date?.to ? footer : <></>}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </section>
    )
}

export default CalendarRangeFilter
