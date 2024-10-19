import { COLORS } from '@/constants'

import { toast, ToastOptions } from 'react-toastify'


type notificationTypes = 'default' | 'success' | 'danger' | 'warn' | 'trial'

type NotificationProps = {
    message: React.ReactNode
    type?: notificationTypes
    option?: ToastOptions
}

type CircleCheck = any;

const useToast = () => {
    const showNotification = (props: NotificationProps) => {
        const { message, option, type } = props


        switch (type) {
            case 'default':
                toast.info(message, {
                    progressStyle: { background: COLORS.primary[500] },
                    ...option,
                })
                break
            case 'success':
                toast.success(message, {
                    progressStyle: {
                        background: COLORS.primary[500]
                    },
                    className: 'text-[12px]',
                    ...option,
                })
                break
            case 'danger':
                toast.error(message, {
                    progressStyle: { background: COLORS.danger[500] },
                    className: 'text-[12px]',
                    ...option,
                })
                break
            case 'trial':
                toast.warning(message, {
                    hideProgressBar: true,
                    className: 'w-[1000px]',
                    autoClose: false,
                    position: 'top-right',
                    ...option,
                })
                break
            case 'warn':
                toast.warn(message, {
                    ...option,
                })
            default:
                toast.info(message, {
                    progressStyle: { background: COLORS.primary[500] },
                    ...option,
                })
                break
        }
    }

    return { showNotification }

}

export default useToast
