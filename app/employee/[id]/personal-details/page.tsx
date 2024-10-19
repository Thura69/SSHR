'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import TableFrame from '@/components/common/table/table-frame'
import EmployeeHeader from '@/components/employee/employee-header'
import EmployeeInformationSheet from '@/components/employee/employee-information/employee-information-sheet'
import PersonalDetailForm from '@/components/employee/personal-details/personal-detail-form'
import { useMediaQuery } from 'usehooks-ts'

const PersonalDetails = () => {
    const isMobile = useMediaQuery('(max-width: 1100px)')
    return (
        <section className="w-full p-4 px-6">
            <div className=" flex items-center mt-4 justify-between">
                <EmployeeHeader />
                {isMobile && <EmployeeInformationSheet />}
            </div>
            <div className=" space-y-4">
                <PersonalDetailForm />
            </div>
        </section>
    )
}

export default PersonalDetails
