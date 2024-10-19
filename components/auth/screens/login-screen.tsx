import { AuthLayout } from '..'
import Image from 'next/image'
import LoginForm from '../components/login-form'

const LoginScreen = () => {
    return (
        <AuthLayout>
            <div className="md:flex items-center justify-center gap-[30px] p-4 overflow-hidden">
                <div className="relative w-[350px] h-[400px] hidden lg:block">
                    <Image
                        src="/assets/login-image.svg"
                        fill
                        alt="illustration"
                    />
                </div>
                <LoginForm />
            </div>
        </AuthLayout>
    )
}

export default LoginScreen
