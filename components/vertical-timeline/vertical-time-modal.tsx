'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { CreateCurrencyType } from '@/types/setting/currency'
import { DataTable } from '../data-table/data-table'
import { Button } from '../ui/button'
import { AuditTrailEventTypes, DATE_FORMAT, safeJsonParse } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

interface JobTypeModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
    title: string
    editMode?: boolean
    editData?: CreateCurrencyType
    data?: any
}

const VerticalTimeModal: React.FC<JobTypeModalProps> = ({
    open,
    title,
    toggle,
    editData,
    editMode,
    data,
    ...rest
}) => {
    const changesInString = safeJsonParse(data?.Detail)
    const changesInArray = changesInString ? JSON.parse(changesInString) : []
    const changesType = data?.EventType
    const dateRegax = new RegExp(/date/i)

    const ViewDetailTblColumns = () =>
        changesInArray.map((row: any, i: number) => {
            const columnObj: any = {
                ...(String(Object.keys(row)[i]) && {
                    id: new Date().getTime() + Math.random(),
                    accessorKey: Object.keys(row)[i],
                    header: Object.keys(row)[i],
                }),
            }
            if (dateRegax.test(Object.keys(row)[i])) {
                const formattedDate = format(
                    row[Object.keys(row)[i]],
                    DATE_FORMAT,
                )
                columnObj['cell'] = ({ row }: { row: any }) => (
                    <span>{formattedDate}</span>
                )
            }

            return columnObj
        }) as ColumnDef<any>

    const getTblColumn = () => {
        switch (changesType) {
            case AuditTrailEventTypes.VIEW:
                return ViewDetailTblColumns()
            default:
                return []
        }
    }

    const TblColumn = getTblColumn() as any

    return (
        <AlertDialog open={open} onOpenChange={toggle}>
            <AlertDialogContent className="p-6 w-auto max-w-[90%] max-h-[60%] overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-between">
                        <p>{title}</p>
                        <Button
                            size={'md'}
                            variant={'ghost'}
                            className='bg-slate-100 hover:bg-slate-200'
                            onClick={() => toggle()}
                        >
                            Close
                        </Button>
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <DataTable columns={TblColumn} data={changesInArray} />
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default VerticalTimeModal
