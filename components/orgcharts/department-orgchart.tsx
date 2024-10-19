import React, { useMemo } from 'react'
import { useGetDepartmentOrgchart } from '@/service/query-hooks/use-department-orgchart'
import { generateFakeNode } from '@/lib/utils'

import { useOrgchartForm } from '@/hooks/chart/use-orgchart-form'
import { DepartmentChartComponent } from './department-chart'



function DepartmentOrgchart() {
    const { form } = useOrgchartForm()
    const { data: departmentData, isLoading } = useGetDepartmentOrgchart()

    const handleOnNodeClick = (node: any) => {}

    const data2 = departmentData && departmentData.data.length > 0 ? generateFakeNode(departmentData.data) : []

    const memorizedData = useMemo(() => data2, [data2])

    const chartProps = {
        loading: isLoading,
        data: memorizedData,
        onNodeClick: handleOnNodeClick,
        form,
    }

    return <>
         <DepartmentChartComponent {...chartProps} />
    </>
}

export default DepartmentOrgchart
