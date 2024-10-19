import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '../forms/data-table-employee'
import { columns } from './vaccine-columndef'
import EmployeeModal from '../forms/employee-modal'
import VaccineForm from './vaccine-form'


const modifiedData = [
    {
        id: 1,
        type: 'Data',
        vaccine: 'Date',
        date: '12/08/2024',
        dose: 'Data',
        status: 'Date',
        proof: 'Yes',
    },
    {
        id: 2,
        type: 'Data',
        vaccine: 'Date',
        date: '12/08/2024',
        dose: 'Data',
        status: 'Date',
        proof: 'Yes',
    },
    {
        id: 3,
        type: 'Data',
        vaccine: 'Date',
        date: '12/08/2024',
        dose: 'Data',
        status: 'Date',
        proof: 'Yes',
    },
    {
        id: 4,
        type: 'Data',
        vaccine: 'Date',
        date: '12/08/2024',
        dose: 'Data',
        status: 'Date',
        proof: 'Yes',
    },
    {
        id: 5,
        type: 'Data',
        vaccine: 'Date',
        date: '12/08/2024',
        dose: 'Data',
        status: 'Date',
        proof: 'Yes',
    },

]

const VaccineEmployee = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('vaccineEmployee')

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={true!}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="vaccineEmployee"
            />
            <DataTable
                isSort
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                data={modifiedData || []}
            />
              <EmployeeModal
                title={`${t('addVaccine')}`}
                modelRatio='  min-h-[400px]'
                editMode={false}
                open={value}
                toggle={toggle}
                form={<VaccineForm  toggle={toggle} />}
            />
        </section>
    )
}

export default VaccineEmployee
