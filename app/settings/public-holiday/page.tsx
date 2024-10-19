'use client'
import isAuth from '@/components/auth/components/protected-route'
import PublicHolidayList from '@/components/setting/public-holiday/public-holiday-list'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import { usePathname } from 'next/navigation'
import React from 'react'

function page() {
    //permisstion
    const pathname = usePathname()
    //permission hook
    useLegitGrandSub(pathname)

    return (
        <div>
            <PublicHolidayList />
        </div>
    )
}

export default isAuth(page)
