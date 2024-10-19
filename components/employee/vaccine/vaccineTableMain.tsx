'use client'
import { useMediaQuery } from 'usehooks-ts'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import EmployeeHeader from '../employee-header'
import EmployeeInformationSheet from '../employee-information/employee-information-sheet'
import VaccineEmployee from './vaccine'


const VaccineTablesMain = ()=>{

    const isMobile = useMediaQuery('(max-width: 1100px)')

    return (
        <section className="w-full p-4 pb-10 px-6">
             {/* <Breadcrumbs
                className="text-[16px] font-bold"
                segments={[
                    {
                        title: 'Employee Information',
                        href: `/dashboard`,
                    },
                    {
                        // @ts-ignore
                        title: 'Job',
                        href: '',
                    },
                ]}
            /> */}
             <div className=" flex items-center mt-4 justify-between">
                <EmployeeHeader />
                {isMobile && <EmployeeInformationSheet />}
            </div>
            <div className=" space-y-4">
                <VaccineEmployee />
            </div>
        </section>
    )
}

export default VaccineTablesMain