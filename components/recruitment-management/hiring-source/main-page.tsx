'use client'

import TableFrame from '@/components/common/table/table-frame'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import { columns } from './column-def'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import HiringSourceForm from './form'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination-v4'

const modifiedData = [
    {
        id: 1,
        name: 'Data Analysis',
        source: 'Hard Skill',
        otherServices: true,
        status: true,
    },
    {
        id: 2,
        name: 'Project Management',
        source: 'Hard Skill',
        otherServices: true,
        status: true,
    },
    {
        id: 3,
        name: 'Marketing',
        source: 'Hard Skill',
        otherServices: false,
        status: true,
    },
    {
        id: 4,
        name: 'Social Skills',
        source: 'Soft Skill',
        otherServices: false,
        status: true,
    },
    {
        id: 5,
        name: 'Social Skills',
        source: 'Soft Skill',
        otherServices: false,
        status: true,
    },
]

const MainPage = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('hiringSource')
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
                        title: 'Hiring Source',
                        href: '/skill-sets',
                    },
                ]}
            />
            <TableFrame
                isOutline
                isWrite
                subTitle={false}
                modalTrue={() => setTrue()}
                language={'hiringSource'}
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
            <EmployeeModal
                title={`${t('add')}`}
                modelRatio="  min-h-[400px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<HiringSourceForm toggle={toggle} />}
            />
        </section>
    )
}

export default MainPage
