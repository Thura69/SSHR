import React, { useCallback, useEffect, useMemo } from 'react'
import { getParseOrgChartNodeData } from '@/lib/utils'
import { useGetEmployeeOrgchart } from '@/service/query-hooks/use-employee-orgchart'
import { getAudit } from '@/lib/audit-trail-api'
import useMenu from '@/state/zustand/menu'
import useUserCookie from '@/hooks/use-user'
import { useOrgchartForm } from '@/hooks/chart/use-orgchart-form'
import { useQueryState } from 'nuqs'
import { OrgchartComponent } from './orgchart-component'


function EmployeeOrgchart() {
    const { form } = useOrgchartForm()

    const selectedMenuId = useMenu((state) => state.selectedMenuId)
    const selectedSubMenu = useMenu((state) => state.selectedSubMenu)
    const user = useUserCookie()
    const { data, isLoading } = useGetEmployeeOrgchart()

    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedSubMenu?.menu_name + ' Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedSubMenu?.menu_id!,
    }

    useEffect(() => {
        if (data) {
            getAudit({
                ...auditPayload,
                Detail: data.data,
                Record_Name: selectedSubMenu?.menu_name!,
            })
        }
    }, [data])

    const handleOnNodeClick = useCallback((node: any) => {}, [])

    const data2 =
        data && data.data.length > 0 ? getParseOrgChartNodeData(data.data) : []

    const memorizedData = useMemo(() => data2, [data2])

    const chartProps = {
        loading: isLoading,
        data: memorizedData,
        onNodeClick: handleOnNodeClick,
        form,
    }  

    const [companyId] = useQueryState('company_id')
    

    return (
        <div>
            <OrgchartComponent key={companyId} {...chartProps} />
        </div>
    )
}

export default EmployeeOrgchart
