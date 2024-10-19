'use client'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { useRouter } from 'next/navigation'
import TableFrame from '@/components/common/table/table-frame'
import AddHeadCountRequestForm from '../head-count-request-add/add-form'
import isAuth from '@/components/auth/components/protected-route'

const HCREditMainPage = ({ id }: { id: string }) => {
    const { value, toggle, setTrue } = useBoolean(false)
    console.log('current id')
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
            job_location: 'any',
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
    const findData = (id: number) => {
        return exampleData.filter(
            (item) => item.head_count_request_id === id,
        )[0]
    }
    // const { t } = useTranslation('headCountRequest')
    const router = useRouter()
    const handleClick = () => {
        router.push(
            '/recruitment/head-count-requisition/head-count-request/add',
        )
    }

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
                        title: 'Update Head Count Request',
                        href: '',
                    },
                ]}
            />
            <TableFrame
                isWrite={false}
                isOutline
                subTitle={false}
                modalTrue={() => {}}
                language="headCountRequest"
            />
            <AddHeadCountRequestForm
                isAddForm={false}
                editMode={true}
                editData={findData(+id)}
                setData={() => {}}
            />
        </section>
    )
}

export default isAuth(HCREditMainPage)
