'use client'
import isAuth from '@/components/auth/components/protected-route'
import DepartmentList from '@/components/organisation-structure/department/department-list'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
    //permisiion
    const pathname = usePathname()


    //permission hook
    useLegitGrandSub(pathname, false)

    return (
        <div>
            <DepartmentList />
        </div>
    )
}

export default isAuth(page);
