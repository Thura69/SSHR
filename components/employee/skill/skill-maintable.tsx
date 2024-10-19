'use client'
import { useMediaQuery } from 'usehooks-ts'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import EmployeeHeader from '../employee-header'
import EmployeeInformationSheet from '../employee-information/employee-information-sheet'
import SkillProfess from './skill-profession'

const SkillMainTable = () => {
    const isMobile = useMediaQuery('(max-width: 1100px)')

    return (
        <section className="w-full p-4 pb-10 px-6">
            <div className=" flex items-center mt-4 justify-between">
                <EmployeeHeader />
                {isMobile && <EmployeeInformationSheet />}
            </div>
            <div className=" space-y-4">
                <SkillProfess />
            </div>
        </section>
    )
}

export default SkillMainTable;