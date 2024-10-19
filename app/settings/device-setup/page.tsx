'use client'
import isAuth from '@/components/auth/components/protected-route'
import DeviceSetupList from '@/components/setting/device-setup/device-setup-list'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import { usePathname } from 'next/navigation'
import React from 'react'


const page = ()=> {
    //permisiion
    const pathname = usePathname()

    //permission hook
    useLegitGrandSub(pathname)
    return <DeviceSetupList />
}

export default isAuth(DeviceSetupList);
