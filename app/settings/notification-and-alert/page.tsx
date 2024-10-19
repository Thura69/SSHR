'use client'
import isAuth from '@/components/auth/components/protected-route'
import NotificationAndAlertList from '@/components/setting/notification-and-alert/notification-and-alert-list'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
    const pathname = usePathname()
    useLegitGrandSub(pathname)

    return (
        <div>
            <NotificationAndAlertList />
        </div>
    )
}

export default isAuth(page);
