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
import { useTranslation } from 'react-i18next'
import Loader from '@/components/common/loaders/loader'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AlertModalProps } from '@/types/common'

export const Confirm: FC<AlertModalProps> = ({
    message,
    open,
    onCancel,
    onConfirm,
    setFalse,
    toggle,
    isLoading,
    title,
    fun,
    type = 'delete',
    ...rest
}) => {
    const { t } = useTranslation('common')
    const onCancelHandler = () => {
        toggle()
        onCancel && onCancel()
    }

    return (
        <AlertDialog open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent className="sm:p-6 p-4 w-[min(400px,90%)] rounded-[10px] ">
                <AlertDialogHeader>
                    <AlertDialogDescription className="py-4">
                        <div className="mx-auto flex flex-col items-center space-y-3">
                            <div
                                className={cn(
                                    ' flex p-2 justify-center items-center rounded-full',
                                    {
                                        'bg-danger-200': type === 'delete',
                                        'bg-primary-200': type === 'info',
                                    },
                                )}
                            >
                                {type === 'delete' ? (
                                    <TrashIcon
                                        className="w-[36px] h-[36px]"
                                        fill={COLORS.danger[500]}
                                    />
                                ) : null}

                                {type === 'info' ? (
                                    <AlertCircle
                                        className="w-[36px] h-[36px]"
                                        stroke={COLORS.primary[900]}
                                    />
                                ) : null}
                            </div>
                            <p className="text-center text-black text-lg font-bold">
                                {title}
                            </p>
                            <p className="text-center text-[13px] text-gray-500 ">
                                {message}
                            </p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex  sm:gap-4 flex-row  gap-2 items-center justify-center">
                    <Button
                        onClick={fun && fun}
                        variant={type === 'delete' ? 'destructive' : 'primary'}
                        className={`${isLoading && 'opacity-70'} sm:px-8  h-[35px]  w-[100px]`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader />
                        ) : type === 'delete' ? (
                            t('delete')
                        ) : (
                            'Replace'
                        )}
                    </Button>
                    <Button
                        onClick={onCancelHandler}
                        variant="outline"
                        className={`${isLoading && 'opacity-70'} sm:px-8  h-[35px]  w-[100px]`}
                        disabled={isLoading}
                    >
                        {t('cancel')}
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
