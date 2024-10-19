'use client'

import TableTitle from '@/components/common/form/table-title'
import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { columns } from './emergency-columndef'
import EmployeeModal from '../forms/employee-modal'
import { DataTable } from '../forms/data-table-employee'
import FamilyForm from './family-form'
import EmergencyForm from './emergency-form'

const modifiedData = [
    {
        id:1,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        contactNo: '09265577722',
        primaryContact: 'Yes',
    },
    {
        id:2,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        contactNo: '09265577722',
        primaryContact: 'Yes',
    },
    {   
        id:3,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        contactNo: '09265577722',
        primaryContact: 'Yes',
    },
    {   
        id:4,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        contactNo: '09265577722',
        primaryContact: 'Yes',
    },
    {   
        id:5,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        contactNo: '09265577722',
        primaryContact: 'Yes',
    },
    {   
        id:6,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        contactNo: '09265577722',
        primaryContact: 'Yes',
    },
    {   
        id:7,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        contactNo: '09265577722',
        primaryContact: 'Yes',
    },
];

const EmergencyContacts = () => {
    const { value, toggle, setTrue } = useBoolean(false)

    const { t } = useTranslation('emergencyContact')

    return (
        <section className="w-full ">
            <TableFrame
                isOutline={true}
                isWrite={true!}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="emergencyContact"
            />
            <DataTable
                isSort
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                data={modifiedData || []}
            />
            <EmployeeModal
                title={`${t('addEmergency')}`}
                modelRatio=' '
                editMode={false}
                open={value}
                toggle={toggle}
                form={<EmergencyForm  toggle={toggle} />}
            />
        </section>
    )
}

export default EmergencyContacts
