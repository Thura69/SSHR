import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React from 'react'

const Paging = () => {
    return (
        <div className="space-y-2 py-3 lg:space-y-0 md:flex md:justify-between md:items-center md:px-2">
            <Pagination className="justify-end md:justify-start">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink href="#" className="w-[32px] h-[32px]">
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-[32px] h-[32px]"
                            >
                                <ChevronLeft className="text-gray-800 size-4" />
                            </Button>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" className="w-[32px] h-[32px]">
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            isActive
                            className="w-[32px] h-[32px]"
                        >
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" className="w-[32px] h-[32px]">
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" className="w-[32px] h-[32px]">
                            10
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" className="w-[32px] h-[32px]">
                            <Button
                                variant="outline"
                                size="icon"
                                className="w-[32px] h-[32px]"
                            >
                                <ChevronRight className="text-gray-800 size-4" />
                            </Button>
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <div className="flex justify-end md:justify-between items-center gap-5">
                <p className="text-zinc-500 text-sm font-medium text-nowrap">
                    Showing 1 to 8 of 50 entries
                </p>
                <Select>
                    <SelectTrigger className="w-[100px]">
                        {/*default 15 row from server */}
                        <SelectValue placeholder="Show 15" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="8">Show 8</SelectItem>
                        <SelectItem value="15">Show 15</SelectItem>
                        <SelectItem value="20">Show 20</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default Paging
