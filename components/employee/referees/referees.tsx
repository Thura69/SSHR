import useCandidateStore from '@/state/zustand/candidate'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { UseRefereesColumns } from './referees-dnd-columndef'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '../forms/data-table-employee'
import { DataDndTable } from '../forms/rows-drag-and-drop'
import EmployeeModal from '../forms/employee-modal'
import CareerForm from '../career/career-form'
import RefereesForm from './referees-form'

const modifiedData = [
    {
        id: 1,
        name: 'Daniel Alves',
        position: 'UI/UX Designer',
        companyName: 'Smilax Global',
        phoneNo: '09111111111',
        email: 'someone@gmail.com',
    },
    {
        id: 2,
        name: 'Daniel Alves',
        position: 'UI/UX Designer',
        companyName: 'Smilax Global',
        phoneNo: '09111111111',
        email: 'someone@gmail.com',
    },
    {
        id: 3,
        name: 'Daniel Alves',
        position: 'UI/UX Designer',
        companyName: 'Smilax Global',
        phoneNo: '09111111111',
        email: 'someone@gmail.com',
    },
    {
        id: 4,
        name: 'Daniel Alves',
        position: 'UI/UX Designer',
        companyName: 'Smilax Global',
        phoneNo: '09111111111',
        email: 'someone@gmail.com',
    },
]

type RefereesType = {
    handleSave?: any
    isControled?: boolean
    details?: boolean
}

export const Referees: React.FC<RefereesType> = ({
    handleSave,
    isControled,
    details,
}) => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('referees')
    const [data, setData] = useState(modifiedData)
    const { referees } = useCandidateStore((state) => state)
    const columns = UseRefereesColumns()

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={details ? false : true}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="referees"
            />

            {details ? (
                <DataTable
                    isSort={true}
                    className={' with-action-details-col'}
                    detail={details}
                    columns={columns}
                    loading={false}
                    setData={setData}
                    data={isControled ? referees || [] : modifiedData || []}
                />
            ) : (
                <DataDndTable
                    className={'with-action-employee-column'}
                    columns={columns}
                    loading={false}
                    setData={setData}
                    data={isControled ? referees || [] : data || []}
                />
            )}
            <EmployeeModal
                title={`${t('addReferees')}`}
                modelRatio=" "
                editMode={false}
                open={value}
                toggle={toggle}
                form={
                    <RefereesForm isControled={isControled} toggle={toggle} />
                }
            />
        </section>
    )
}
