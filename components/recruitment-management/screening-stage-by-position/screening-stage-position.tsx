'use client'
import TableFrame from '@/components/common/table/table-frame'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { DataTable } from '@/components/employee/forms/data-table-employee'
import { columns } from './screening-stage-position-columndef'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import ScreenStagePositionForm from './screening-stage-position-form'
import Paging from '@/components/common/pagers/pagination-v4'

const modifiedData = [
    {
        id: 1,
        position: 'Senior Accountant',
        status: true,
    },
    {
        id: 2,
        position: 'Product Owner',
        status: false,
    },
    {
        id: 3,
        position: 'Senior Accountant',
        status: true,
    },
    {
        id: 4,
        position: 'Senior Accountant',
        status: false,
    },
    {
        id: 5,
        position: 'Senior Accountant',
        status: false,
    },
]

const ScreeningStagePositionMain = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('screeningStageByPosition')

    return (
        <section className="w-full p-4 px-6">
            <TableFrame
                isOutline
                isWrite
                subTitle={false}
                modalTrue={() => setTrue()}
                language="screeningStageByPosition"
            />
            <DataTable
                className={'with-action-employee-column'}
                data={modifiedData || []}
                columns={columns}
                loading={false}
            />
 
           <Paging currentPage={1} perPage={10} totalCount={30} />
            <EmployeeModal
                title={`${t('add')}`}
                modelRatio="w-[700px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<ScreenStagePositionForm toggle={toggle} />}
            />
        </section>
    )
}

export default ScreeningStagePositionMain
