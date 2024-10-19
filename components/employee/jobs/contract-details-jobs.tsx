import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { DataTable } from '../forms/data-table-employee'
import { columns } from './contract-details-columndef'
import EmployeeModal from '../forms/employee-modal'
import ContractDetailsForm from './contract-details-form'

const modifiedData = [
    {
        id: 1,
        ecNumber: 'Data',
        type: 'Data',
        contractPeriod: '12/05/2024 - 12/04/2028',
    },
    {
        id: 2,
        ecNumber: 'Data',
        type: 'Data',
        contractPeriod: '12/05/2024 - 12/04/2028',
    },
    {
        id: 3,
        ecNumber: 'Data',
        type: 'Data',
        contractPeriod: '12/05/2024 - 12/04/2028',
    },
    {
        id: 4,
        ecNumber: 'Data',
        type: 'Data',
        contractPeriod: '12/05/2024 - 12/04/2028',
    },
    {
        id: 5,
        ecNumber: 'Data',
        type: 'Data',
        contractPeriod: '12/05/2024 - 12/04/2028',
    },
    {
        id: 6,
        ecNumber: 'Data',
        type: 'Data',
        contractPeriod: '12/05/2024 - 12/04/2028',
    },
]

const ContractDetails = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('contractDetailJobs')

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={true}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="contractDetailJobs"
            />
            <DataTable
                className={'with-action-employee-column'}
                columns={columns}
                isSort
                loading={false}
                data={ modifiedData || []}
            />
            <EmployeeModal title={`${t('addContractDetails')}`} modelRatio='' editMode={false} open={value} toggle={toggle} form={<ContractDetailsForm  toggle={toggle}/>}/>
        </section>
    )
}

export default ContractDetails
