'use client'

import React, { useMemo } from 'react'
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
import { Button } from '../../ui/button'
import { CrossCircle, TickCircle } from '../../common/icons'
import { cn } from '@/lib/utils'
import useDimension from '@/hooks/use-dimension'
import useAuthStore from '@/state/zustand/auth-store'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { UpdatePassword } from '../api/update-password'
import useToast from '@/hooks/use-toast'
import { PasswordInput } from '@/components/ui/password-input'
import { loginAudit, LoginAndLogoutAuditInterface } from '@/lib/audit-trail-api'
import { postLogin } from '../api/login'
import { setAPIToken } from '@/service/axios'
import Cookies from 'js-cookie'
import usePreferenceState from '@/state/zustand/preference'
import menuStore from '@/state/zustand/menu'
import { UpdatePasswordInterface } from '@/types/auth'

interface UpdatePasswordFormInputs {
    newPassword: string
    confirmPassword: string
}

const createUpdatePasswordSchema = (t: Function) => {
    return yup.object().shape({
        newPassword: yup
            .string()
            .required(t('passUpdate.form.validationMessage.password'))
            .min(8, t('passUpdate.form.validationMessage.char'))
            .matches(/[A-Z]/, t('passUpdate.form.validationMessage.upperCase'))
            .matches(/[a-z]/, t('passUpdate.form.validationMessage.lowerCase'))
            .matches(/[0-9]/, t('passUpdate.form.validationMessage.num')),
        confirmPassword: yup
            .string()
            .required(t('passUpdate.form.validationMessage.confirmPassword'))
            .oneOf(
                [yup.ref('newPassword')],
                t('passUpdate.form.validationMessage.dontMatch'),
            ),
    })
}

