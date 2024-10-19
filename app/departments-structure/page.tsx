'use client'

import React from 'react'
import isAuth from '@/components/auth/components/protected-route'
import DepartmentOrgchart from '@/components/orgcharts/department-orgchart'

const OrgStructurePage = () => {
    return <DepartmentOrgchart />
}

export default isAuth(OrgStructurePage)
