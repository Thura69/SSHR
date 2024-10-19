'use client'
import { useState } from 'react'
import { useBoolean, useMediaQuery } from 'usehooks-ts'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import { columns } from './column-def'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { useRouter } from 'next/navigation'
import TableFrame from '@/components/common/table/table-frame'
import AddHeadCountRequestForm from './add-form'
import isAuth from '@/components/auth/components/protected-route'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { HeadCountDataTable } from '../types/head-count-request-types'
import React from 'react'

const MainPage = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const exampleData = [
        {
            head_count_request_id: 1,
            position_id: 1,
            position_name: 'Software Engineer',
            no_of_position: 5,
            department_id: 101,
            department_name: 'Engineering',
            branch_id: 201,
            branch_name: 'Main Branch',
            location_id: 301,
            location_name: 'New York',
            company_id: 401,
            company_name: 'Tech Corp',
            job_location: 'New York Office',
            job_type_id: 501,
            job_type_name: 'Full-time',
            additional_skill_set: ['JavaScript', 'Node.js', 'Agile', 'Scrum'],
            urgency_level: 'high',
            target_onboarding_date: '2024-09-01',
            reason: 'Expansion',
            section_id: 601,
            section_name: 'Development',
        },
        {
            head_count_request_id: 2,
            position_id: 2,
            position_name: 'Product Manager',
            no_of_position: 2,
            department_id: 102,
            department_name: 'Product',
            branch_id: 202,
            branch_name: 'West Branch',
            location_id: 302,
            location_name: 'San Francisco',
            company_id: 402,
            company_name: 'Innovate Inc.',
            job_location: 'San Francisco Office',
            job_type_id: 502,
            job_type_name: 'Contract',
            additional_skill_set: ['Agile', 'Scrum', 'Agile', 'Scrum'],
            urgency_level: 'medium',
            target_onboarding_date: '2024-10-01',
            reason: 'New Project',
            section_id: 602,
            section_name: 'Management',
        },
        {
            head_count_request_id: 3,
            position_id: 3,
            position_name: 'Data Scientist',
            no_of_position: 3,
            department_id: 103,
            department_name: 'Data',
            branch_id: 203,
            branch_name: 'East Branch',
            location_id: 303,
            location_name: 'Boston',
            company_id: 403,
            company_name: 'DataWorks',
            job_location: 'Boston Office',
            job_type_id: 503,
            job_type_name: 'Part-time',
            additional_skill_set: ['Python', 'Machine Learning', 'Agile'],
            urgency_level: 'low',
            target_onboarding_date: '2024-11-01',
            reason: 'Data Analysis',
            section_id: 603,
            section_name: 'Analytics',
        },
    ]

    // const { t } = useTranslation('headCountRequest')
    const [data, setData] = useState<HeadCountDataTable[]>(exampleData)
    const router = useRouter()
    const isMobile = useMediaQuery('(max-width: 766px)')
    const editMode = false
    const [open, setOpen] = useState('close')
    const handleClick = () => {
        router.push(
            '/recruitment/head-count-requisition/head-count-request/add',
        )
    }
    const handleConfirmButton = () => {
        console.log('clicked sameCheck!')
    }

    // const memoizedColumns = React.useMemo(() => columns, [])

    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    {
                        title: 'Recruitment',
                        href: `/recruitment`,
                    },
                    {
                        title: 'Head Count Request',
                        href: '/recruitment/head-count-requisition/head-count-request',
                    },
                    {
                        title: 'Add Head Count Request',
                        href: '',
                    },
                ]}
            />
            <TableFrame
                isWrite={false}
                isOutline
                subTitle={false}
                modalTrue={handleClick}
                language="headCountRequest"
            />
            <AddHeadCountRequestForm isAddForm={true} setData={setData} />
            <DataTable
                className={'with-action-employee-column'}
                data={data || []}
                isSortButtonPadding={true}
                height=""
                setData={setData}
                columns={columns}
                loading={false}
            />
            <ModalConfirmBtns
                size={isMobile ? 'md' : 'md'}
                width="w-[100px] rounded-md"
                isLoading={false}
                editMode={editMode}
                language="headCountRequest"
                toggle={() => {
                    router.push(
                        '/recruitment/head-count-requisition/head-count-request',
                    )
                }}
                setSameCheck={handleConfirmButton}
            />
        </section>
    )
}

export default isAuth(MainPage)
