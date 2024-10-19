'use client'

import React from 'react'
import { CareerPublicHeader } from '../career/career-public-header'
import { CareerDetailsHeader } from './career-details-header'
import { title } from 'process'
import { Badge } from '@/components/ui/badge'
import { DetailsForm } from './details-form'
import FACEBOOK from '@/public/icons/facebook_circle.svg'
import TWITTER from '@/public/icons/twitter_circle.svg'
import EMAIL from '@/public/icons/email_circle.svg'
import Image from 'next/image'

type RequiredSkillType = {
    title: string
    content: string
}

const SAMPLEDATAS = [
    {
        title: 'Job Detail',
        children: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar lectus eu ipsum facilisis, ac consectetur turpis suscipit. Proin eu quam ut dui commodo imperdiet. Quisque euismod neque vel nunc lobortis, id vestibulum eros eleifend. Duis eget augue vitae ex rhoncus gravida at nec tortor. Duis eget augue vitae ex rhoncus gravida at nec ',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar lectus eu ipsum facilisis, ac consectetur turpis suscipit. Proin eu quam ut dui commodo imperdiet. Quisque euismod neque vel nunc lobortis, id vestibulum eros eleifend. Duis eget augue vitae ex rhoncus gravida at nec tortor. Duis eget augue vitae ex rhoncus gravida at nec ',
        ],
    },
    {
        title: 'About Us',
        children: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar lectus eu ipsum facilisis, ac consectetur turpis suscipit. Proin eu quam ut dui commodo imperdiet. Quisque euismod neque vel nunc lobortis, id vestibulum eros eleifend. Duis eget augue vitae ex rhoncus gravida at nec tortor. Duis eget augue vitae ex rhoncus gravida at nec ',
        ],
    },
]

const RequiredSkill: React.FC<RequiredSkillType> = ({ title, content }) => {
    return (
        <div className=" space-y-2">
            <h3 className=" label">{title}</h3>
            <Badge className="px-[8px] py-[10px] text-[#737373] hover:bg-[#FCFCFC] bg-[#FCFCFC] border-[#BFBFBF]">
                {content}
            </Badge>
        </div>
    )
}

export const MainPage = () => {
    return (
        <div className="p-[40px]">
            <CareerPublicHeader />
            <CareerDetailsHeader />
            <div className=" my-[25px] flex  justify-between">
                <div className="w-[40%]">
                    <RequiredSkill
                        title="Skills Requireds"
                        content="Software Development"
                    />
                    <div className="space-y-2 mt-[20px]">
                        {SAMPLEDATAS.map((e, index) => (
                            <div className=" space-y-2">
                                <h3 className="label" key={index}>
                                    {e.title}
                                </h3>
                                {e.children.map((e, index) => (
                                    <div key={index}>
                                        <p className="text-[#687588] text-[14px]">
                                            {e}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-[356px] h-[658px]">
                    <DetailsForm />
                    <div className="w-full border px-[8px] py-[16px] rounded-[8px] mt-[24px] h-[44px] flex items-center justify-center">
                        <p className="text-[#929292] text-[14px] font-light">
                            www.shorturl.com/jobdetail
                        </p>
                    </div>
                    <div className="flex justify-center gap-2 mt-[24px]">
                        <Image src={FACEBOOK} alt="facebook" />
                        <Image src={TWITTER} alt="twitter" />
                        <Image src={EMAIL} alt="email" />
                    </div>
                </div>
            </div>
        </div>
    )
}
