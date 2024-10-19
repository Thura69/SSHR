import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import TableFrame from '@/components/common/table/table-frame'
import { useBoolean } from 'usehooks-ts'
import { columns } from './employee-column-def'
import { DataTable } from './forms/data-table-employee'
import Paging from '@/components/common/pagers/pagination'
import TableFrameFilter from '../common/table/table-frame-filter'
import EmployeeFilter from './employee-filtere'
import { useState } from 'react'
import EmployeeFilterSheet from './employee-filter-sheet'
import EMPLOYEE from '@/public/Rectangle 42000.png';

const modifiedData = [
    {
        id: 1,
        photo: EMPLOYEE,
        employeeNo: 'EM123456',
        name: 'Putailas',
        position: 'UI/UX Designer',
        joinDate: '12/08/2000',
        jobType: 'On Site',
        status: 'Active',
        phone: '09789456321',
        martialStatus: 'Married',
        gender: 'Female',
    },
    {
        id: 2,
        photo:EMPLOYEE,
        employeeNo: 'EM123456',
        name: 'Putailas',
        position: 'UI/UX Designer',
        joinDate: '12/08/2000',
        jobType: 'On Site',
        status: 'Active',
        phone: '09789456321',
        martialStatus: 'Married',
        gender: 'Female',
    },
    {
        id: 3,
        photo: EMPLOYEE,
        employeeNo: 'EM123456',
        name: 'Putailas',
        position: 'UI/UX Designer',
        joinDate: '12/08/2000',
        jobType: 'On Site',
        status: 'Active',
        phone: '09789456321',
        martialStatus: 'Married',
        gender: 'Female',
    },
    {
        id: 4,
        photo: EMPLOYEE,
        employeeNo: 'EM123456',
        name: 'Putailas',
        position: 'UI/UX Designer',
        joinDate: '12/08/2000',
        jobType: 'On Site',
        status: 'Active',
        phone: '09789456321',
        martialStatus: 'Married',
        gender: 'Female',
    },
    {
        id: 5,
        photo: EMPLOYEE,
        employeeNo: 'EM123456',
        name: 'Putailas',
        position: 'UI/UX Designer',
        joinDate: '12/08/2000',
        jobType: 'On Site',
        status: 'Active',
        phone: '09789456321',
        martialStatus: 'Married',
        gender: 'Female',
    },
    {
        id: 6,
        photo: EMPLOYEE,
        employeeNo: 'EM123456',
        name: 'Putailas',
        position: 'UI/UX Designer',
        joinDate: '12/08/2000',
        jobType: 'On Site',
        status: 'Active',
        phone: '09789456321',
        martialStatus: 'Married',
        gender: 'Female',
    },
]

const EmployeeList = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const [open, setOpen] = useState('open')
    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    {
                        title: 'Employee',
                        href: `/dashboard`,
                    },
                    {
                        // @ts-ignore
                        title: 'Employee Search',
                        href: '',
                    },
                ]}
            />

            <TableFrameFilter
                isWrite={true}
                isOutline
                subTitle={false}
                modalTrue={() => setTrue()}
                language="employee"
                setOpen={setOpen}
                open={open}
            />
            <EmployeeFilter open={open} setOpen={setOpen} />
            
            <DataTable
                className={'with-action-employee-column'}
                columns={columns}
                height="h-auto"
                loading={false}
                data={modifiedData || []}
            />

            <Paging currentPage={1} perPage={8} totalCount={80} />
        </section>
    )
}

export default EmployeeList
