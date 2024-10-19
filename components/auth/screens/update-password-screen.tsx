import React from 'react'
import { AuthLayout, UpdatePasswordForm } from '..'
import Image from 'next/image'

export const UpdatePasswordScreen = () => {
    return (
        <AuthLayout>
            <div className="md:flex items-center justify-center gap-[30px] px-3 py-8">
                <div className="relative w-[400px] h-[400px] 2xl:w-[600px] 2xl:h-[590px] hidden lg:block">
                    <Image
                        fill
                        src="/assets/forgetting-girl.svg"
                        alt="illustraion"
                    />
                </div>
                <div className="lg:pe-5">
                    <UpdatePasswordForm />
                </div>
            </div>
        </AuthLayout>
    )
}
