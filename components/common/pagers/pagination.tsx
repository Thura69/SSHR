'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, MAX_PAGE_SIZE } from '@/lib/utils'
import ReactPaginate from 'react-paginate'
import { useMediaQuery } from 'usehooks-ts'
import { PagnationProps } from '@/types/common'

const Paging: React.FC<PagnationProps> = ({
    currentPage = 1,
    perPage = 10,
    totalCount = 30,
    loading,
}) => {
    const isMobile = useMediaQuery('(max-width:480px)')
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [_, setSize] = useQueryState('size', parseAsInteger.withDefault(15))

    const totalPages = Math.ceil(totalCount / perPage)

    const showStart = (currentPage - 1) * perPage + 1

    const hasFullPage = totalCount - currentPage * perPage >= 0
    const reminder = totalCount % perPage
    const showEnd = hasFullPage
        ? currentPage * perPage
        : (currentPage - 1) * perPage + reminder

    const changeSize = (value: string) => {
        setSize(parseInt(value))
        setPage(1)
    }

    const handlePageClick = (event: any) => { 
        setPage(event.selected + 1)
    }

    const lastPage = Math.ceil(totalCount / perPage)
    const atLastPage = currentPage === lastPage
    const atFirstPage = currentPage === 1

    return (
        <>
            <section>
                {loading ? (
                    <section className="px-4 mt-4">
                        <Skeleton className="w-full h-10" />
                    </section>
                ) : (
                    <>
                        {totalCount > 0 ? (
                            <div className="space-y-2 py-3  lg:space-y-0 lg:flex lg:justify-between lg:items-center lg:px-2 flex-wrap items-center">
                                <ReactPaginate
                                    // disableInitialCallback
                                    breakLabel="..."
                                    nextLabel={
                                        <p
                                            className={cn('rounded-lg p-2', {
                                                'hover:cursor-not-allowed':
                                                    atLastPage,
                                            })}
                                        >
                                            <ChevronRight className="text-gray-800 size-4" />
                                        </p>
                                    }
                                    previousLabel={
                                        <p
                                            className={cn('rounded-lg p-2', {
                                                'hover:cursor-not-allowed':
                                                    atFirstPage,
                                            })}
                                        >
                                            <ChevronLeft className="text-gray-800 size-4" />
                                        </p>
                                    }
                                    pageRangeDisplayed={isMobile ? 2 : 3}
                                    marginPagesDisplayed={2}
                                    forcePage={
                                        page - 1 < totalPages ? page - 1 : 0
                                    }
                                    pageCount={Math.ceil(
                                        totalCount /
                                            Math.min(perPage, MAX_PAGE_SIZE),
                                    )}
                                    onPageChange={handlePageClick}
                                    renderOnZeroPageCount={null}
                                    containerClassName="flex gap-2"
                                    pageLinkClassName="w-8 h-8 grid place-content-center p-0 m-0"
                                    pageClassName={buttonClasses + ''}
                                    previousClassName={cn(
                                        'w-8 h-8 text-black grid place-content-center border',
                                        buttonClasses,
                                    )}
                                    nextClassName={cn(
                                        'w-8 h-8 text-black grid place-content-center border',
                                        buttonClasses,
                                    )}
                                    activeClassName={activeClass}
                                    breakClassName="h-8 mx-2"
                                />
                                <div className="flex justify-between items-center gap-5 mr-1">
                                    <p
                                        className={cn(
                                            'text-zinc-500 text-sm font-medium text-nowrap',
                                            {
                                                'text-xs': isMobile,
                                            },
                                        )}
                                    >
                                        Showing {showStart} to {showEnd} of{' '}
                                        {totalCount} entries
                                    </p>
                                    <Select onValueChange={changeSize}>
                                        <SelectTrigger
                                            className={cn('py-1 px-2', {
                                                'w-[80px] text-xs': isMobile,
                                                'w-[100px]': !isMobile,
                                            })}
                                        >
                                            <SelectValue
                                                placeholder={`${perPage ? Math.min(perPage, MAX_PAGE_SIZE) : '15'}`}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem
                                                    value="0"
                                                    className="w-0 h-0 hidden"
                                                ></SelectItem>
                                                <SelectItem
                                                    className={` ${perPage === 8 && 'bg-slate-100'}`}
                                                    value="8"
                                                >
                                                    8
                                                </SelectItem>
                                                <SelectItem
                                                    className={`${(!perPage || perPage === 15) && 'bg-slate-100'}`}
                                                    value="15"
                                                >
                                                    15
                                                </SelectItem>
                                                <SelectItem
                                                    className={` ${perPage === 20 && 'bg-slate-100'}`}
                                                    value="20"
                                                >
                                                    20
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        ) : null}
                    </>
                )}
            </section>
        </>
    )
}

const buttonClasses =
    'hover:cursor-pointer whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 hover:text-slate-900 w-[32px] h-[32px] hover:bg-primary-500 hover:text-white'

const activeClass =
    'hover:cursor-pointer whitespace-nowrap text-sm ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-800 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-slate-50 text-center font-bold bg-primary-500 w-[32px] h-[32px] rounded text-white hover:bg-primary-700 hover:text-white !hover:bg-primary-900'

export default Paging
