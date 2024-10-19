import useMenu from '@/state/zustand/menu'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'

export function useLegitGrandSub(realPathName: string, isChildren?: boolean) {

    const {
        selectedMenu,
        setSelectedGrandSubMenuId,
        setSelectedGrandSubMenu,
        selectedGrandSubMenu,
    } = useMenu((state) => state)


   
    console.log({selectedMenu});

  


    const childMenus = selectedMenu?.children?.flatMap((menu: any) =>
        isChildren === undefined ? menu?.children : menu,
    )

    const currenGrandSubMenu = childMenus?.find((menu: any) => {
        return realPathName === `/${menu?.web_url}`
    })

    if (!currenGrandSubMenu) return notFound()

    useEffect(() => {
        if (currenGrandSubMenu) {
            setSelectedGrandSubMenuId(currenGrandSubMenu?.menu_id)
            setSelectedGrandSubMenu(currenGrandSubMenu)
        }
    }, [currenGrandSubMenu])

    return selectedGrandSubMenu
}
