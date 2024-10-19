'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import { columns } from './column-def'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination-v4'
import { useRouter } from 'next/navigation'
import TableFrameFilter from '@/components/common/table/table-frame-filter'
import HeadCountFilter from '../head-count-request/head-count-requisition-filter'
import isAuth from '@/components/auth/components/protected-route'
import HeadCountApprovalFilter from './head-count-approval-filter'
import HeadCountColorLegend from '../head-count-color-legend'
const exampleData = [
    {
        head_count_request_id: 1,
        position_id: 2,
        no_of_position: 5,
        company_id: 1,
        location_id: 1,
        branch_id: 1,
        department_id: 1,
        section_id: 1,
        job_location: 'remote',
        job_type_id: 1,
        additional_hard_skill_set: ['JavaScript', 'React'],
        additional_soft_skill_set: ['Communication', 'Teamwork'],
        urgency_level: 'low',
        target_onboarding_date: '2024-09-01T00:00:00Z',
        reason: 'Expansion',
        status: 'Accepted',
        created_date: '2024-07-22T00:00:00Z',
        edited_date: '2024-07-23T00:00:00Z',
        created_by: 1001,
        edited_by: 1002,
        tenant_id: 1,
        tbl_company: {
            Company_ID: 1,
            Company_Name: 'Tech Solutions',
        },
        tbl_section: {
            Section_ID: 1,
            Section_Name: 'Development',
        },
        tbl_department: {
            Department_ID: 1,
            Department_Name: 'Engineering',
        },
        tbl_branch: {
            Branch_ID: 1,
            Branch_Name: 'Headquarters',
        },
        tbl_location: {
            Location_ID: 1,
            Location_Name: 'New York',
        },
        tbl_position: {
            position_id: 2,
            position_name: 'Software Developer',
        },
        tbl_job_type: {
            job_type_id: 1,
            job_type_name: 'Full-Time',
        },
        tbl_head_count_approval: [
            {
                head_count_approval_id: 1,
                head_count_request_id: 1,
                position_id: 2,
                department_id: 1,
                branch_id: 1,
                company_id: 1,
                location_id: 1,
                employee_id: 2001,
                status: 'Accepted',
                approved_date: '2024-07-24T00:00:00Z',
                tbl_head_count_request: 1,
                approve_reason: 'Qualified candidate found',
                deny_reason: '',
                no_of_accepeted_position: 3,
                order: 1,
                tbl_company: {
                    Company_ID: 1,
                    Company_Name: 'Tech Solutions',
                },
                tbl_department: {
                    Department_ID: 1,
                    Department_Name: 'Engineering',
                },
                tbl_branch: {
                    Branch_ID: 1,
                    Branch_Name: 'Headquarters',
                },
                tbl_location: {
                    Location_ID: 1,
                    Location_Name: 'New York',
                },
                tbl_position: {
                    position_id: 2,
                    position_name: 'Software Developer',
                },
                tbl_employee: {
                    employee_id: 2001,
                    employee_name: 'John Doe',
                },
                tbl_tenant: {
                    tenant_id: 1,
                    tenant_name: 'Global Corp',
                },
            },
        ],
        approvers: [
            {
                approver_name: 'Jane Smith',
                approve_reason: 'Qualified candidate found',
                deny_reason: '',
                status: 'Accepted',
                order: 1,
                branch_name: 'Headquarters',
                company_name: 'Tech Solutions',
                department_name: 'Engineering',
                position_name: 'Software Developer',
                section_name: 'Development',
                location_name: 'New York',
                employee_no: 'E001',
                is_active: true,
                photo: 'jane_smith.jpg',
                no_of_accepeted_position: 3,
            },
        ],
    },
    {
        head_count_request_id: 2,
        position_id: 2,
        no_of_position: 3,
        company_id: 1,
        location_id: 1,
        branch_id: 1,
        department_id: 1,
        section_id: 1,
        job_location: 'onsite',
        job_type_id: 1,
        additional_hard_skill_set: ['JavaScript', 'React'],
        additional_soft_skill_set: ['Communication', 'Teamwork'],
        urgency_level: 'critical',
        target_onboarding_date: '2024-09-01T00:00:00Z',
        reason: 'Expansion',
        status: 'Denied',
        created_date: '2024-07-22T00:00:00Z',
        edited_date: '2024-07-23T00:00:00Z',
        created_by: 1001,
        edited_by: 1002,
        tenant_id: 1,
        tbl_section: {
            Section_ID: 1,
            Section_Name: 'Development',
        },
        tbl_company: {
            Company_ID: 1,
            Company_Name: 'Tech Solutions',
        },
        tbl_department: {
            Department_ID: 1,
            Department_Name: 'Engineering',
        },
        tbl_branch: {
            Branch_ID: 1,
            Branch_Name: 'Headquarters',
        },
        tbl_location: {
            Location_ID: 1,
            Location_Name: 'New York',
        },
        tbl_position: {
            position_id: 2,
            position_name: 'Software Developer',
        },
        tbl_job_type: {
            job_type_id: 1,
            job_type_name: 'Full-Time',
        },
        tbl_head_count_approval: [
            {
                head_count_approval_id: 1,
                head_count_request_id: 2,
                position_id: 2,
                department_id: 1,
                branch_id: 1,
                company_id: 1,
                location_id: 1,
                employee_id: 2001,
                status: 'Accepted',
                approved_date: '2024-07-24T00:00:00Z',
                tbl_head_count_request: 1,
                approve_reason: 'Qualified candidate found',
                deny_reason: '',
                no_of_accepeted_position: 3,
                order: 1,
                tbl_company: {
                    Company_ID: 1,
                    Company_Name: 'Tech Solutions',
                },
                tbl_department: {
                    Department_ID: 1,
                    Department_Name: 'Engineering',
                },
                tbl_branch: {
                    Branch_ID: 1,
                    Branch_Name: 'Headquarters',
                },
                tbl_location: {
                    Location_ID: 1,
                    Location_Name: 'New York',
                },
                tbl_position: {
                    position_id: 2,
                    position_name: 'Software Developer',
                },
                tbl_employee: {
                    employee_id: 2001,
                    employee_name: 'John Doe',
                },
                tbl_tenant: {
                    tenant_id: 1,
                    tenant_name: 'Global Corp',
                },
            },
        ],
        approvers: [
            {
                approver_name: 'Jane Smith',
                approve_reason: 'Qualified candidate found',
                deny_reason: '',
                status: 'Accepted',
                order: 1,
                branch_name: 'Headquarters',
                company_name: 'Tech Solutions',
                department_name: 'Engineering',
                position_name: 'Software Developer',
                section_name: 'Development',
                location_name: 'New York',
                employee_no: 'E001',
                is_active: true,
                photo: 'jane_smith.jpg',
                no_of_accepeted_position: 3,
            },
        ],
    },
    {
        head_count_request_id: 3,
        position_id: 2,
        no_of_position: 3,
        company_id: 1,
        location_id: 1,
        branch_id: 1,
        department_id: 1,
        section_id: 1,
        job_location: 'any',
        job_type_id: 1,
        additional_hard_skill_set: ['JavaScript', 'React'],
        additional_soft_skill_set: ['Communication', 'Teamwork'],
        urgency_level: 'medium',
        target_onboarding_date: '2024-09-01T00:00:00Z',
        reason: 'Expansion',
        status: 'WaitingApproval',
        created_date: '2024-07-22T00:00:00Z',
        edited_date: '2024-07-23T00:00:00Z',
        created_by: 1001,
        edited_by: 1002,
        tenant_id: 1,
        tbl_section: {
            Section_ID: 1,
            Section_Name: 'Development',
        },
        tbl_company: {
            Company_ID: 1,
            Company_Name: 'Tech Solutions',
        },
        tbl_department: {
            Department_ID: 1,
            Department_Name: 'Engineering',
        },
        tbl_branch: {
            Branch_ID: 1,
            Branch_Name: 'Headquarters',
        },
        tbl_location: {
            Location_ID: 1,
            Location_Name: 'New York',
        },
        tbl_position: {
            position_id: 2,
            position_name: 'Software Developer',
        },
        tbl_job_type: {
            job_type_id: 1,
            job_type_name: 'Full-Time',
        },
        tbl_head_count_approval: [
            {
                head_count_approval_id: 1,
                head_count_request_id: 3,
                position_id: 2,
                department_id: 1,
                branch_id: 1,
                company_id: 1,
                location_id: 1,
                employee_id: 2001,
                status: 'Accepted',
                approved_date: '2024-07-24T00:00:00Z',
                tbl_head_count_request: 1,
                approve_reason: 'Qualified candidate found',
                deny_reason: '',
                no_of_accepeted_position: 3,
                order: 1,
                tbl_company: {
                    Company_ID: 1,
                    Company_Name: 'Tech Solutions',
                },
                tbl_department: {
                    Department_ID: 1,
                    Department_Name: 'Engineering',
                },
                tbl_branch: {
                    Branch_ID: 1,
                    Branch_Name: 'Headquarters',
                },
                tbl_location: {
                    Location_ID: 1,
                    Location_Name: 'New York',
                },
                tbl_position: {
                    position_id: 2,
                    position_name: 'Software Developer',
                },
                tbl_employee: {
                    employee_id: 2001,
                    employee_name: 'John Doe',
                },
                tbl_tenant: {
                    tenant_id: 1,
                    tenant_name: 'Global Corp',
                },
            },
        ],
        approvers: [
            {
                approver_name: 'Jane Smith',
                approve_reason: 'Qualified candidate found',
                deny_reason: '',
                status: 'Accepted',
                order: 1,
                branch_name: 'Headquarters',
                company_name: 'Tech Solutions',
                department_name: 'Engineering',
                position_name: 'Software Developer',
                section_name: 'Development',
                location_name: 'New York',
                employee_no: 'E001',
                is_active: true,
                photo: 'jane_smith.jpg',
                no_of_accepeted_position: 3,
            },
        ],
    },
    {
        head_count_request_id: 1,
        position_id: 2,
        no_of_position: 3,
        company_id: 1,
        location_id: 1,
        branch_id: 1,
        department_id: 1,
        section_id: 1,
        job_location: 'any',
        job_type_id: 1,
        additional_hard_skill_set: ['JavaScript', 'React'],
        additional_soft_skill_set: ['Communication', 'Teamwork'],
        urgency_level: 'high',
        target_onboarding_date: '2024-09-01T00:00:00Z',
        reason: 'Expansion',
        status: 'WaitingApproval',
        created_date: '2024-07-22T00:00:00Z',
        edited_date: '2024-07-23T00:00:00Z',
        created_by: 1001,
        edited_by: 1002,
        tenant_id: 1,
        tbl_company: {
            Company_ID: 1,
            Company_Name: 'Tech Solutions',
        },
        tbl_section: {
            Section_ID: 1,
            Section_Name: 'Development',
        },
        tbl_department: {
            Department_ID: 1,
            Department_Name: 'Engineering',
        },
        tbl_branch: {
            Branch_ID: 1,
            Branch_Name: 'Headquarters',
        },
        tbl_location: {
            Location_ID: 1,
            Location_Name: 'New York',
        },
        tbl_position: {
            position_id: 2,
            position_name: 'Software Developer',
        },
        tbl_job_type: {
            job_type_id: 1,
            job_type_name: 'Full-Time',
        },
        tbl_head_count_approval: [
            {
                head_count_approval_id: 1,
                head_count_request_id: 1,
                position_id: 2,
                department_id: 1,
                branch_id: 1,
                company_id: 1,
                location_id: 1,
                employee_id: 2001,
                status: 'Accepted',
                approved_date: '2024-07-24T00:00:00Z',
                tbl_head_count_request: 1,
                approve_reason: 'Qualified candidate found',
                deny_reason: '',
                no_of_accepeted_position: 3,
                order: 1,
                tbl_company: {
                    Company_ID: 1,
                    Company_Name: 'Tech Solutions',
                },
                tbl_department: {
                    Department_ID: 1,
                    Department_Name: 'Engineering',
                },
                tbl_branch: {
                    Branch_ID: 1,
                    Branch_Name: 'Headquarters',
                },
                tbl_location: {
                    Location_ID: 1,
                    Location_Name: 'New York',
                },
                tbl_position: {
                    position_id: 2,
                    position_name: 'Software Developer',
                },
                tbl_employee: {
                    employee_id: 2001,
                    employee_name: 'John Doe',
                },
                tbl_tenant: {
                    tenant_id: 1,
                    tenant_name: 'Global Corp',
                },
            },
        ],
        approvers: [
            {
                approver_name: 'Jane Smith',
                approve_reason: 'Qualified candidate found',
                deny_reason: '',
                status: 'Accepted',
                order: 1,
                branch_name: 'Headquarters',
                company_name: 'Tech Solutions',
                department_name: 'Engineering',
                position_name: 'Software Developer',
                section_name: 'Development',
                location_name: 'New York',
                employee_no: 'E001',
                is_active: true,
                photo: 'jane_smith.jpg',
                no_of_accepeted_position: 3,
            },
        ],
    },
]

const MainPage = () => {
    const { t } = useTranslation('headCountApproval')
    const [data, setData] = useState(exampleData)
    const router = useRouter()
    const [open, setOpen] = useState('close')
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
                        title: 'Head Count Approval',
                        href: '',
                    },
                ]}
            />
            <TableFrameFilter
                isWrite={false}
                isOutline
                subTitle={false}
                modalTrue={handleClick}
                language="headCountApproval"
                setOpen={setOpen}
                open={open}
            />
            <HeadCountApprovalFilter open={open} setOpen={setOpen} />
            <HeadCountColorLegend language="headCountApproval" />
            <DataTable
                className={'with-action-employee-column'}
                data={data || []}
                height=""
                setData={setData}
                columns={columns}
                loading={false}
            />
            <Paging currentPage={1} perPage={8} totalCount={80} />
        </section>
    )
}

export default isAuth(MainPage)
