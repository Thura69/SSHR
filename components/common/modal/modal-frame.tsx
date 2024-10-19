'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { cn } from '@/lib/utils'
import { AlertModalProps } from '@/types/common'

const ModalFrame: React.FC<AlertModalProps> = ({
    open,
    toggle,
    title,
    children,
    className,
    closeBtn,
    ...rest
}) => {
    return (
        <AlertDialog open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent
                className={cn('md:p-6 w-[27rem] max-w-[90%] rounded-[10px]', className)}
            >
                {/* <button
                    onClick={toggle}
                    className=" absolute pr-4
                    pt-4 right-0 text-primary-500"
                >
                    <CloseSvg />
                </button> */}
                {title && (
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                    </AlertDialogHeader>
                )}

                <div className={`${closeBtn && 'pt-6'}`}>{children}</div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ModalFrame
