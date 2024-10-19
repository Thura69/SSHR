'use client'
import Datepicker from '@/components/ui/datepicker'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CalendarIcon from '@/public/assets/calendar-2.svg'
import Image from 'next/image'
import { format } from 'date-fns'
import { ICONS } from '@/components/employee/education/education-icons'
import { COLORS } from '@/constants'

interface DateEmployeeSelect {
    translation: string
    nuqsField: string
    value: any
    setValue: any
    title: string
    fieldName:
        | 'company'
        | 'location'
        | 'branch'
        | 'department'
        | 'section'
        | 'position'
        | 'employeeNo'
        | 'employeeName'
        | 'joinDate'
        | 'endDate'
        | 'jobCategory'
        | 'jobType'
        | 'employmentStatus'
        | 'gender'
        | 'martialStatus'
        | 'status'
}

const DateEmployeeSelect: React.FC<DateEmployeeSelect> = ({
    translation,
    nuqsField,
    value,
    setValue,
    fieldName,
    title,
}) => {
    const { t } = useTranslation(translation)

    return (
        <section
            className={cn(
                ' w-full sm:w-[172px] duration-600  animate-fade-item flex flex-col gap-2 h-[63px]',
            )}
        >
            <p className="font-[400] text-[14px] text-sideMenuTextColor2">
                {t(`${fieldName}`)}
            </p>
            <Popover>
                <PopoverTrigger className="m-0" asChild>
                    <Button
                        disabled={false}
                        id="date"
                        variant={'ghost'}
                        role="combobox"
                        className={cn(
                            `w-full  sm:w-[172px] disabled:bg-[#F1F5FB] disabled:opacity-100 disabled:border-none border-[#A0AEC0] bg-[#F2F8FD] text-[#A0AEC0] disabled:text-secondaryTextColor  justify-between focus:ring-0 focus:ring-offset-2 `,
                        )}
                    >
                        {value ? (
                            <span className="text-primary-500">
                                {format(value, 'PPP')}
                            </span>
                        ) : (
                            <span className="font-bold text-secondaryText text-[14px]">
                                Select
                            </span>
                        )}
                        {value
                            ? ICONS.calendarPrimary({
                                  className:
                                      'text-primary-500 h-[20px] w-[20px]',
                                  fill: COLORS.primary[500],
                              })
                            : ICONS.calendar({
                                  className:
                                      'text-primary-500 h-[20px] w-[20px]',
                                  fill: COLORS.primary[500],
                              })}

                        {/* <Image
                            alt="icon"
                            src={CalendarIcon}
                            className={cn(
                                'ml-2 text-secondaryText h-[20px] w-[20px] shrink-0 ',
                                value && 'text-primary-500',
                            )}
                        /> */}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={value}
                        onSelect={setValue}
                        fromYear={1960}
                        toYear={2030}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </section>
    )
}

export default DateEmployeeSelect
