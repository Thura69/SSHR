'use client'
import EmployeeHeader from '@/components/employee/employee-header'
import EmployeeInformationList from '@/components/employee/employee-information/employeeInformationList'
import { useLegitGrandSub } from '@/hooks/use-legit-grandSub'
import { usePathname } from 'next/navigation'

const page = () => {
    //permisiion
    //   const pathname = usePathname()
    //permission hook
    //   useLegitGrandSub(pathname)

    return (
        <div>
           
            <EmployeeInformationList />
        </div>
    )
}

export default page
