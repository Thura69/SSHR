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
import { useTranslation } from 'react-i18next'
import Loader from '@/components/common/loaders/loader'
import { AlertModalProps } from '@/types/common'

export const DeleteConfirm: FC<AlertModalProps> = ({
    message,
    open,
    onCancel,
    onConfirm,
    setFalse,
    toggle,
    isLoading,
    title,
    fun,
    ...rest
}) => {
    const { t } = useTranslation('common')
    const onCancelHandler = () => {
        toggle()
    }

    return (
        <AlertDialog open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent className=" w-[min(400px,90%)] h-auto rounded-[12px]">
                <AlertDialogHeader>
                    <AlertDialogDescription >
                    <div className="mx-auto flex flex-col items-center space-y-3">
                            <div className="flex p-2 justify-center items-center rounded-full bg-danger-200">
                                <TrashIcon
                                    className="w-[33px] h-[33px]"
                                    fill={COLORS.danger[500]}
                                />
                            </div>
                            <p className="text-center text-[#E03137] text-lg font-bold">
                                {title}
                            </p>
                            <p className="text-center text-[14px]  font-[600] text-[#71717A] ">
                                {message}
                            </p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="w-full flex mt-3  justify-center gap-4  ">
                    <Button
                        className={`${isLoading && 'opacity-70'} bg-[#E03137]  rounded-[10px] sm:px-8 h-[38px] w-[100px]`}
                        onClick={fun}
                        variant="destructive"
                    >
                        {isLoading ? <Loader /> : t('delete')}
                    </Button>
                    <Button
                        onClick={onCancelHandler}
                        variant="outline"
                        className={`${isLoading && 'opacity-70'} text-[#52525B]  rounded-[10px] sm:px-8 h-[38px] w-[100px] `}
                        disabled={isLoading}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
