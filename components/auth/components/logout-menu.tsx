'use client'

import React from 'react'
import { LogOutIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MenuIcon, SettingIcon, UsersIcon } from '@/components/common/icons'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import {
    LoginAndLogoutAuditInterface,
    logoutAudit,
} from '@/lib/audit-trail-api'
import useAuthStore from '@/state/zustand/auth-store'
import { useTranslation } from 'react-i18next'

export const LogoutDropDown = () => {
    const router = useRouter()
    const logoutAuditMutation = useMutation({
        mutationFn: (data: LoginAndLogoutAuditInterface) => {
            return logoutAudit(data)
        },
    })
    const { t } = useTranslation('navSetting')
    const userData = useAuthStore.getState().userData
    const handleLogout = () => {
        logoutAuditMutation.mutate({
            Emp_Name: userData.employee_name || '',
            Is_Mobile: false,
        })
        Cookies.remove('auth')
        router.push('/auth/login')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="flex gap-2 items-center border-0 hover:bg-none hover:bg-"
                >
                    <UsersIcon
                        width={20}
                        height={20}
                        className="stroke-neutral-600 group-hover:stroke-primary-500"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <section className="flex flex-col px-2 w-full">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex justify-start items-center w-full text-sideMenuTextColor2 hover:bg-primary-50"
                    >
                        <MenuIcon />
                        <p className={cn(' m-0 p-0 text-sm overflow-hidden')}>
                            {t('menu')}
                        </p>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 flex justify-start items-center w-full text-sideMenuTextColor2 hover:bg-primary-50"
                    >
                        <SettingIcon />
                        <p className={cn('m-0 p-1 text-sm overflow-hidden')}>
                            {t('setting')}
                        </p>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="p-2 flex justify-start items-center w-full text-sideMenuTextColor2 hover:bg-primary-50"
                        onClick={handleLogout}
                    >
                        <LogOutIcon size="20" />
                        <p className={cn('m-0 p-2 text-sm overflow-hidden')}>
                            {t('logout')}
                        </p>
                    </Button>
                </section>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
