import { useQuery } from '@tanstack/react-query'
import { API } from '@/service/api'
import menuStore from '@/state/zustand/menu'
import useAuthStore from '@/state/zustand/auth-store'
import { useEffect, useMemo } from 'react'
import { getNestedLevel } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import BaseApi from '@/service/axios'

const useDynamicMenu = () => {
    const router = useRouter()
    const userData = useAuthStore((state) => state.userData)


    const { data, ...rest } = useQuery({
        queryKey: [
            'main-menu',
            BaseApi.defaults.headers.common['Accept-Language'],
        ],

        queryFn: () => API.getMainMenu(userData.user_id),
    })

    useEffect(() => {
        if (!userData || !userData.user_id) {
            router.push('/auth/login')
        }
    }, [userData, userData.user_id]);



    const setMenuList = menuStore((state) => state.setMenuList)
    const selectedMenuId = menuStore((state) => state.selectedMenuId)
    const setSelectedMenuNestedLevel = menuStore(
        (state) => state.setSelectedMenuNestedLevel,
    )
    const setSelectedMenu = menuStore((state) => state.setSelectedMenu)
    const setFirstChildOfSelectedParentMenu = menuStore(
        (state) => state.setFirstChildOfSelectedParentMenu,
    )

    const selectedMenu =
        data && data.data.find((menu: any) => menu.menu_id === selectedMenuId)
    const nestedMenuLevel = useMemo<any>(
        () => selectedMenu && getNestedLevel(selectedMenu),
        [selectedMenu],
    )






    const firstChildOfSelectedParentMenu =
        nestedMenuLevel &&
        nestedMenuLevel === 2 &&
        selectedMenu &&
        selectedMenu &&
        'children' in selectedMenu &&
        Array.isArray(selectedMenu.children) &&
        selectedMenu.children.length >= 1 &&
        selectedMenu.children[0]

    useEffect(() => {
        if (nestedMenuLevel) {
            setSelectedMenuNestedLevel(nestedMenuLevel)
        }
    }, [nestedMenuLevel])

    useEffect(() => {
        if (firstChildOfSelectedParentMenu) {
            setFirstChildOfSelectedParentMenu(firstChildOfSelectedParentMenu)
        }
    }, [firstChildOfSelectedParentMenu])

    useEffect(() => {
        if (selectedMenu) {
            setSelectedMenu(selectedMenu)
        }
    }, [selectedMenu])

    useEffect(() => {
        if (data) {
            setMenuList(data)
        }
    }, [data])

    return { menu: data, nestedMenuLevel, selectedMenu, ...rest }
}

export default useDynamicMenu
