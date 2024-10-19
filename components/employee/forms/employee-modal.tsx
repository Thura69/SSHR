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
import { cn } from '@/lib/utils'
import TableTitle from '@/components/common/form/table-title'
import { Separator } from '@/components/ui/separator'

interface SettingModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
    title: string
    editData?: updateFinancialYearType
    editMode?: boolean
    modelRatio?: string
    form: React.ReactNode
}

const EmployeeModal: React.FC<SettingModalProps> = ({
    open,
    toggle,
    title,
    editData,
    editMode,
    modelRatio,
    form,
    ...rest
}) => {
    return (
        <AlertDialog  open={open} onOpenChange={toggle} {...rest}>
            <AlertDialogContent
                className={cn(
                    'rounded-[10px] ',
                    'w-[650px] h-auto max-w-[90%] ',
                    modelRatio,
                )}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <TableTitle title={title} />
                    </AlertDialogTitle>
                    <Separator className='bg-primary-500'/>
                </AlertDialogHeader>
                {form}
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EmployeeModal
