import React, { FC, useEffect, useState } from 'react'
import CalendarIcon from '@/public/assets/calendar-2.svg'
import { format } from 'date-fns'
import { FieldElement } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { Calendar } from './calendar'
import { cn } from '@/lib/utils'
import { FormControl } from './form'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

interface DatePickerProps {
    onSelect: (date: Date | undefined) => void
    buttonClassNames?: string
    same?: boolean
    sameValue?: Date
    placeholder?: string
    form?: any
    isRequired?: any
    field?: any
    disabled?: any
    height?: string
    open?: boolean
    setOpen?: any
}

const Datepicker: FC<DatePickerProps> = ({
    onSelect,
    buttonClassNames,
    placeholder,
    same,
    sameValue,
    form,
    field,
    isRequired,
    disabled,
    height,
    setOpen,
    open,
    ...props
}) => {
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(
        field.value ? new Date(field.value) : undefined,
    )
    const handleSelect = (date: Date | undefined) => {
        setSelectedDay(date!)
        onSelect(date)
    }
    const { t } = useTranslation('common')

    return (
        <Popover
            onOpenChange={() => setOpen((value: boolean) => !value)}
            open={open}
        >
            <PopoverTrigger className={buttonClassNames} asChild>
                <FormControl>
                    <Button
                        {...field}
                        disabled={same}
                        variant={'outline'}
                        className={cn(
                            'justify-between border-gray-400 text-left font-normal',
                            !selectedDay && 'text-muted-foreground',
                            height,
                        )}
                    >
                        {field.value ? (
                            format(field.value, 'MM/dd/yyyy')
                        ) : (
                            <span className="text-[14px] text-[#A0AEC0]">
                                {placeholder ? placeholder : t('pickADate')}
                            </span>
                        )}

                        <Image
                            alt="icon"
                            src={CalendarIcon}
                            className="mr-0  h-[23px] w-[23px]"
                        />
                        {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className=" p-0    w-auto border" align="start">
                <Calendar
                    mode="single"
                    defaultMonth={field.value}
                    captionLayout="dropdown-buttons"
                    selected={field.value}
                    onSelect={handleSelect!}
                    fromYear={1960}
                    toYear={2030}
                    disabled={disabled}
                />
            </PopoverContent>
        </Popover>
    )
}

export default Datepicker
