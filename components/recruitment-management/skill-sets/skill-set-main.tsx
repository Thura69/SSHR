'use client'

import { useBoolean } from 'usehooks-ts'
import { columns } from './skill-set-columndef'
import SkillSetForm from './skill-set-form'
import { useTranslation } from 'react-i18next'

import EmployeeModal from '@/components/employee/forms/employee-modal'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'

const modifiedData = [
    {
        id: 1,
        name: 'Data Analysis',
        type: 'Hard Skill',
        active: false,
    },
    {
        id: 2,
        name: 'Project Management',
        type: 'Hard Skill',
        active: true,
    },
    {
        id: 3,
        name: 'Marketing',
        type: 'Hard Skill',
        active: false,
    },
    {
        id: 4,
        name: 'Social Skills',
        type: 'Hard Skill',
        active: true,
    },
    {
        id: 5,
        name: 'Motivation',
        type: 'Hard Skill',
        active: true,
    },
]

const SkillSetMainPage = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('skillSet')

    return (
        <section className="w-full p-4 px-6 ">
            <Breadcrumbs
                segments={[
                    {
                        title: 'Recruitment',
                        href: `/recruitment`,
                    },
                    {
                        // @ts-ignore
                        title: 'Skill Sets',
                        href: '/skill-sets',
                    },
                ]}
            />

            <TableFrame
                isOutline
                isWrite
                subTitle={false}
                modalTrue={() => setTrue()}
                language="skillSet"
            />
            <DataTable
                className={'with-action-employee-column'}
                data={modifiedData || []}
                columns={columns}
                loading={false}
            />
            <EmployeeModal
                title={`${t('add')}`}
                modelRatio=""
                editMode={false}
                open={value}
                toggle={toggle}
                form={<SkillSetForm toggle={toggle} />}
            />
        </section>
    )
}

export default SkillSetMainPage
