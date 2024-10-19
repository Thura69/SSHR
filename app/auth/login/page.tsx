import dynamic from 'next/dynamic'

const LoginScreen = dynamic(
    () => import('../../../components/auth/screens/login-screen'),
    { ssr: false },
)

const LoginPage = () => {
    return (
        <>
            <LoginScreen />
        </>
    )
}

export default LoginPage
