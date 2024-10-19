'use client'

import { DataTable } from '@/components/data-table/data-table'
import DataTableColumnInput from '@/components/data-table/data-table-column-input'
import SortButton from '@/components/data-table/sort-button'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination'
import { DatatableColumnSelect } from '@/components/data-table/data-table-column-selector'
import { STATUS_LABELS } from '@/lib/utils'

const InterviewEvaluation = () => {
    const router = useRouter()
    const pathname = usePathname()
    const interviewEvaluationColumns: ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: 'Code_No',
                header: ({ column }) => {
                    return (
                        <section className="flex justify-between items-center gap-2 w-[100px]">
                            <DataTableColumnInput placeholder={'Code No'} />
                            <SortButton column={column} />
                        </section>
                    )
                },
            },
            {
                accessorKey: 'Job_Title',
                header: ({ column }) => {
                    return (
                        <section className="flex justify-center items-center w-[150px] xl:w-[200px]">
                            <DataTableColumnInput placeholder={'Job Title'} />
                            <SortButton column={column} />
                        </section>
                    )
                },
            },
            {
                accessorKey: 'Candidate_Name',
                header: ({ column }) => {
                    return (
                        <section className="flex justify-center items-center w-[150px] xl:w-[200px]">
                            <DataTableColumnInput
                                placeholder={'Candidate Name'}
                            />
                            <SortButton column={column} />
                        </section>
                    )
                },
            },
            {
                accessorKey: 'Interview_Type',
                header: ({ column }) => {
                    return (
                        <div className="flex justify-between items-center gap-2 w-[150px] xl:w-[200px]">
                            <DatatableColumnSelect
                                align="left"
                                options={STATUS_LABELS}
                                column={column}
                                title={'Interview Type'}
                                getSelectedValues={() => {
                                }}
                            />
                            <SortButton column={column} />
                        </div>
                    )
                },
            },
            {
                accessorKey: 'Screening_Stage',
                header: ({ column }) => {
                    return (
                        <div className="flex justify-between items-center gap-2 w-[150px] xl:w-[200px]">
                            <DatatableColumnSelect
                                align="left"
                                options={STATUS_LABELS}
                                column={column}
                                title={'Screening Stage'}
                                getSelectedValues={() => {
                                }}
                            />
                            <SortButton column={column} />
                        </div>
                    )
                },
            },
            {
                accessorKey: 'Hiring_Manager',
                header: ({ column }) => {
                    return (
                        <div className="flex justify-between items-center gap-2 w-[150px] xl:w-[200px]">
                            <DatatableColumnSelect
                                align="left"
                                options={STATUS_LABELS}
                                column={column}
                                title={'Hiring Manager'}
                                getSelectedValues={() => {
                                }}
                            />
                            <SortButton column={column} />
                        </div>
                    )
                },
                cell: ({ row }) => {
                    const hiringManagers = row.original.Hiring_Manager

                    return (
                        <div className={'flex items-center gap-2'}>
                            {hiringManagers.map((hr: any) => (
                                <div
                                    className={
                                        'border border-gray-400 rounded-full px-2 py-1'
                                    }
                                >
                                    <p className="line-clamp-1 text-xs text-center">
                                        {hr}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )
                },
            },
            {
                accessorKey: 'Screening_Status',
                header: ({ column }) => {
                    const { t } = useTranslation('roleCreate')
                    return (
                        <div className="flex justify-between items-center gap-2 w-[150px] xl:w-[200px]">
                            <DatatableColumnSelect
                                align="left"
                                options={STATUS_LABELS}
                                column={column}
                                title={'Screening Status'}
                                getSelectedValues={(selectedValues) => {
                                }}
                            />
                            <SortButton column={column} />
                        </div>
                    )
                },
                cell: ({ row }) => {
                    const status = row.original.Screening_Status
                    return (
                        <div
                            className={
                                'border border-gray-300 rounded-full px-2 py-1'
                            }
                        >
                            <p className="text-xs text-center">{status}</p>
                        </div>
                    )
                },
            },
            {
                accessorKey: 'action',
                header: () => {
                    return (
                        <div className="h-full bg-zinc-50 flex items-center justify-center">
                            <p className="font-bold text-zinc-500 text-center">
                                Action
                            </p>
                        </div>
                    )
                },
                cell: ({ row }) => {
                      return (
                        <div className={'flex justify-center w-[80px]'}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="hover:">
                                    <Button
                                        variant="primary"
                                        className="h-8 w-8 p-0"
                                    >
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        <MoreHorizontal className="h-4 w-4 rotate-90" />
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => {}}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {}}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )
                },
            },
        ],
        [],
    )

    const handleNavigationToAdd = () => {
        router.push(`${pathname}/add`)
    }

    const DUMMY_DATA = [
        {
            Code_No: '001',
            Job_Title: 'Manager',
            Candidate_Name: 'John Doe',
            Interview_Type: 'Online',
            Screening_Stage: 'First interview',
            Hiring_Manager: ['Aung Zin', 'Jim'],
            Screening_Status: ' First Interview - Scheduled',
        },
        {
            Code_No: '001',
            Job_Title: 'Manager',
            Candidate_Name: 'John Doe',
            Interview_Type: 'Online',
            Screening_Stage: 'First interview',
            Hiring_Manager: ['Aung Zin', 'Jim'],
            Screening_Status: ' First Interview - Scheduled',
        },
        {
            Code_No: '001',
            Job_Title: 'Manager',
            Candidate_Name: 'John Doe',
            Interview_Type: 'Online',
            Screening_Stage: 'First interview',
            Hiring_Manager: ['Aung Zin', 'Jim'],
            Screening_Status: ' First Interview - Scheduled',
        },
        {
            Code_No: '001',
            Job_Title: 'Manager',
            Candidate_Name: 'John Doe',
            Interview_Type: 'Online',
            Screening_Stage: 'First interview',
            Hiring_Manager: ['Aung Zin', 'Jim'],
            Screening_Status: ' First Interview - Scheduled',
        },
        {
            Code_No: '001',
            Job_Title: 'Manager',
            Candidate_Name: 'John Doe',
            Interview_Type: 'Online',
            Screening_Stage: 'First interview',
            Hiring_Manager: ['Aung Zin', 'Jim'],
            Screening_Status: ' First Interview - Scheduled',
        },
        {
            Code_No: '001',
            Job_Title: 'Manager',
            Candidate_Name: 'John Doe',
            Interview_Type: 'Online',
            Screening_Stage: 'First interview',
            Hiring_Manager: ['Aung Zin', 'Jim'],
            Screening_Status: ' First Interview - Scheduled',
        },
        {
            Code_No: '001',
            Job_Title: 'Manager',
            Candidate_Name: 'John Doe',
            Interview_Type: 'Online',
            Screening_Stage: 'First interview',
            Hiring_Manager: ['Aung Zin', 'Jim'],
            Screening_Status: ' First Interview - Scheduled',
        },
        {
            Code_No: '001',
            Job_Title: 'Manager',
            Candidate_Name: 'John Doe',
            Interview_Type: 'Online',
            Screening_Stage: 'First interview',
            Hiring_Manager: ['Aung Zin', 'Jim'],
            Screening_Status: ' First Interview - Scheduled',
        },
    ]

    return (
        <section className={'p-4'}>
            <Breadcrumbs
                segments={[
                    { title: 'Settings', href: '/setting' },
                    { title: 'Change Recruitment', href: '' },
                    { title: 'Interview Evaluation Entry', href: '' },
                ]}
            />
            <div className="flex justify-between items-center mb-6 mt-4">
                <div>
                    <h1 className={'text-2xl font-bold'}>
                        Interview Evaluation
                    </h1>
                    <p className={'text-sm'}>
                        Manage users, roles, and permissions.
                    </p>
                </div>

                <Button variant="primary" onClick={handleNavigationToAdd}>
                    Add New
                </Button>
            </div>

            <div className="">
                <DataTable
                    columns={interviewEvaluationColumns}
                    data={DUMMY_DATA}
                />
                <Paging currentPage={1} perPage={15} totalCount={100} />
            </div>
        </section>
    )
}

export default InterviewEvaluation
