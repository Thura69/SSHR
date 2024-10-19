'use client'
import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { useState } from 'react'
import { columns } from './column-def'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import HiringForm from './form'
import Paging from '@/components/common/pagers/pagination-v4'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'

const modifiedData = [
    {
        id: 1,
        name: 'Aung Aung',
        hiringRole: 'Hiring Manager',
        interExter: 'Internal',
        status: true,
    },
    {
        id: 2,
        name: 'Su Yee',
        hiringRole: 'Interviewer',
        interExter: 'External',
        status: true,
    },
    {
        id: 3,
        name: 'Thinzar',
        hiringRole: 'Phone Screening Interviewer',
        interExter: 'External',
        status: true,
    },
    {
        id: 4,
        name: 'Kyaw Zin',
        hiringRole: 'Hiring Manager',
        interExter: 'Internal',
        status: true,
    },
    {
        id: 5,
        name: 'Myint Myat',
        hiringRole: 'Phone Screening Interviewer',
        interExter: 'Internal',
        status: true,
    },
    {
        id: 6,
        name: 'Myint Myat',
        hiringRole: 'Phone Screening Interviewer',
        interExter: 'Internal',
        status: true,
    },
    {
        id: 7,
        name: 'Myint Myat',
        hiringRole: 'Phone Screening Interviewer',
        interExter: 'Internal',
        status: true,
    },
    {
        id: 8,
        name: 'Myint Myat',
        hiringRole: 'Phone Screening Interviewer',
        interExter: 'Internal',
        status: true,
    },
]

const MainPage = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('hiringManager')
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
                        title: 'Hiring Manager',
                        href: '/hiring-manager',
                    },
                ]}
            />  
            <TableFrame
                isOutline
                isWrite
                subTitle={false}
                modalTrue={() => setTrue()}
                language="hiringManager"
            />
            <DataTable
                className={'with-action-employee-column'}
                data={modifiedData || []}
                height=""
                setData={setData}
                columns={columns}
                loading={false}
            />
            <Paging currentPage={1} perPage={10} totalCount={30} />
            <EmployeeModal
                title={`${t('add')}`}
                modelRatio="  min-h-[400px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<HiringForm toggle={toggle} />}
            />
        </section>
    )
}

export default MainPage
