'use client';

import isAuth from '@/components/auth/components/protected-route'
import SettingPage from './main'

const Page = () => {
    return <SettingPage />
}

export default isAuth(Page)
