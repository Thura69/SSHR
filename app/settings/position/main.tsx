'use client'

import menuStore from '@/state/zustand/menu'
import { notFound, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import PositionList from '@/components/setting/position/position-list'

export default function SettingPage() {
    const pathname = usePathname()

    const { selectedMenu, setSelectedGrandSubMenu, setSelectedGrandSubMenuId } =
        menuStore()

    const realPathname = pathname

    const childMenus = selectedMenu?.children?.flatMap(
        (menu: any) => menu?.children,
    )
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
            <PositionList />
        </div>
    )
}
