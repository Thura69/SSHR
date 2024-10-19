'use client'

import React, { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Image from 'next/image'

import { useMutation } from '@tanstack/react-query'
import { Button } from '../../ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '../../ui/form'
import useDimension from '@/hooks/use-dimension'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import {postForgetPassword } from '../api/otp-request'
import useAuthStore from '@/state/zustand/auth-store'
import { useTranslation } from 'react-i18next'
import useToast from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { CrossCircle, TickCircle } from '@/components/common/icons'
import usePreferenceState from '@/state/zustand/preference'
import { ForgetPasswordInterface } from '@/types/auth'

let OTPRequestSchema = yup.object({
    email: yup.string().email().required(' '),
})

export const OTPRequestForm = () => {
    const setResetEmail = useAuthStore((state) => state.setResetEmail)
    const setHasExpired = useAuthStore((state) => state.setHasExpired)
    const { t, i18n } = useTranslation('auth')
    const selectedLanguage = usePreferenceState(
        (state) => state.selectedLanguage,
    )

    const router = useRouter()
    const { isTablet } = useDimension()
    const { showNotification } = useToast()

    const forgetPasswordMutation = useMutation({
        mutationFn: (data: ForgetPasswordInterface) => {
            return postForgetPassword(data)
        },
        onSuccess: () => {
            setHasExpired(false)
            router.push('/auth/otp')
        },
        onError: (error: any) => {
            showNotification({
                message: error.response.data.message,
                type: 'danger',
            })
        },
    })

    const form = useForm({
        resolver: yupResolver(OTPRequestSchema),
        defaultValues: {
            email: '',
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

    const onSubmitHandler: SubmitHandler<ForgetPasswordInterface> = (data) => {
        //calling forgetPassword api
        forgetPasswordMutation.mutateAsync(data)
        setResetEmail(data.email)
    }
    return (
        <section
            className={cn(
                'w-full mx-auto lg:w-[380px] xl:w-[480px] max-sm:px-4',
                {
                    'w-[680px]': isTablet,
                },
            )}
        >
            
            <div className="flex justify-center mb-2">
                <Image
                    src={'/assets/hand-holding-phone.svg'}
                    alt="illustration"
                    width={100}
                    height={100}
                />
            </div>

            <div className="text-center">
                <h1
                    className={cn('text-2xl font-bold mb-4', {
                        'text-xl': selectedLanguage === 'mm',
                    })}
                >
                    {t('forgot.title')}
                </h1>
                <p
                    className={cn('text-gray-900 text-sm w-[80%] mx-auto', {
                        'text-sm leading-6': selectedLanguage === 'mm',
                    })}
                >
                    {t('forgot.description')}
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <div className="my-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">
                                        {t('forgot.form.email')}{' '}
                                        <span className="ms-1 text-danger-500">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <Input
                                                className="placeholder:text-sm"
                                                placeholder={t(
                                                    'forgot.placeHolder.email',
                                                )}
                                                {...field}
                                            />
                                            <div>
                                                {checkEmailError(
                                                    isEmailValid,
                                                    t('forgot.invalid'),
                                                    t('forgot.valid'),
                                                )}
                                            </div>
                                        </>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <Button
                            type="submit"
                            size="lg"
                            variant="primary"
                            className={cn('w-full', {
                                
                            })}
                        >
                            {forgetPasswordMutation.isPending
                                ? t('forgot.loading')
                                : t('forgot.submit')}
                        </Button>
                        <Button
                            type="button"
                            size="lg"
                            variant="secondary"
                            className={cn('w-full font-bold text-sm', {
                                
                            })}
                            onClick={() => router.push('/auth/login')}
                        >
                            {t('forgot.backButton')}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}
