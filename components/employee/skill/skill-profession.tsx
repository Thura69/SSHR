import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '../forms/data-table-employee'
import { UseSkillProfessionColumns } from './skill-column-def'
import EmployeeModal from '../forms/employee-modal'
import SkillForm from './skillform'
import React from 'react'
import useCandidateStore from '@/state/zustand/candidate'
import { cn } from '@/lib/utils'

const modifiedData = [
    {
        id: 1,
        skill: 'Skill Name',
        rank: '1',
        remark: 'Sentence for remark',
    },
    {
        id: 2,
        skill: 'Skill Name',
        rank: '42',
        remark: 'Sentence for remark',
    },
    {
        id: 3,
        skill: 'Skill Name',
        rank: '44',
        remark: 'Sentence for remark',
    },
    {
        id: 4,
        skill: 'Skill Name',
        rank: '4',
        remark: 'Sentence for remark',
    },
    {
        id: 5,
        skill: 'Skill Name',
        rank: '4',
        remark: 'Sentence for remark',
    },
    {
        id: 6,
        skill: 'Skill Name',
        rank: '4',
        remark: 'Sentence for remark',
    },
]

type LanguageProfessType = {
    handleSave?: any
    isControled?: boolean
    details?: boolean
}

const SkillProfess: React.FC<LanguageProfessType> = ({
    handleSave,
    isControled,
    details,
}) => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('skill')
    const { skillProfess } = useCandidateStore((state) => state)
    const columns = UseSkillProfessionColumns()

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={details ? false : true}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="skill"
            />

            <DataTable
                className={cn(
                    !details && 'with-action-employee-column',
                    details && '    with-action-details-col',
                )}
                detail={details}
                columns={columns}
                loading={false}
                isSort={true}
                data={isControled ? skillProfess || [] : modifiedData || []}
            />
            <EmployeeModal
                title={`${t('add')}`}
                modelRatio="  min-h-[400px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<SkillForm isControled={isControled} toggle={toggle} />}
            />
        </section>
    )
}

export default SkillProfess
