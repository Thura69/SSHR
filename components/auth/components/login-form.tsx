'use client'

import React, { FC, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '../../ui/form'
import { Logo } from '../../logo'
import { cn } from '@/lib/utils'
import { Button } from '../../ui/button'
import useDimension from '@/hooks/use-dimension'
import NextLink from 'next/link'
import { postLogin } from '../api/login'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { LanguageSelect } from '@/components/common/form/language-select'
import usePreferenceState from '@/state/zustand/preference'
import useToast from '@/hooks/use-toast'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import useAuthStore from '@/state/zustand/auth-store'
import { LoginAndLogoutAuditInterface, loginAudit } from '@/lib/audit-trail-api'
import BaseApi, { setAPIToken } from '@/service/axios'
import { CrossCircle, TickCircle } from '@/components/common/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { getRemainingDays } from '../api/login'
import menuStore from '@/state/zustand/menu'
import { LoginProps, LoginInputs } from '@/types/auth'

const loginSchema = yup.object({
    email: yup.string().email(' ').required(' '),
    password: yup.string().required(' '),
    rememberMe: yup.boolean(),
})

const LoginForm: FC<LoginProps> = ({ onSubmit }) => {
    const token = Cookies.get('auth')

    const { showNotification } = useToast()
    const router = useRouter()
    const { isTablet, isLaptop } = useDimension()
    const { t, i18n } = useTranslation('auth')
    const setLanguage = usePreferenceState((state) => state.setLanguage)
    const setUserData = useAuthStore((state) => state.setUserData)
    const remembereMe = useAuthStore.getState().rememberMe
    const [isSkeletonRendered, setIsSkeletonRendered] = useState(false)
    const selectedLanguage = usePreferenceState.getState().selectedLanguage
    const isMM = selectedLanguage === 'mm'

    useEffect(() => {
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage)
        }
        setIsSkeletonRendered(true)
    }, [selectedLanguage])

    useEffect(() => {
        if (isSkeletonRendered && token && remembereMe) {
            router.push('/dashboard')
        }
    }, [isSkeletonRendered, token, router, remembereMe])

    const form = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: useAuthStore.getState().rememberMe,
        },
    })

    const watchEmail = form.watch('email')
    const isEmailFieldDirty = form.getFieldState('email').isDirty
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Check if the email field is dirty and its value matches the email format
    const isEmailValid = isEmailFieldDirty && emailRegex.test(watchEmail)

    const checkEmailError = useMemo(
        () => (emailCheck: boolean, label: string, valid: string) => {
            if (isEmailFieldDirty) {
                switch (true) {
                    case emailCheck:
                        return (
                            <p className="text-sky-500 text-sm flex items-center gap-2">
                                <TickCircle />
                                {valid}
                            </p>
                        )
                    case !emailCheck:
                        return (
                            <p className="text-danger-500 text-sm flex items-center gap-2">
                                <CrossCircle />
                                {label}
                            </p>
                        )
                    default:
                        return <p>{valid}</p>
                }
            }

            return null
        },
        [isEmailFieldDirty],
    )

    const clearMenus = menuStore((state) => state.clearMenus)
    const setSelectedGrandSubMenuId = menuStore(
        (state) => state.setSelectedGrandSubMenuId,
    )

    const loginAuditMutation = useMutation({
        mutationFn: (data: LoginAndLogoutAuditInterface) => {
            return loginAudit(data)
        },
    })

    const remainingDaysMutation = useMutation({
        mutationFn: () => {
            return getRemainingDays()
        },
        onSuccess: (data: any) => {
            const notification = t('login.trial')
            const expireSoon = t('login.expireSoon')
            let latestNotifiaction = undefined
            if (data.data.remainingDays > 0) {
                latestNotifiaction = `${notification} ${data.data.remainingDays} days`
            } else if (data.data.remainingHours === 0) {
                latestNotifiaction = `${expireSoon}`
            } else {
                latestNotifiaction = `${notification} ${data.data.remainingHours} hours`
            }

            showNotification({
                message: latestNotifiaction,
                type: 'trial',
            })
        },
    })

    const loginMutation = useMutation({
        mutationFn: (data: {
            email: string
            password: string
            is_mobile: boolean
        }) => {
            return postLogin(data)
        },
        onSuccess: (data: any) => {

            console.log(data)
            setAPIToken(data.token)

            // const {data:trialData, error:trialError, isLoading:trialLoading} = useGetTrialRemainingDays()
            // loginAuditMutation.mutate({
            //     Emp_Name: data.data.Employee_Name,
            //     Is_Mobile: false,
            // })

            if (useAuthStore.getState().rememberMe === true) {
                Cookies.set('auth', data.token, { expires: 30 })
            } else {
                Cookies.set('auth', data.token)
            }

            Cookies.set('userData', JSON.stringify(data.data))
            remainingDaysMutation.mutate()

           
            setUserData(data.data)
            clearMenus()
            setSelectedGrandSubMenuId(undefined)

            router.push('/dashboard')
        },
        onError: (error: any) => {
            showNotification({
                message: error.response.data.message,
                type: 'danger',
            })
        },
    })

    const onSubmitHandler: SubmitHandler<LoginInputs> = (data) => {
        useAuthStore.setState({ rememberMe: data.rememberMe })
        const combinedPayload = { ...data, is_mobile: false }
        loginMutation.mutate(combinedPayload)
    }

    const handleLanguageChange = (newLanguage: string) => {
        setLanguage(newLanguage)
        BaseApi.defaults.headers.common['Accept-Language'] = newLanguage || 'en'
        i18n.changeLanguage(newLanguage)
    }

    return (
        <div>
            {token && remembereMe ? (
                <Skeleton className=" rounded-full w-[200px] h-[200px] flex items-center justify-center">
                    <p className="text-slate-500">Authenticating...</p>
                </Skeleton>
            ) : (
                <>
                    <section
                        className={cn('w-full mx-auto lg:ps-6', {
                            'w-[680px]': isTablet,
                            'w-[500px]': isLaptop,
                        })}
                    >
                        <span className="absolute right-7 top-4">
                            <LanguageSelect
                                name="LanguageSelector"
                                form={form}
                                width={125}
                                onLanguageChange={handleLanguageChange}
                            />
                        </span>
                        <Logo className="mb-4 block lg:hidden" />
                        <h1 className="mb-7 mt-2 lg:mt-6 xl:mt-2 2xl:mt-0 text-2xl font-bold pt-6">
                            {t('login.title')}
                        </h1>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmitHandler)}
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm">
                                                {t('login.form.email')}{' '}
                                                <span className="ms-1 text-danger-500">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <>
                                                    <Input
                                                        placeholder={t(
                                                            'login.placeHolder.email',
                                                        )}
                                                        {...field}
                                                    />
                                                    <div>
                                                        {checkEmailError(
                                                            isEmailValid,
                                                            t('login.invalid'),
                                                            t('login.valid'),
                                                        )}
                                                    </div>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {t('login.form.password')}{' '}
                                                <span className="ms-1 text-danger-500 font-medium">
                                                    *
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    className={cn('px-3')}
                                                    placeholder={t(
                                                        'login.placeHolder.password',
                                                    )}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <div
                                    className={cn(
                                        'text-zinc-500 flex flex-col md:flex-row items-start md:justify-between md:items-center pb-3 gap-2',
                                        {
                                            'flex-row justify-between items-center':
                                                !isMM,
                                        },
                                    )}
                                >
                                    <FormField
                                        control={form.control}
                                        name="rememberMe"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        id="rememberMe"
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel
                                                        className="w-full h-full"
                                                        htmlFor="rememberMe"
                                                    >
                                                        {t(
                                                            'login.form.rememberMe',
                                                        )}
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <NextLink
                                        href="/auth/reset-password"
                                        className="text-zinc-500 hover:opacity-80 text-sm font-medium mt-0"
                                    >
                                        {t('login.form.forgotPassword')}
                                    </NextLink>
                                </div>

                                <Button
                                    size="lg"
                                    variant="primary"
                                    className="w-full"
                                    type="submit"
                                >
                                    {loginMutation.isPending
                                        ? t('login.loading')
                                        : t('login.submit')}
                                </Button>
                            </form>
                        </Form>
                    </section>

                    <div className="text-sm font-medium mt-10 text-center flex flex-col xl:flex-row xl:justify-between xl:gap-2 lg:min-w-[601px]">
                        <p className="text-zinc-400 pt-2">
                            {t('login.copyRight')}
                        </p>
                        <div className="flex flex-col md:flex-row mt-2 gap-[10px] justify-center">
                            <Button
                                size="text"
                                variant="ghost"
                                className="hover:bg-transparent hover:opacity-80"
                            >
                                {t('login.T&C')}
                            </Button>
                            <Button
                                size="text"
                                variant="ghost"
                                className="hover:bg-transparent hover:opacity-80"
                            >
                                {t('login.policy')}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default LoginForm
