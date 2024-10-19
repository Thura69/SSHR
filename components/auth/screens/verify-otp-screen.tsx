import React from 'react'
import Image from 'next/image'
import { AuthLayout, OTPVerificationForm } from '..'

const VerifyOTPScreen = () => {
    return (
        <AuthLayout>
            <div className="lg:flex items-center justify-between gap-[100px] p-4 md:p-8 py-14">
                <div className="relative w-[370px] h-[350px] 2xl:w-[450px] 2xl:h-[490px] hidden lg:flex justify-center">
                    <Image src="/assets/otp-image.svg" fill alt="illustraion" />
                </div>
                <div className="lg:pe-10">
                    <OTPVerificationForm />
                </div>
            </div>
        </AuthLayout>
    )
}

export default VerifyOTPScreen
