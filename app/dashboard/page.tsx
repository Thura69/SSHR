'use client'

import isAuth from '@/components/auth/components/protected-route'
import PageLoader from '@/components/common/loaders/page-loader'
import EmployeeHeader from '@/components/employee/employee-header'
import menuStore from '@/state/zustand/menu'
import React, { useEffect } from 'react'

const Dashboard = () => {
    
    const menuList = menuStore((state) => state.menuList)
    const setSelectedMenu = menuStore((state) => state.setSelectedMenu)
    const setSelectedMenuId = menuStore((state) => state.setSelectedMenuId)
    const selectedMenu = menuStore((state) => state.selectedMenu)
    const selectedMenuId = menuStore((state) => state.selectedMenuId)

    useEffect(() => {
        if (menuList && menuList?.data?.length > 0) {
            if (!selectedMenu || !selectedMenuId) {
                setSelectedMenu(menuList.data[0])
                setSelectedMenuId(menuList.data[0].menu_id)
            }
        }
    }, [selectedMenu, selectedMenuId])

    return (
        <div className="w-full p-4 px-6 "></div>
    )
}


export default isAuth(Dashboard)
