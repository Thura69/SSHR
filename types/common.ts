import React, { ComponentProps, ReactNode } from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { UseBooleanOutput } from '@/types/use-boolean-output'
import { Column, ColumnDef, Row, SortDirection, Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { updateFinancialYearType } from '@/types/setting/financial-year-type'

export interface BearState {
    bears: number
    increasePopulation: () => void
    removeAllBears: () => void
}

export interface DistinctDepartment {
    Department_ID: number
    Department_Name: string
}

export interface DistinctLocation {
    Location_ID: number
    Location_Name: string
}

export interface DistinctCompany {
    Company_ID: number
    Company_Name: string
}

export interface DistinctBranch {
    Branch_ID: number
    Branch_Name: string
}


export interface DistinctJobType {
    job_type_id: number
    job_type_name: string
}

export interface DistinctPosition {
    Position_ID: number
    Position_Name: string
}

export interface DistinctRole {
    Role_ID: number
    Role_Name: string
}

export interface DistinctSection {
    Section_ID: number
    Section_Name: string
}

export interface RemainingDays {
    remainingDays: number
}

export interface DatePickerProps {
    onSelect: (date: Date | undefined) => void

    buttonClassNames?: string
    same?: boolean
    sameValue?: Date
    placeholder?: string
    form?: any
    isRequired?: any
    field?: any,
    disabled?: any
}

export interface AlertModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root>,
    Omit<Partial<UseBooleanOutput>, 'open' | 'toggle'> {
    open: boolean
    toggle: () => void
    onCancel?: () => void
    onConfirm?: () => void
    message?: string
    title?: string
    isLoading?: boolean
    fun?: (row: any) => void
    type?: any
    children?: ReactNode
    className?: string
    closeBtn?: boolean
}

export interface ModalControlBtnsProps {
    isLoading: boolean
    search?: boolean
    editMode: boolean | undefined
    language: string
    toggle: () => void
    setSameCheck?: (value: boolean) => void
    size?:"md" | "lg" | "sm",
    width?:string
}

export interface ModalNextBtnsProps {
    language: string
    toggle: () => void
    handleClick?: (value: boolean) => void
    width?:string
}


export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'nav'> {
    segments: {
        title: string
        href: string
    }[]
    separator?: React.ComponentType<{ className?: string }>
    truncationLength?: number
}

export type PagnationProps = {
    totalCount: number
    currentPage: number
    perPage: number
    loading?: boolean
}

export type PagnationV4Props = {
    totalCount: number
    currentPage: number
    perPage: number
    loading?: boolean
}

export interface CellActionProps {
    language: string
    selectedGrandSubMenu: any
    handleEdit: (row: any) => void
    handleDelete: (row: any) => void
    row: any
    setSingleCodeGenerator: (row: any) => void
}

export interface TableFrameProps {
    language: string
    isOutline?: boolean
    modalTrue: () => void
    subTitle: boolean
    isWrite: boolean
    showFi?: boolean
    margin?: string
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    className?: string
    getSelectedRows?: (data: any) => void
    loading?: boolean
    handleAllRowSelection?: (data: boolean) => void
    isAllRowSelected?: boolean
    handleGetTableObj?: (table: any) => void
    detailValue?:any,
    getRoleId?:
    | ((
        originalRow: any,
        index: number,
        parent?: Row<any> | undefined,
    ) => string)
    | undefined
    setData?: any
    updateFun?: any
}

export interface TableHeaderInputProps extends React.ComponentPropsWithRef<'input'> {
    containerClassName?: string
    placeholder: string
}

export interface DateColumnSelectOption {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>
    title?: string
    options: DateColumnSelectOption[]
    align?: 'left' | 'center' | 'right'
    isSingle?: boolean
    getSelectedValues?: (selectedValues: any) => void
    type?: string
    initialValue?: any
}

export interface SortButtonProps<TData, TValue>
    extends Omit<ComponentProps<typeof Button>, 'onClick'> {
    column: Column<TData, TValue>
    onClick?: (sort: false | SortDirection) => void
    columnName?: string
}

export interface CCModelProps {
    setShowCCModel: React.Dispatch<React.SetStateAction<boolean>>
    showCCModel: boolean
}

export interface DndTableProps {
    setOrderedList: React.Dispatch<React.SetStateAction<any[]>>
    initialList: any[]
    setRequestToKeys: any
}
export interface SettingModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
    title: string
    editData?: updateFinancialYearType
    editMode?: boolean
}
