'use client'
import isAuth from '@/components/auth/components/protected-route'
import PositionPage from './main'

 function Page() {
    return (
        <div>
            <PositionPage />
        </div>
    )
}


export default isAuth(Page)