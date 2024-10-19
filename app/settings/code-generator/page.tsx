'use client'
import isAuth from '@/components/auth/components/protected-route'
import CodeGeneratorList from '@/components/setting/code-generator/code-generator-list'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import { usePathname } from 'next/navigation'
import React from 'react'

const page = () => {
    //permisiion
    const pathname = usePathname()
    //permission hook
    useLegitGrandSub(pathname)

    return (
        <div>
            <CodeGeneratorList />
        </div>
    )
}

export default isAuth(page);
