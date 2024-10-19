'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import sideMenuData from '../utils'
import { usePathname, useParams } from 'next/navigation'
import { Check } from 'lucide-react'

type EmployeeMenuBarProps = {
    name: string
    link?: string
    items?: { name: string; link: string }[]
}

type itemType = {
    items?: { name: string; link: string }[]
    currentSegment: string
}

type noItemChecked = {
    link: string
    currentSegment: string
}

const EmployeeInformationSideBar = () => {
    const pathName = usePathname()
    const params = useParams()
    const [currentSegment, setCurrentSegment] = useState('')

    useEffect(() => {
        // Extract the segment you are interested in, e.g., '/employee-details'
        const segments = pathName.split('/')
        const targetSegment = segments.length > 3 ? `/${segments[3]}` : ''
        setCurrentSegment(targetSegment)
    }, [pathName])

    const isChecked = ({ items, currentSegment }: itemType) => {
        const result = items!.map((e, index) => e.link === currentSegment)

        if (result.includes(true)) return true

        return false
    }

    const noItemChecked = ({ link, currentSegment }: noItemChecked) => {
        if (link === currentSegment) return true

        return false
    }

    return (
        <ScrollArea className="p-3 bg-white h-[80svh] mt-10 text-gray-600">
            <Accordion type="single" collapsible className="w-full  space-y-5 ">
                {sideMenuData?.map((e, index) => {
                    const items = e.items
                    const link = e.link

                    return (
                        <AccordionItem
                            value={`item-${index}`}
                            className="border-none "
                        >
                            <AccordionTrigger
                                showIcon={e.items ? true : false}
                                value={''}
                                className={cn(
                                    'h-[20px] px-2 rounded-sm [&[data-state=open]]:bg-primary-500 [&[data-state=open]]:text-white text-md',
                                    e.items &&
                                        isChecked({ items, currentSegment })
                                        ? 'bg-primary-500 text-white focus:text-white focus:bg-primary-500'
                                        : '',
                                    link &&
                                        noItemChecked({ link, currentSegment })
                                        ? 'bg-primary-500 text-white focus:text-white focus:bg-primary-500'
                                        : '',
                                )}
                            >
                             {
                                e.link ? ( <Link className=' w-full text-start' href={`/employee/${params.id}/${link}`}>{e.name}</Link>) :   <p> {e.name}</p>
                             }
                            </AccordionTrigger>
                            {e.items && (
                                <AccordionContent
                                    value={''}
                                    className="bg-primary-50/80 text-md text-gray-700 px-2"
                                >
                                    <ul>
                                        {e.items &&
                                            e.items.map((item, index) => (
                                                <li className={cn('py-3 flex items-center gap-3' 
                                                )}>
                                                {
                                                   item.link === currentSegment && <Check className='w-4 h-4'/>  
                                                }
                                                  <Link href={`/employee/${params.id}/${item.link}`}>{item.name}</Link>
                                                </li>
                                            ))}
                                    </ul>
                                </AccordionContent>
                            )}
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </ScrollArea>
    )
}

export default EmployeeInformationSideBar
