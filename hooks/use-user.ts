import useAuthStore from '@/state/zustand/auth-store'

const useUserCookie = () => {

    if (typeof window !== 'undefined') {
        const userData = useAuthStore.getState().userData
        return userData
    }
}

export default useUserCookie

