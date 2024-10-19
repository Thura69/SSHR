'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQueryState } from 'nuqs'
import useAuthStore from '@/state/zustand/auth-store'
import DepartmentOrgchart from '@/components/orgcharts/department-orgchart'
import EmployeeOrgchart from '@/components/orgcharts/employee-orgchart'

const OrgStructurePage = () => {
    const [tab, setTab] = useState('emp');

    const toEmp = ()=>{
        setTab('emp')
    }

    const toDep = ()=>{
        setTab('dep')
    }

    const companyId = useAuthStore(state=>state.userData.company_id)
    const [_, setCompanyId] = useQueryState('company_id')


    useEffect(()=>{
        if(companyId){
            setCompanyId(''+companyId)
        }
    }, [companyId])

    return (
        <>
            <Tabs defaultValue="employee-chart" className="w-full">
                <TabsList className={'m-4 mb-0'}>
                    <TabsTrigger value="employee-chart" onClick={toEmp}>
                        Employee Chart
                    </TabsTrigger>
                    <TabsTrigger value="department-chart" onClick={toDep}>
                        Department Chart
                    </TabsTrigger>
                </TabsList>
                {
                    tab === 'emp' ?  <EmployeeOrgchart key={tab}/> : <DepartmentOrgchart key={tab}/>
                }
            </Tabs>
        </>
    )
}

export default OrgStructurePage
