'use client'

import React, { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'
import TableFrame from '@/components/common/table/table-frame'
import { columns } from './column-def'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import Paging from '@/components/common/pagers/pagination-v4'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import SearchAbleTable from '@/components/common/form/fields/searchable-table'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'

const modifiedData = [
    {
        id: 1,
        position: 'Accountant',
        screeningStage: 'First Interview',
        questionCount: 10,
        status: true,
    },
    {
        id: 2,
        position: 'General Manager',
        screeningStage: 'First Interview',
        questionCount: 10,
        status: true,
    },
    {
        id: 3,
        position: 'Senior Developer',
        screeningStage: 'Second Interview',
        questionCount: 10,
        status: false,
    },
    {
        id: 4,
        position: 'QA and Tester',
        screeningStage: 'First Interview',
        questionCount: 10,
        status: true,
    },
    {
        id: 5,
        position: 'Finance Manager',
        screeningStage: 'First Interview',
        questionCount: 10,
        status: true,
    },
]

const MainPage = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('interviewQuestionGroup')
    const [data, setData] = useState(modifiedData)

    return (
        <section className="w-full p-4 px-6">
             <Breadcrumbs
                segments={[
                    {
                        title: 'Recruitment',
                        href: `/recruitment`,
                    },
                    {
                        // @ts-ignore
                        title: 'Interview Question Group',
                        href: '/interview-question-group',
                    },
                ]}
            />
            <TableFrame
                isOutline
                isWrite
                subTitle={false}
                modalTrue={() => setTrue()}
                language={'interviewQuestionGroup'}
            />
            <DataTable
                className={'with-action-employee-column'}
                data={data || []}
                height=""
                setData={setData}
                columns={columns}
                loading={false}
            />
            <Paging currentPage={1} perPage={8} totalCount={80} />
            {/* <EmployeeModal
                title={`${t('add')}`}
                modelRatio="  min-h-[400px] lg:w-[700px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<InterviewQuestionPoolForm toggle={toggle} />}
            /> */}
       
        </section>
    )
}

export default MainPage
