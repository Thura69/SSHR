'use client'
import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { DataTable } from '../forms/data-table-employee'
import { columns } from './hrconcern-column-def'
import HrConcernForm from './hrconcern-form'
import EmployeeModal from '../forms/employee-modal'

const modifiedData = [
    {
        id: 1,
        date: '12/02/2021',
        note: 'Lorem ipsum dolor sit amet consectetur.',
        writtenBy: 'Malone',
    },
    {
        id: 2,
        date: '12/02/2021',
        note: 'Lorem ipsum dolor sit amet consectetur.',
        writtenBy: 'Malone',
    },
    {
        id: 3,
        date: '12/02/2021',
        note: 'Lorem ipsum dolor sit amet consectetur.',
        writtenBy: 'Malone',
    },
    {
        id: 4,
        date: '12/02/2021',
        note: 'Lorem ipsum dolor sit amet consectetur.',
        writtenBy: 'Malone',
    },
    {
        id: 5,
        date: '12/02/2021',
        note: 'Lorem ipsum dolor sit amet consectetur.',
        writtenBy: 'Malone',
    },
]

const HrConcern = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('hrConcern')

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={true!}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="hrConcern"
            />
            <DataTable
                isSort
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                data={modifiedData || []}
            />
            <EmployeeModal
                title={`${t('addHr')}`}
                modelRatio="  min-h-[400px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<HrConcernForm toggle={toggle} />}
            />
        </section>
    )
}

export default HrConcern
