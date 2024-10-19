'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import PersonalDetail from '@/components/recruitment-management/candidates/add-candidates/personal-detail'
import PersonalSkillPage from '@/components/recruitment-management/candidates/add-candidates/personal-skill'

type tabsType = {
    value: string
    label: string
    position: string
}

type Stepper = {
    tabs: tabsType[]
    tabContentMapping: any
}

export const Stepper: React.FC<Stepper> = ({ tabs, tabContentMapping }) => {
    const [selectedTab, setSelectedTab] = useState(tabs[0].value)

    const handleClickddf = () => {}

    return (
        <Tabs
            onClick={handleClickddf}
            defaultValue="account"
            value={selectedTab}
            className="  mx-auto  flex items-center justify-center   flex-col my-[64px]"
        >
            <TabsList
                onSelect={(value) => console.log(value)}
                className="h-[120px] bg-white w-[100%] overflow-auto z-50 sticky top-0 mx-auto rounded "
            >
                {tabs.map((e, index) => (
                    <TabsTrigger
                        key={index}
                        onClick={() => setSelectedTab(e.value)}
                        value={e.value}
                        className=" w-[50%] h-[100px] opacity-50 data-[state=active]:opacity-100 data-[state=active]:shadow-none relative"
                    >
                        <div className="flex z-10  flex-col justify-center items-center">
                            <div
                                className={cn(
                                    'w-[50px] h-[50px] flex items-center justify-center relative rounded-full border-2 border-[#3F88EC] bg-white  text-[#3F88EC]   ',
                                    selectedTab === e.value &&
                                        ' bg-[#3F88EC] text-white ',
                                )}
                            >
                                {index + 1}
                            </div>
                            <p className="text-[#3F88EC] text-[12px] md:text-[14px] mt-[20px]">
                                {e.label}
                            </p>
                        </div>
                        <div
                            className={cn(
                                'border-2 w-[50%] left-[50%] z-[0] top-[28%] absolute border-[#3F88EC]',

                                e.position === 'right' && 'left-[50%]  right-0',
                                e.position === 'middle' &&
                                    ' w-[100%] left-0 right-[50%]',
                                e.position === 'left' && 'right-[50%] left-0 ',
                            )}
                        ></div>
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent
                    value={tab.value}
                    key={tab.value}
                    className={`tab-content w-full  ${selectedTab === tab.value ? 'active' : ''}`}
                >
                    {tabContentMapping[tab.value]}
                </TabsContent>
            ))}
        </Tabs>
    )
}
