'use client'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import React from 'react'
import { useBoolean } from 'usehooks-ts'
import { columns } from './column-def'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { SkillSetByPositionForm } from './skill-set-by-position-form'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import Paging from '@/components/common/pagers/pagination-v4'

const modifiedData = [
    {
        id: 1,
        position: 'Senior Account',
        status: false,
    },
    {
        id: 2,
        position: 'Senior Account',
        status: true,
    },
    {
        id: 3,
        position: 'Senior Account',
        status: false,
    },
    {
        id: 4,
        position: 'Senior Account',
        status: true,
    },
    {
        id: 5,
        position: 'Senior Account',
        status: false,
    },
]

const MainPage = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('skillSetByPosition')

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
                        title: 'Skill Set by Position',
                        href: '/skill-sets',
                    },
                ]}
            />
            <TableFrame
                isOutline
                isWrite
                subTitle={false}
                modalTrue={() => setTrue()}
                language="skillSetByPosition"
            />
            <DataTable
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                data={modifiedData || []}
            />
            <Paging currentPage={1} perPage={10} totalCount={30} />
            <EmployeeModal
                title={`${t('add')}`}
                modelRatio="  min-h-[400px] p-2 md:p-8 py-5 w-[650px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<SkillSetByPositionForm toggle={toggle} />}
            />
        </section>
    )
}

export default MainPage
