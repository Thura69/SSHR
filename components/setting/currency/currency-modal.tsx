'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import CurrencyForm from './currency-form'
import { CreateCurrencyType } from '@/types/setting/currency'

interface JobTypeModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
    title: string
    editMode?: boolean
    editData?: CreateCurrencyType
}

const CurrencyModalType: React.FC<JobTypeModalProps> = ({
    open,
    title,
    toggle,
    editData,
    editMode,
    ...rest
}) => {
    return (
        <AlertDialog open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent className="p-6 w-[27rem] max-w-[90%] rounded-[10px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                </AlertDialogHeader>
                <CurrencyForm
                    toggle={toggle}
                    editData={editData}
                    editMode={editMode}
                />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CurrencyModalType
