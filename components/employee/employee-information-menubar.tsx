'use client'
import React, { useEffect, useState } from 'react'
import {
    MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname,useParams } from 'next/navigation'
import { Segmented } from 'antd'

type EmployeeMenuBarProps = {
    name: string
    link?: string
    items?: { name: string; link: string }[],
}

type itemType = {
    items?: { name: string; link: string }[]
    currentSegment: string
}

type noItemChecked = {
    link:string
    currentSegment:string
}


const menuColor =  
    'text-[#A0AEC0]  flex w-auto 2xl:w-[150px] xl:w-[130px] font-md  bg-white gap-2 text-[14px] font-bold   px-4   duration-500 data-[state=open]:bg-primary-500 rounded-md data-[state=open]:rounded-md data-[state=open]:text-white items-center justify-between'

const EmployeeMenuBar: React.FC<EmployeeMenuBarProps> = ({
    name,
    link,
    items
}) => {
    const pathName = usePathname()
    const params = useParams();
    const [currentSegment, setCurrentSegment] = useState('');

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

    const noItemChecked = ({link,currentSegment}:noItemChecked)=>{
         if(link === currentSegment) return true;

         return false;
    }

    return (
        <MenubarMenu>
            <MenubarTrigger
                className={cn(
                    menuColor,
                    items && isChecked({ items, currentSegment })
                        ? 'bg-primary-500 text-white focus:text-white focus:bg-primary-500'
                        : '',
                    link && noItemChecked({link,currentSegment})?'bg-primary-500 text-white focus:text-white focus:bg-primary-500':''
                )}
            >
                {link ? (
                    <Link href={`/employee/${params.id}/${link}`}>{name}</Link>
                ) : (
                    <>
                        {' '}
                        {name}
                        <ChevronDown className={'w-4 h-4 '} />
                    </>
                )}
            </MenubarTrigger>

            {items && (
                <MenubarContent>
                    {items.map((e, index) => (
                        <MenubarCheckboxItem
                            checked={e.link === currentSegment}
                            key={`${e.link}_${index}`}
                        >
                            <Link href={`/employee/${params.id}/${e.link}`}> {e.name}</Link>
                        </MenubarCheckboxItem>
                    ))}
                </MenubarContent>
            )}
        </MenubarMenu>
    )
}

export default EmployeeMenuBar
