import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import React from 'react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Calendar } from './custome-calendar'
import { DateRange } from 'react-day-picker'

interface FormDateRangeProps {
    date:DateRange | undefined,
    setDate: any
}

const FormDateRange:React.FC<FormDateRangeProps> = ({date, setDate}) => {
    const { t } = useTranslation('publicHoliday')

    return (
        <Popover modal={true}>
            <PopoverTrigger className="m-0 border bg-green-500" asChild>
                <Button
                    id="date"
                    variant={'ghost'}
                    className={cn(
                        'w-full ring-1 bg-transparent  focus:ring-zinc-200  ring-gray-200 justify-start text-left font-normal',
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
                        <span>{t('pickADate')}</span>
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
                    footer={<></>}
                />
            </PopoverContent>
        </Popover>
    )
}

export default FormDateRange
