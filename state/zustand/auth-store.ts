import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { userDataInterface } from '@/lib/audit-trail-api'

type State = {
    resetEmail: string | undefined
    resetPassword: string | undefined
    pwdResetCode: string | undefined
    resetConfirmPassword: string | undefined
    hasExpired: boolean
    remainingTime: number | undefined
    userData: Partial<userDataInterface>
    token: string | undefined
    rememberMe: boolean,
    update:string| undefined,
}

type Actions = {
    setResetEmail: (email: string) => void
    setResetPasswords: (password: string, confirmPassword: string) => void
    setHasExpired: (isExpired: boolean) => void
    resetAuthStore: () => void
    resetHasExpired: () => void
    setRemainingTime: (remaining: number) => void
    handleResend: () => void
    setOtpCode: (otp: string) => void
    setUserData: (data: State['userData']) => void,
    setUpdate:()=>void
}

const useAuthStore = create<State & Actions>()(
    devtools(
        persist(
            (set) => ({
                //state
                resetEmail: undefined,
                resetPassword: undefined,
                pwdResetCode: undefined,
                resetConfirmPassword: undefined,
                hasExpired: false,
                remainingTime: undefined,
                userData: {
                    user_id: undefined,
                    company_id: undefined,
                    tenant_id: undefined,
                },
                token: undefined,
                rememberMe: false,
                update:undefined,

                //actions
                setRemainingTime: (remaining: number) =>
                    set({ remainingTime: remaining }),
                setResetEmail: (email: string) => set({ resetEmail: email }),
                setResetPasswords(password, confirmPassword) {
                    set({
                        resetPassword: password,
                        resetConfirmPassword: confirmPassword,
                    })
                },
                setHasExpired: (isExpired: boolean) =>
                    set({ hasExpired: isExpired, remainingTime: undefined }),
                resetAuthStore: () =>
                    set({
                        hasExpired: false,
                        resetEmail: undefined,
                        resetPassword: undefined,
                        pwdResetCode: undefined,
                        resetConfirmPassword: undefined,
                        remainingTime: undefined,
                    }),
                resetHasExpired: () => set({ hasExpired: false }),
                handleResend: () =>
                    set({ hasExpired: false, remainingTime: undefined }),
                setOtpCode: (otp: string) => set({ pwdResetCode: otp }),
                setUserData: (data: State['userData']) =>
                    set({ userData: data }),
                setUpdate:()=>set({update:"update"})
            }),
            { name: 'AuthStore' },
        ),
    ),
)

export default useAuthStore
