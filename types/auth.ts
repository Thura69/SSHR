import { ReactNode } from 'react'

export interface User {
    username: string
}

export interface AuthContextType {
    user: User | null
    login: (userData: User) => void
    logout: () => void
}

export interface AuthProviderProps {
    children: ReactNode
}

export interface LoginInputs{
    email: string
    password: string
    rememberMe?: boolean
    is_mobile?: boolean
}

export interface LoginProps {
    onSubmit?: (data: LoginInputs) => void
}

export interface ForgetPasswordInterface {
    email: string
}

export interface OTPInterface {
    email?: string
    resetCode?: string
}

export interface UpdatePasswordInterface {
    email?: string
    resetCode?: string
    password?: string
    confirmPassword?: string
}

export interface LayoutProps {
    children?: ReactNode
}

export type OtpInputs = {
    otp: string
}

