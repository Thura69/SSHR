import { parseAsIsoDateTime, useQueryState } from 'nuqs';
import React, { useEffect } from 'react'
import { DateRange } from 'react-day-picker';
import CalendarRangeFilter from '../common/calendar-range-filter';
import { useTranslation } from 'react-i18next';

const CalendarDateRange = ({column}:{column:any}) => {

    const {t} = useTranslation('financialYear');
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
      });
      const [_,setCalendarYear] = useQueryState('from_calendar_year',parseAsIsoDateTime);
      const [__,setCalendarTo] = useQueryState('to_calendar_year',parseAsIsoDateTime);

      useEffect(()=>{
    if(date?.from && date?.to){
    setCalendarYear(date?.from!);
    setCalendarTo(date?.to!)
    }else if(date === undefined){
        setCalendarYear(null);
        setCalendarTo(null);
    }
    },[date]);

  return (
    <CalendarRangeFilter
    setDate={setDate}
    setFromYear={setCalendarYear}
    setToYear={setCalendarTo}
    column={column}
    date={date}
    filter={t('clearFilter')}
    title={t('calendarYearRange')}
    />
  )
}

export default CalendarDateRange