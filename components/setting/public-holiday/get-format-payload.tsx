import { formatDate } from '@/lib/utils';

export const GetFormatPayload = (data:any) => {


  return data.map((publicHolidayType:any)=>{
        return {
      Holiday_Setting_ID: publicHolidayType?.Holiday_Setting_ID,
      Holiday_Name: publicHolidayType?.Holiday_Name,
      Holiday_Date: formatDate( publicHolidayType?.Holiday_Date),
      ForAll: publicHolidayType?.ForAll,
      IsActive: publicHolidayType?.IsActive,
      Company_ID: publicHolidayType?.Company_ID ,
      Location_ID: publicHolidayType?.Location_ID ,
      Branch_ID: publicHolidayType?.Branch_ID ,
      Department_ID: publicHolidayType?.Department_ID,
      Position_ID: publicHolidayType?.Position_ID,
      Pay_HolidayType: publicHolidayType?.Pay_HolidayType,
      FinancialYear_ID: publicHolidayType?.FinancialYear_ID,
  }
  });
}
