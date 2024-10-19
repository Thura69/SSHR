'use client'

import useMenu from '@/state/zustand/menu'
import { notFound, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import SettingList from '@/components/setting/common/setting-list'

 const  SettingPage = ()=> {
    const pathname = usePathname()

    const {
        selectedMenu,
        setSelectedGrandSubMenu,
        setSelectedGrandSubMenuId,
    } = useMenu()

    const realPathname = pathname

    const childMenus = selectedMenu?.children?.flatMap((menu: any) => menu)

    const currentGrandSubMenu = childMenus?.find((menu: any) => {
        return realPathname === `/${menu?.Web_URL}`
    })

    if (!currentGrandSubMenu) {
        notFound()
    }

    useEffect(() => {
        if (currentGrandSubMenu) {
            setSelectedGrandSubMenuId(currentGrandSubMenu?.Menu_ID)
            setSelectedGrandSubMenu(currentGrandSubMenu)
        }
    }, [currentGrandSubMenu])

    return (
        <div>
            <SettingList />
        </div>
    )
}


export default SettingPage