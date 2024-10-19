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

import { SettingModalProps } from '@/types/common'
import BranchForm from './branch-form'

const BranchModal: React.FC<SettingModalProps> = ({
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
                <BranchForm
                    editData={editData}
                    editMode={editMode}
                    toggle={toggle}
                />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default BranchModal
