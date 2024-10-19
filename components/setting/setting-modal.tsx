'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import SettingCreateForm from '@/components/setting/setting-create-form'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

interface SettingModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
}

const SettingModal: React.FC<SettingModalProps> = ({
    open,
    toggle,
    ...rest
}) => {
    return (
        <AlertDialog open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent className="p-6 w-[27rem] max-w-[90%]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Setting Entry</AlertDialogTitle>
                </AlertDialogHeader>
                <SettingCreateForm toggle={toggle} />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default SettingModal
