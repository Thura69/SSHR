'use client'

import isAuth from '@/components/auth/components/protected-route'
import RoleListTable from '@/components/role/role-list-table'

const MainScreen = () => {
    return <RoleListTable />
}

export default isAuth(MainScreen)
