'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import FinancialEditForm from './financial-edit-form'

interface SettingModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
    data: any
    title: string
}

const FinancialEditModal: React.FC<SettingModalProps> = ({
    open,
    title,
    data,
    toggle,
    ...rest
}) => {
    return (
        <AlertDialog open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent className="p-6 w-[27rem] max-w-[90%]">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                </AlertDialogHeader>
                <FinancialEditForm financialYear={data} toggle={toggle} />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FinancialEditModal
