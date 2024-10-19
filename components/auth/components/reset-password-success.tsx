'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../../ui/button'
import { Logo } from '../../logo'
import { cn } from '@/lib/utils'

export const ResetPasswordSuccess = () => {
    const route = useRouter()
    const handleNavigateToLogin = () => {
        route.replace('/auth/login');
    }
    return (
        <section className="h-screen w-full relative overflow-hidden">
            <Logo className="absolute m-4 lg:top-[20px] lg:left-[20px]" />
            <CedentialsImage />
            <CircleSuccessImage />{' '}
            <div className="bg-passwordSuccessBg h-full flex justify-center items-center">
                <div
                    className={cn(
                        'relative max-w-[90%] w-[524px] rounded-[23px] p-12 bg-white',
                    )}
                >
                    <>
                        <Image
                            src="/assets/success.svg"
                            alt="password-reset-success"
                            width={206}
                            height={100}
                            className="mx-auto"
                        />
                        <div className="space-y-4 text-center pb-8 pt-4">
                            <h1 className="text-xl font-bold">
                                Your password has been changed successfully
                            </h1>
                            <p className="text-base w-4/5 mx-auto">
                                Always remember the password for your account at
                                Smilax HR!
                            </p>
                        </div>
                        <Button
                            size="lg"
                            variant="primary"
                            className="w-full"
                            onClick={handleNavigateToLogin}
                        >
                            Back to Login
                        </Button>
                    </>
                </div>
            </div>
        </section>
    )
}

const CedentialsImage = () => {
    return (
        <Image
            src="/assets/login-with-credentials.svg"
            alt="credentials"
            width={582}
            height={587}
            className="absolute bottom-0 hidden xl:block"
        />
    )
}

const CircleSuccessImage = () => {
    return (
        <div className="absolute top-16 -right-7 hidden xl:block w-[163px] h-[163px] ">
            <Image src="/assets/circle-tick.svg" alt="circle-success" fill />
        </div>
    )
}
