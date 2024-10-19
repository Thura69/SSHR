'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import SettingForm from '@/components/setting/common/setting-form'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { UpdateSettingType } from '@/types/setting'

interface SettingModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
    title: string
    editMode?: boolean
    editData?: UpdateSettingType
}

const SettingModal: React.FC<SettingModalProps> = ({
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
                <SettingForm
                    toggle={toggle}
                    editData={editData}
                    editMode={editMode}
                />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SettingModal
