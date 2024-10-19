'use client'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '../forms/data-table-employee'
import { columns } from './biometric-columndef'
import EmployeeModal from '../forms/employee-modal'
import BiometricForm from './biometric-form'

const Biometric = () => {
    const {} = useBoolean(false)
    const { t } = useTranslation('biometric')
    const { value, toggle, setTrue } = useBoolean(false)

    const modifiedData = [
        {
            id: 1,
            terminal: 'Office Front Entrance',
            taNumber: '123456',
        },
        {
            id: 2,
            terminal: 'Office Front Entrance',
            taNumber: '123456',
        },
        {
            id: 3,
            terminal: 'Office Front Entrance',
            taNumber: '123456',
        },
        {
            id: 4,
            terminal: 'Office Front Entrance',
            taNumber: '123456',
        },
        {
            id: 5,
            terminal: 'Office Front Entrance',
            taNumber: '123456',
        },
        {
            id: 6,
            terminal: 'Office Front Entrance',
            taNumber: '123456',
        },
    ]

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={true!}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="biometric"
            />
            <DataTable
                isSort
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                data={modifiedData || []}
            />
            <EmployeeModal
                title={`${t('addBiometric')}`}
                modelRatio="min-h-[345px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<BiometricForm toggle={toggle} />}
            />
        </section>
    )
}

export default Biometric
