import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '../ui/button'
import VerticalSidebar from '@/components/vertical-timeline/vertical-sidebar'
import { Filter } from 'lucide-react'


const VerticalSheet = () => {
    return (
        <Sheet>
            <SheetTrigger className=''  asChild>
                <Button variant={'ghost'}><Filter className=' h-5 w-5 text-primary-500' /></Button>
            </SheetTrigger>
            <SheetContent className="p-0">
                <div className="h-screen mt-7 relative divide-y overflow-y-auto divide-red-100 ">
                    <VerticalSidebar  />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default VerticalSheet
