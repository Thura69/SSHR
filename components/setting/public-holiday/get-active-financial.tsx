import { useGetAllFinancialYear } from '@/service/query-hooks/setting/use-financial-year'
import React, { useState } from 'react'

function GetActiveFinancial() {
    const {
        data: financialYearData,
        isError,
        isLoading,
    } = useGetAllFinancialYear()
    const [closePopover, setClosePopover] = useState(false)
    const [yearId, setYearId] = useState<number>(0)

    // const memorizedData = useMemo(()=>financialYearData,[financialYearData]);

    // useEffect(()=>{
    // if(financialYearData){
    // const currentFinancial = financialYearData.data.filter((e:financialYearType)=>e.IsActive === true);

    // setYear(currentFinancial[0]?.FinancialYear_Name);
    // setYearId(currentFinancial[0]?.FinancialYear_ID);

    // }
    // },[memorizedData]);
    return <div>GetActiveFinancial</div>
}

export default GetActiveFinancial
