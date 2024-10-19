'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { updateFinancialYearType } from '@/types/setting/financial-year-type'
import PublicHolidayForm from './public-holiday-form'

interface SettingModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
    title: string
    editData?: updateFinancialYearType
    editMode?: boolean
}

const PublicHolidayModal: React.FC<SettingModalProps> = ({
    open,
    toggle,
    title,
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
                <PublicHolidayForm
                    editData={editData}
                    editMode={editMode}
                    toggle={toggle}
                />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PublicHolidayModal
