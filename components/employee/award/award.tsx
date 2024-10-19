import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '../forms/data-table-employee'
import { columns } from './award-columndef'
import EmployeeModal from '../forms/employee-modal'
import AwardForm from './award-form'

const modifiedData = [
    {
        id: 1,
        department: 'Software Development',
        position: 'UI/UX Designer',
        date: '12/08/2024',
        nameOfaward: 'Best Performance',
    },
    {
        id: 2,
        department: 'Software Development',
        position: 'UI/UX Designer',
        date: '12/08/2024',
        nameOfaward: 'Best Performance',
    },
    {
        id: 3,
        department: 'Software Development',
        position: 'UI/UX Designer',
        date: '12/08/2024',
        nameOfaward: 'Best Performance',
    },
    {
        id: 4,
        department: 'Software Development',
        position: 'UI/UX Designer',
        date: '12/08/2024',
        nameOfaward: 'Best Performance',
    },
]

const Award = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('award')

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={true!}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="award"
            />
            <DataTable
                isSort
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                data={modifiedData || []}
            />
            <EmployeeModal
                title={`${t('addAward')}`}
                modelRatio="  min-h-[400px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<AwardForm toggle={toggle} />}
            />
        </section>
    )
}

export default Award
