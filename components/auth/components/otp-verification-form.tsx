'use client'

import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import Image from 'next/image'
import { Button } from '../../ui/button'
import { cn } from '@/lib/utils'
import useDimension from '@/hooks/use-dimension'
import { COLORS } from '@/constants'
import useAuthStore from '@/state/zustand/auth-store'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import {  verifyOTP } from '../api/otp-verification'
import { useRouter } from 'next/navigation'
import { postForgetPassword } from '../api/otp-request'
import { useTranslation } from 'react-i18next'
import useToast from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { ForgetPasswordInterface, OtpInputs, OTPInterface } from '@/types/auth'

const otpSchema = yup.object({
    otp: yup.string().length(6, 'OTP Needs to be six characters').required(' '),
})

export const OTPVerificationForm = () => {
    const form = useForm({
        resolver: yupResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    })

    const router = useRouter()
    const isMobile = useMediaQuery('(max-width:480px)')
    const authData = useAuthStore((state) => ({
        email: state.resetEmail,
        hasExpired: state.hasExpired,
        remainingTime: state.remainingTime,
    }))

    const setHasExpired = useAuthStore((state) => state.setHasExpired)
    const handleResendAuthStore = useAuthStore((state) => state.handleResend)
    const setTimeAuthStore = useAuthStore((state) => state.setRemainingTime)
    const setOtpCode = useAuthStore((state) => state.setOtpCode)
    const otpMutation = useMutation({
        mutationFn: (data: OTPInterface) => {
            return verifyOTP(data)
        },
        onSuccess: () => {
            setHasExpired(false)
            setOtpCode(otp)
            router.push('/auth/update-password')
        },
        onError: (error: any) => {
            showNotification({
                message: error.response.data.message,
                type: 'danger',
            })
        },
    })

    const forgetPasswordMutation = useMutation({
        mutationFn: (data: ForgetPasswordInterface) => {
            return postForgetPassword(data)
        },
        onSuccess: () => {
            //handle resend from auth store
            handleResendAuthStore()
            showNotification({
                message: t('OTP.otpSuccess'),
                type: 'success',
            })
            setRemainingTime(60)
        },
        onError: (error: any) => {
            showNotification({
                message: error.response.data.message,
                type: 'danger',
            })
        },
    })

    const { t } = useTranslation('auth')
    const { showNotification } = useToast()
    const [otp, setOtp] = useState('')
    const { isTablet } = useDimension()
    const [remainingTime, setRemainingTime] = useState(
        authData.remainingTime || 60,
    )

    useEffect(() => {
        if (authData.hasExpired === false) {
            // Check for expiration before starting interval
            const intervalId = setInterval(() => {
                setRemainingTime((prevTime) => {
                    const newTime = Math.max(0, prevTime - 1)
                    setTimeAuthStore(newTime)
                    if (newTime === 0) {
                        setHasExpired(true) // Already set to true, but ensure consistency
                    }
                    return newTime
                })
            }, 1000)

            return () => clearInterval(intervalId)
        }
    }, [authData.hasExpired])

    const onSubmitHandler: SubmitHandler<OtpInputs> = (data) => {
        handleOnSubmit()
    }

    const handleOnSubmit = () => {
        //clearing email , password and hasExpired fields in Auth Store
        otpMutation.mutate({
            email: authData.email,
            resetCode: otp,
        })
    }

    const handleResend = () => {
        if (!authData.email) throw new Error('Something Went Wrong With Store')
        forgetPasswordMutation.mutate({ email: authData.email })
    }

    const {
        formState: { errors },
    } = form
    const isValid = !errors.otp
    return (
        <section
            className={cn('max-w-[370px] max-sm:mx-auto', {
                'max-w-[400px]': isTablet,
            })}
        >
            <div className="flex justify-center mb-5">
                <Image
                    src={'/assets/envelope.svg'}
                    alt="illustration"
                    width={100}
                    height={100}
                />
            </div>
            <div className="text-center w-4/5 mx-auto">
                <h1 className="text-2xl mb-2 font-bold">{t('OTP.title')}</h1>
                <p className="text-sm leading-6">
                    {t('OTP.description')}{' '}
                    <span className="font-semibold">
                        {authData.email
                            ? authData.email
                            : 'example@example.com'}
                    </span>
                    .{' '}
                    <Link href={'/auth/reset-password'}>
                        <Button
                            variant="ghost"
                            className="text-sm p-0 m-0 text-OTPCaretColor hover:bg-transparent hover:opacity-80"
                        >
                            {t('OTP.link')}
                        </Button>
                    </Link>
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <div className="py-6 pt-10">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <OtpInput
                                            value={otp}
                                            onChange={(otp) => {
                                                setOtp(otp)
                                                form.setValue(
                                                    'otp',
                                                    otp as string,
                                                )
                                                form.trigger('otp') // Update the form value
                                            }}
                                            numInputs={6}
                                            renderSeparator={' '}
                                            inputStyle={{
                                                width: isMobile
                                                    ? '40px'
                                                    : '50px',
                                                height: isMobile
                                                    ? '40px'
                                                    : '50px',
                                                caretColor:
                                                    COLORS.OTPCaretColor,
                                            }}
                                            containerStyle={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                            inputType="tel"
                                            shouldAutoFocus={true}
                                            renderInput={(props) => (
                                                <Input
                                                    {...props}
                                                    className={`focus-visible:ring-0 focus-within:${!isValid ? 'border-red-500' : 'border-blue-500'} focus-visible:ring-offset-0 focus-visible: ${isValid ? 'border-slate-500' : 'border-red-500'}`}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <p className="text-xs text-gray-600 leading-6 text-center pb-2">
                        {authData.hasExpired ? (
                            <Button
                                variant="link"
                                onClick={handleResend}
                                className="text-xs p-0 m-0 text-OTPCaretColor"
                            >
                                {t('OTP.resend')}
                            </Button>
                        ) : (
                            <span>
                                {t('OTP.expire')}{' '}
                                <span className="text-red-600">
                                    {remainingTime}
                                </span>
                            </span>
                        )}
                    </p>
                    <Button
                        type="submit"
                        size="lg"
                        variant="primary"
                        className="w-full"
                        disabled={authData.hasExpired}
                    >
                        {otpMutation.isPending
                            ? t('OTP.loading')
                            : t('OTP.submit')}
                    </Button>
                </form>
            </Form>
        </section>
    )
}
