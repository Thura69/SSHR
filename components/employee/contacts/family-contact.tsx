'use client'

import TableTitle from '@/components/common/form/table-title'
import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { columns } from './family-columndef'
import EmployeeModal from '../forms/employee-modal'
import { DataTable } from '../forms/data-table-employee'
import FamilyForm from './family-form'

const modifiedData = [
    {
        id:1,
        name: 'Leo Dokidis',
        relationShip: 'Employee',
        phoneNo: '09265577722',
        taxExemption: 'yes',
        transferInsurance: 'yes',
        liveWithParentsLaw: 'no',
    },
    {
        id:2,
        name: 'Leo Dokidis',
        relationShip: 'Employee',
        phoneNo: '09265577722',
        taxExemption: 'yes',
        transferInsurance: 'yes',
        liveWithParentsLaw: 'no',
    },
    {   
        id:3,
        name: 'Leo Dokidis',
        relationShip: 'Employee',
        phoneNo: '09265577722',
        taxExemption: 'yes',
        transferInsurance: 'yes',
        liveWithParentsLaw: 'no',
    },
    {   
        id:4,
        name: 'Leo Dokidis',
        relationShip: 'Employee',
        phoneNo: '09265577722',
        taxExemption: 'yes',
        transferInsurance: 'yes',
        liveWithParentsLaw: 'no',
    },
    {   
        id:5,
        name: 'Leo Dokidis',
        relationShip: 'Employee',
        phoneNo: '09265577722',
        taxExemption: 'yes',
        transferInsurance: 'yes',
        liveWithParentsLaw: 'no',
    },
    {   
        id:6,
        name: 'Leo Dokidis',
        relationShip: 'Employee',
        phoneNo: '09265577722',
        taxExemption: 'yes',
        transferInsurance: 'yes',
        liveWithParentsLaw: 'no',
    },
    {   
        id:7,
        name: 'Leo Dokidis',
        relationShip: 'Employee',
        phoneNo: '09265577722',
        taxExemption: 'yes',
        transferInsurance: 'yes',
        liveWithParentsLaw: 'no',
    },
];

const FamilyContacts = () => {
    const { value, toggle, setTrue } = useBoolean(false)

    const { t } = useTranslation('familyContact')

    return (
        <section className="w-full ">
            <TableFrame
                isOutline={true}
                isWrite={true!}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="familyContact"
            />
            <DataTable
                isSort
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                data={modifiedData || []}
            />
            <EmployeeModal
                title={`${t('addFamily')}`}
                modelRatio=' '
                editMode={false}
                open={value}
                toggle={toggle}
                form={<FamilyForm  toggle={toggle} />}
            />
        </section>
    )
}

export default FamilyContacts
