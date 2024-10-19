import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { DataTable } from '../forms/data-table-employee'
import { columns } from './jobhistory-details-columndef'
import EmployeeModal from '../forms/employee-modal'
import ContractDetailsForm from './contract-details-form'
import JobHistoryForm from './jobhistory-detail-form'

const modifiedData = [
    {
        id: 1,
        position: 'Junior UI/UX Designer',
        positionStartDate: '12/05/2024',
        positionEndDate: '12/04/2028',
        department: 'Product Development',
        salary: '5000',
    },
    {
        id: 2,
        position: 'Junior UI/UX Designer',
        positionStartDate: '12/05/2024',
        positionEndDate: '12/04/2028',
        department: 'Product Development',
        salary: '5000',
    },
    {
        id: 3,
        position: 'Junior UI/UX Designer',
        positionStartDate: '12/05/2024',
        positionEndDate: '12/04/2028',
        department: 'Product Development',
        salary: '5000',
    },
    {
        id: 4,
        position: 'Junior UI/UX Designer',
        positionStartDate: '12/05/2024',
        positionEndDate: '12/04/2028',
        department: 'Product Development',
        salary: '5000',
    },
    {
        id: 5,
        position: 'Junior UI/UX Designer',
        positionStartDate: '12/05/2024',
        positionEndDate: '12/04/2028',
        department: 'Product Development',
        salary: '5000',
    },
]

const JobHistoryDetails = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('jobHistoryJobs')

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={true}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="jobHistoryJobs"
            />
            <DataTable
                isSort
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                data={modifiedData || []}
            />
            <EmployeeModal
                title={`${t('addJobHistory')}`}
                modelRatio=""
                editMode={false}
                open={value}
                toggle={toggle}
                form={<JobHistoryForm toggle={toggle} />}
            />
        </section>
    )
}

export default JobHistoryDetails
