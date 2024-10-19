import React from 'react'
import Datepicker from '../../ui/datepicker'
import DateRangePicker from '../../ui/date-range-picker'
import { DateRange } from 'react-day-picker'

export const DateSelectors = () => {
    const handleDateChange = (date: Date | undefined) => console.log(date)
    const handleDateRangeChange = (date: DateRange | undefined) =>
        console.log(date)

    return (
        <>
            <p>Date Pickers</p>
            <br />
            <Datepicker onSelect={handleDateChange} />
            <br />
            <DateRangePicker onSelect={handleDateRangeChange} />
        </>
    )
}
