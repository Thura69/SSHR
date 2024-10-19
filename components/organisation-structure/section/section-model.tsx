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
import { SectionForm } from './section-form'

interface SettingModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
    title: string
    editData?: updateFinancialYearType
    editMode?: boolean
}

const SectionModel: React.FC<SettingModalProps> = ({
    open,
    toggle,
    title,
    editData,
    editMode,
    ...rest
}) => {
    return (
        <AlertDialog open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent className="md:p-6 w-[27rem] h-auto max-w-[90%] rounded-[10px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                </AlertDialogHeader>
                <SectionForm
                    editData={editData}
                    editMode={editMode}
                    toggle={toggle}
                />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SectionModel
