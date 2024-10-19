'use client'

import isAuth from '@/components/auth/components/protected-route'
import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

type EmployeeDetailsProps = {
    params: { id: string },
    children:ReactNode
}

const EmployeeId = ({ params,children }: EmployeeDetailsProps) => {
    const router = useRouter()
    const pathName = usePathname()

    useEffect(() => {
        // Construct the new path using the current pathname
        const newPath = `${pathName}/employee-details`
        router.push(newPath)
    }, [pathName, params.id, router])

    return null
}

export default isAuth(EmployeeId)
