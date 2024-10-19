import React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export type Department = {
    Department_Name: string
    Probation_Period: number
    Department_Color: string
}

export type Section = {
    Department_Name:string,
    section_name:string,
    description:string,
    is_active:boolean,
    Total_Employees:number
}

export interface FilterProps {
    id: number
    label: string
}

export interface OrgChartComponentProps extends React.ComponentPropsWithRef<'div'> {
    data: any[]
    onNodeClick?: (data: any) => void
    form: UseFormReturn<FieldValues, any, undefined>
    loading: boolean
}

