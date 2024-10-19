import React, { FC } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { TrashIcon } from './common/icons'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants'
import { AlertModalProps } from '@/types/common'


export const AlertModal: FC<AlertModalProps> = ({
    message,
    open,
    onCancel,
    onConfirm,
    toggle,
    setFalse,
    ...rest
}) => {
    const onCancelHandler = () => {
        setFalse && setFalse()
        onCancel && onCancel()
    }
    const onConfirmHandler = () => {
        onConfirm && onConfirm()
        setFalse && setFalse()
    }

    return (
        <AlertDialog open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent className="p-6 w-[27rem] max-w-[90%]">
                <AlertDialogHeader>
                    <AlertDialogDescription className="py-4">
                        <div className="mx-auto w-[300px] flex flex-col items-center space-y-3">
                            <div className="w-[64px] h-[64px] flex justify-center items-center rounded-full bg-danger-200">
                                <TrashIcon
                                    className="w-[36px] h-[36px]"
                                    fill={COLORS.danger[500]}
                                />
                            </div>
                            <p className="text-center text-black text-lg font-bold">
                                {message ?? 'Delete User?'}
                            </p>
                            <p className="text-center text-[13px] text-gray-500 w-[244px]">
                                Are you sure you want to delete{' '}
                            </p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="w-full flex justify-center gap-4">
                    <Button
                        onClick={onConfirmHandler}
                        size="lg"
                        variant="destructive"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={onCancelHandler}
                        size="lg"
                        variant="outline"
                    >
                        Cancel
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
