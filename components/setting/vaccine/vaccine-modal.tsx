'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { CreateVaccineType } from '@/types/setting/vaccine-type'
import VaccineForm from '@/components/setting/vaccine/vaccine-form'

interface JobTypeModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
    title: string
    editMode?: boolean
    editData?: CreateVaccineType
}

const VaccineModal: React.FC<JobTypeModalProps> = ({
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
                <VaccineForm
                    toggle={toggle}
                    editData={editData!}
                    editMode={editMode}
                />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default VaccineModal
