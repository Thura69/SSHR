import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import EmployeeInformationSideBar from './employee-information-sidebar'

const EmployeeInformationSheet = () => {
    return (
        <Sheet>
            <SheetTrigger className="" asChild>
                <Button variant={'ghost'}>
                    <Filter className=" h-5 w-5 text-primary-500" />
                </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
                <div className="h-screen relative divide-y overflow-y-auto divide-red-100 ">
                    <EmployeeInformationSideBar />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default EmployeeInformationSheet
