'use client'

import useMenu from '@/state/zustand/menu'
import { notFound, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import SettingList from '@/components/setting/common/setting-list'
import isAuth from '@/components/auth/components/protected-route'

 const SettingPage = () => {
    const pathname = usePathname()

    const { selectedMenu, setSelectedGrandSubMenu, setSelectedGrandSubMenuId } =
        useMenu()

    const childMenus = selectedMenu?.children?.flatMap(
        (menu: any) => menu?.children,
    );

  

    const currentGrandSubMenu = childMenus?.find((menu: any) => {
        return pathname === `/${menu?.web_url}`
    })

    if (!currentGrandSubMenu) {
        notFound()
    }

    useEffect(() => {
        if (currentGrandSubMenu) {
            setSelectedGrandSubMenuId(currentGrandSubMenu?.Menu_ID)
            setSelectedGrandSubMenu(currentGrandSubMenu)
        }
    }, [currentGrandSubMenu]);

    return (
        <div>
            <SettingList />
        </div>
    )
}


export default isAuth(SettingPage)