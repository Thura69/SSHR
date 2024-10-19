'use client'
import { useBoolean } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'
import TableFrame from '@/components/common/table/table-frame'
import { DataDndTable } from '../forms/rows-drag-and-drop'

import EducationForm from './education-form'
import EmployeeModal from '../forms/employee-modal'
import { useState } from 'react'
import useCandidateStore from '@/state/zustand/candidate'
import { UseEducationColumns } from './education-columndef'
import { DataTable } from '../forms/data-table-employee'

const modifiedData = [
    {
        id: 1,
        instituteName: 'University of One',
        degree: 'Bachelor',
        speciaisation: 'Specialisation',
        gpa: '4.5',
    },
    {
        id: 2,
        instituteName: 'University of Two',
        degree: 'Bachelor',
        speciaisation: 'Specialisation',
        gpa: '4.5',
    },
    {
        id: 3,
        instituteName: 'University of Three',
        degree: 'Bachelor',
        speciaisation: 'Specialisation',
        gpa: '4.5',
    },
    {
        id: 4,
        instituteName: 'University of Four',
        degree: 'Bachelor',
        speciaisation: 'Specialisation',
        gpa: '4.5',
    },
    {
        id: 5,
        instituteName: 'University of Five',
        degree: 'Bachelor',
        speciaisation: 'Specialisation',
        gpa: '4.5',
    },
    {
        id: 6,
        instituteName: 'University of Six',
        degree: 'Bachelor',
        speciaisation: 'Specialisation',
        gpa: '4.5',
    },
]

type EducatioProfessTypes = {
    handleSave?: any
    isControled?: boolean
    details?: boolean
}

const EducatioProfess: React.FC<EducatioProfessTypes> = ({
    handleSave,
    isControled,
    details = false,
}) => {
    const { value, toggle, setTrue } = useBoolean(false)
    const [data, setData] = useState(modifiedData)
    const { education } = useCandidateStore((state) => state)
    const columns = UseEducationColumns()

    const { t } = useTranslation('education')

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={details ? false : true}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="education"
            />
            {details ? (
                <DataTable
                    isSort={true}
                    detail={details}
                    className={'with-action-details-col'}
                    columns={columns}
                    loading={false}
                    setData={setData}
                    data={isControled ? education || [] : modifiedData || []}
                />
            ) : (
                <DataDndTable
                    className={'with-action-employee-column'}
                    columns={columns}
                    loading={false}
                    setData={setData}
                    data={isControled ? education || [] : modifiedData || []}
                />
            )}

            <EmployeeModal
                title={`${t('addEducation')}`}
                modelRatio="w-[100svw] lg:w-[650px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={
                    <EducationForm isControled={isControled} toggle={toggle} />
                }
            />
        </section>
    )
}

export default EducatioProfess
