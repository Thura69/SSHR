'use client'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

const isAuth = (Component: any) => {
    return function IsAuth(props: any) {
        const [loading, setLoading] = useState(true)
        const auth = Cookies.get('auth')
        useEffect(() => {
            if (!auth) {
                return redirect('/auth/login')
            }
            setLoading(false)
        }, [auth])

        if (loading || !auth) {
            return null
        }

        return <Component {...props} />
    }
}

export default isAuth
