'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateRangePickerProps {
    onSelect: (date: DateRange | undefined) => void
    buttonClassNames?: string
    placeholder?: string
    className?: string
}

function DateRangePicker({
    className,
    onSelect,
    buttonClassNames,
    placeholder,
    ...props
}: DateRangePickerProps) {

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })

    const handleDateChange = (dateRange: DateRange | undefined) => {
        setDate(dateRange)
        onSelect(dateRange)
    }

    return (
        <div className={cn('grid gap-2', className)}>
            <Popover modal={true}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !date && 'text-muted-foreground',
                            buttonClassNames && buttonClassNames,
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
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
                            <span>{placeholder ?? 'Pick a date'}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateChange}
                        numberOfMonths={1}
                        {...props}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DateRangePicker
