'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import { useMediaQuery } from 'usehooks-ts'
import EmployeeHeader from '../employee-header'
import EmployeeInformationSheet from '../employee-information/employee-information-sheet'
import HrConcern from './hrconcern'

const HrConcernTables = () => {
    const isMobile = useMediaQuery('(max-width: 1100px)')

    return (
        <section className="w-full p-4 pb-10 px-6">
            <div className=" flex mt-4 items-center justify-between">
                <EmployeeHeader />
                {isMobile && <EmployeeInformationSheet />}
            </div>

            <div className="space-y-4">
                <HrConcern />
            </div>
        </section>
    )
}

export default HrConcernTables