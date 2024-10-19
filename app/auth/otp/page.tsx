'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const VerifyOTPScreen = dynamic(
    () => import('../../../components/auth/screens/verify-otp-screen'),
    { ssr: false },
)
const updatePassword = () => {
    return (
        <div className="">
            <VerifyOTPScreen />
        </div>
    )
}

export default updatePassword
