import React from 'react'
import Image from 'next/image'
import { OTPRequestForm } from '@/components/auth'
import { AuthLayout } from '..'

export const RequestOTPScreen = ({}) => {
    return (
        <AuthLayout>
            <div className="md:flex items-center justify-center gap-[80px] p-4">
                <div className="relative w-[300px] h-[300px] 2xl:h-[490px] ms-14 hidden lg:block">
                    <Image
                        src="/assets/sitting-girl.svg"
                        alt="illustraion"
                        fill
                    />
                </div>
                <OTPRequestForm />
            </div>
        </AuthLayout>
    )
}
