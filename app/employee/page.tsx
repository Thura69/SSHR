'use client'

import isAuth from '@/components/auth/components/protected-route'
import EmployeeDataTable from '@/components/employee-list/table-list/employee-data-table'
import EmployeeList from '@/components/employee/employee-list'
import { Button } from '@/components/ui/button'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import { usePathname } from 'next/navigation'
import React from 'react'

const EmployeePage = () => {

    // //permission
    // const pathname = usePathname();
    // //permission hook
    // useLegitGrandSub(pathname);


    return (
        <div>
         <EmployeeList/>
        </div>
    )
}

export default EmployeePage
