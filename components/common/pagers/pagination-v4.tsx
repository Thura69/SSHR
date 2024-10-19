'use client'
import './pagination-style.css'
import { PagnationV4Props } from '@/types/common'
import { Skeleton } from '@/components/ui/skeleton'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'
import { useState } from 'react'
import { Manrope, Poppins } from 'next/font/google'
import { cn, MAX_PAGE_SIZE } from '@/lib/utils'
import { useMediaQuery } from 'usehooks-ts'
import { parseAsInteger, useQueryState } from 'nuqs'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const manrope = Manrope({ subsets: ['latin'] })

const Paging: React.FC<PagnationV4Props> = ({
    currentPage = 2,
    perPage = 10,
    totalCount = 30,
    loading,
}) => {
    const isMobile = useMediaQuery('(max-width:480px)')
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [_, setSize] = useQueryState('size', parseAsInteger.withDefault(15))
    const [first, setFirst] = useState(0)
    const [rows, setRows] = useState(10)

    const showStart = (currentPage - 1) * perPage + 1
    const hasFullPage = totalCount - currentPage * perPage >= 0
    const reminder = totalCount % perPage
    const showEnd = hasFullPage
        ? currentPage * perPage
        : (currentPage - 1) * perPage + reminder

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setPage(event.page + 1)
        setFirst(event.first)
        setRows(event.rows)
    }

    const changeSize = (value: string) => {
        setSize(parseInt(value))
        setPage(1)
    }

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
                            <div className="space-y-2 py-3 lg:space-y-0 lg:flex lg:justify-between lg:items-center lg:px-2 flex-wrap items-center">
                                <div className='overflow-auto'>
                                    <Paginator
                                        className={cn(manrope.className)}
                                        pageLinkSize={3}
                                        first={first}
                                        rows={rows}
                                        totalRecords={120}
                                        rowsPerPageOptions={[10, 20, 30]}
                                        onPageChange={onPageChange}
                                    />
                                </div>

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
                                            className={cn('py-1 px-2 border-[#F1F2F4]  rounded-[10px] text-[#52525B]', {
                                                'w-[80px] text-xs': isMobile,
                                                'w-[100px]': !isMobile,
                                            })}
                                        >
                                            <SelectValue
                                                placeholder={`${perPage ? "Page " +  Math.min(perPage, MAX_PAGE_SIZE)   : 'Page 15' }`}
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
                                                  Page 8
                                                </SelectItem>
                                                <SelectItem
                                                    className={`${(!perPage || perPage === 15) && 'bg-slate-100'}`}
                                                    value="15"
                                                >
                                                  Page 15
                                                </SelectItem>
                                                <SelectItem
                                                    className={` ${perPage === 20 && 'bg-slate-100'}`}
                                                    value="20"
                                                >
                                                  Page 20
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

export default Paging