export const UpdatePasswordForm = () => {
    const { showNotification } = useToast()
    const setUserData = useAuthStore((state) => state.setUserData)
    const loginAuditMutation = useMutation({
        mutationFn: (data: LoginAndLogoutAuditInterface) => {
            return loginAudit(data)
        },
    })

    const clearMenus = menuStore((state) => state.clearMenus)
    const setSelectedGrandSubMenuId = menuStore(
        (state) => state.setSelectedGrandSubMenuId,
    )

    const loginMutation = useMutation({
        mutationFn: (data: {
            email: string
            password: string
            is_mobile: boolean
        }) => {
            return postLogin(data)
        },
        onSuccess: (data: any) => {
            setAPIToken(data.token)
            loginAuditMutation.mutate({
                Emp_Name: data.data.Employee_Name,
                Is_Mobile: false,
            })
            Cookies.set('auth', data.token)
            Cookies.set('userData', JSON.stringify(data.data))

            setUserData(data.data)
            clearMenus()
            setSelectedGrandSubMenuId(undefined)
            router.push('/dashboard')
            //resetAuthStore()
        },
        onError: (error: any) => {
            showNotification({
                message: error.response.data.message,
                type: 'danger',
            })
        },
    })

    const updatePasswordMutation = useMutation({
        mutationFn: (data: UpdatePasswordInterface) => UpdatePassword(data),
        onSuccess: (response) => {
            loginMutation.mutate({
                password: useAuthStore.getState()
                    .resetConfirmPassword as string,
                email: useAuthStore.getState().resetEmail as string,
                is_mobile: false,
            })
            // router.push("/auth/login");
        },
        onError: (error: any) => {
            showNotification({
                message: error.response.data.message,
                type: 'danger',
            })
        },
    })

    const { t } = useTranslation('auth')
    // this was added to resolve the problem of not being able to use useTranslations hook outside of the main function of this page
    const UpdatePasswordSchema = createUpdatePasswordSchema(t)

    const { isTablet } = useDimension()
    const router = useRouter()
    const form = useForm({
        resolver: yupResolver(UpdatePasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmitHandler: SubmitHandler<UpdatePasswordFormInputs> = (data) => {
        const email = useAuthStore.getState().resetEmail
        const resetCode = useAuthStore.getState().pwdResetCode
        useAuthStore.setState({ resetConfirmPassword: data.confirmPassword })
        updatePasswordMutation.mutate({
            confirmPassword: data.confirmPassword,
            password: data.newPassword,
            email: email,
            resetCode: resetCode,
        })
    }

    const watchNewPassword = form.watch('newPassword')
    const isPasswordFieldDirty = form.getFieldState('newPassword').isDirty
    const isConfirmPasswordFieldDirty =
        form.getFieldState('confirmPassword').isDirty
    const watchConfirmPassword = form.watch('confirmPassword')

    const doesPasswordMatch = watchNewPassword === watchConfirmPassword
    const hasEightCharacters = watchNewPassword.length >= 8
    const hasUppercaseCharacters = /[A-Z]/g.test(watchNewPassword)
    const hasLowercaseCharacters = /[a-z]/.test(watchNewPassword)
    const hasNumericCharacters = /[0-9]/.test(watchNewPassword)

    const selectedLanguage = usePreferenceState(
        (state) => state.selectedLanguage,
    )
    const isMM = selectedLanguage === 'mm'

    const checkEmailError = useMemo(
        () => (pwdCheck: boolean, label: string, valid: string) => {
            if (isConfirmPasswordFieldDirty) {
                switch (true) {
                    case pwdCheck:
                        return (
                            <p className="text-sky-500 text-sm flex items-center gap-2">
                                <TickCircle />
                                {valid}
                            </p>
                        )
                    case !pwdCheck:
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
        [isConfirmPasswordFieldDirty],
    )

    const getPasswordErrors = useMemo(
        () => (passwordCheck: boolean, label: string) => {
            if (isPasswordFieldDirty) {
                switch (true) {
                    case passwordCheck:
                        return (
                            <p className="text-sky-500 flex items-center gap-2">
                                <TickCircle />
                                {label}
                            </p>
                        )
                    case !passwordCheck:
                        return (
                            <p className="text-danger-500 flex items-center gap-2">
                                <CrossCircle />
                                {label}
                            </p>
                        )
                    default:
                        return <p>{label}</p>
                }
            }

            return null
        },
        [isPasswordFieldDirty],
    )

    return (
        <section
            className={cn(
                'w-full mx-auto lg:w-[380px] xl:w-[480px] max-sm:px-4',
                {
                    'w-[680px]': isTablet,
                },
            )}
        >
            <div>
                <h1
                    className={cn('mb-4 text-2xl font-bold', {
                        'leading-10': isMM,
                    })}
                >
                    {t('passUpdate.title')}
                </h1>
                <p className="text-sm">{t('passUpdate.description')}</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <div className="my-4 mb-8">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t('passUpdate.form.password')}{' '}
                                        <span className="ms-1 text-danger-500 font-medium">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder={t(
                                                'passUpdate.form.password',
                                            )}
                                            className={cn({
                                                'placeholder:text-xs': isMM,
                                            })}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex text-sm mt-2 mb-4">
                            <div className="flex-1 space-y-1">
                                {getPasswordErrors(
                                    hasEightCharacters,
                                    t('passUpdate.form.validation.char'),
                                )}
                                {getPasswordErrors(
                                    hasUppercaseCharacters,
                                    t('passUpdate.form.validation.upperCase'),
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                {getPasswordErrors(
                                    hasNumericCharacters,
                                    t('passUpdate.form.validation.num'),
                                )}
                                {getPasswordErrors(
                                    hasLowercaseCharacters,
                                    t('passUpdate.form.validation.lowerCase'),
                                )}
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t('passUpdate.form.confirmPassword')}{' '}
                                        <span className="ms-1 text-danger-500 font-medium">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <PasswordInput
                                                placeholder={t(
                                                    'passUpdate.placeHolder.confirmPassword',
                                                )}
                                                className={cn({
                                                    'placeholder:text-xs': isMM,
                                                })}
                                                {...field}
                                            />
                                            <div className="flex-1 space-y-1 text-sm">
                                                {checkEmailError(
                                                    doesPasswordMatch,
                                                    t(
                                                        'passUpdate.form.validationMessage.dontMatch',
                                                    ),
                                                    t(
                                                        'passUpdate.form.validationMessage.match',
                                                    ),
                                                )}
                                            </div>
                                        </>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        size="lg"
                        variant="primary"
                        className="w-full"
                    >
                        {updatePasswordMutation.isPending ||
                        loginMutation.isPending
                            ? t('passUpdate.loading')
                            : t('passUpdate.submit')}
                    </Button>
                </form>
            </Form>
        </section>
    )
}
