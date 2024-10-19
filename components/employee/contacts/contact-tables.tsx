'use client'
import TableFrame from '@/components/common/table/table-frame'
import EmployeeHeader from '../employee-header'
import FamilyContacts from './family-contact'
import { useMediaQuery } from 'usehooks-ts'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import EmployeeInformationSheet from '../employee-information/employee-information-sheet'
import EmergencyContacts from './emergency-contact'

const ContactTablesMain = () => {
    const isMobile = useMediaQuery('(max-width: 1100px)')
    return (
        <section className="w-full p-4 pb-10 px-6">
            <div className=" flex items-center mt-4 justify-between">
            <EmployeeHeader />
                {isMobile && <EmployeeInformationSheet />}
            </div>
           <div className=' space-y-4'>
           <FamilyContacts />
            
            <EmergencyContacts />
           </div>
        </section>
    )
}

export default ContactTablesMain
