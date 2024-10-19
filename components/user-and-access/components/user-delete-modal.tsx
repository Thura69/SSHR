import React, { FC } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { TrashIcon } from '@/components/common/icons'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { UseBooleanOutput } from '@/types/use-boolean-output'
import { useDeleteUsers } from '@/service/query-hooks/user-and-access/user/use-user'
import { deleteAudit } from '@/lib/audit-trail-api'
import useAuthStore from '@/state/zustand/auth-store'
import Loader from '@/components/common/loaders/loader'
import { useTranslation } from 'react-i18next'
import useToast from '@/hooks/use-toast'

interface AlertModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root>,
        Omit<Partial<UseBooleanOutput>, 'open' | 'toggle'> {
    open: boolean
    toggle: () => void
    onCancel?: () => void
    onConfirm?: () => void
    message?: string
    currentMenu: any
    deleteInfo?: {
        Employee_Name?: string | undefined
        User_ID?: number
    }
    previousData: {
        Employee_ID?: number
        Role_ID?: number
        Description?: string
        IsActive?: boolean
        Company_ID?: number
        User_ID?: number
    }
}

export const UserDeleteModal: FC<AlertModalProps> = ({
    message,
    open,
    onCancel,
    onConfirm,
    toggle,
    setFalse,
    deleteInfo,
    currentMenu,
    previousData,
    ...rest
}) => {
    const employeeName = useAuthStore.getState().userData.employee_name
    const { deleteById, isError, isPending } = useDeleteUsers()
    const { t } = useTranslation('user')
    const { showNotification } = useToast()
    const onCancelHandler = () => {
        setFalse && setFalse()
        onCancel && onCancel()
    }
    const onConfirmHandler = () => {
        const auditPayload = {
            Is_Mobile: false,
            Emp_Name: employeeName,
            Page_Name: 'Delete User',
            Parent_Menu_ID: currentMenu.Parent_Menu_ID,
            Sub_Menu_ID: currentMenu.Menu_ID,
        }
        deleteById(`${deleteInfo?.User_ID}`, {
            onSuccess: (data) => {
                if (!isPending) {
                    deleteAudit({
                        ...auditPayload,
                        ValueBefore: previousData,
                        Record_Name: 'Delete User',
                    })
                    onConfirm && onConfirm()
                    setFalse && setFalse()
                }
                showNotification({
                    message: data.message,
                    type: 'success',
                })
            },
            onError: (error) => {
                showNotification({
                    message: error.message,
                    type: 'danger',
                })
            },
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent className="sm:p-6 p-4 w-[min(400px,90%)] rounded-[10px]">
                <AlertDialogHeader>
                    <AlertDialogDescription className="py-4">
                        <div className="mx-auto flex flex-col items-center space-y-3">
                            <div className="flex p-2 justify-center items-center rounded-full bg-danger-200">
                                <TrashIcon
                                    className="w-[36px] h-[36px]"
                                    fill={COLORS.danger[500]}
                                />
                            </div>
                            <p className="text-center text-black text-lg font-bold">
                                {message ?? t('modal.delete.title')}
                            </p>
                            <p className="text-center text-[13px] text-gray-500">
                                {t('modal.delete.description')}
                            </p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="w-full flex justify-center gap-4">
                    <Button
                        onClick={onConfirmHandler}
                        variant="destructive"
                        className={`${isPending && 'opacity-70'} sm:px-8 h-[35px] w-[100px]`}
                        disabled={isPending}
                    >
                        {isPending ? <Loader /> : t('modal.delete.submit')}
                    </Button>
                    <Button
                        onClick={onCancelHandler}
                        variant="outline"
                        className={`${isPending && 'opacity-70'} sm:px-8 h-[35px] w-[100px]`}
                        disabled={isPending}
                    >
                        {t('modal.delete.cancel')}
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
