'use client'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import PersonalDetailForm from '@/components/employee/personal-details/personal-detail-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useMediaQuery } from 'usehooks-ts'
import React, { useState } from 'react'
import PersonalDetail from './personal-detail'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import ModalNextBtns from '@/components/common/modal/modal-next-btns'
import PersonalSkillPage from './personal-skill'
import { useRouter } from 'next/navigation'
import useCandidateStore from '@/state/zustand/candidate'
import { useSearchParams } from 'next/navigation'

export const MainPage = () => {
    const [selectedTab, setSelectedTab] = useState('account')
    const isMobile = useMediaQuery('(max-width:766px)')
    const router = useRouter()
    const { stepOne } = useCandidateStore((state) => state)
    const searchParams = useSearchParams()
    const detail = searchParams.get('detail')

    const handleClickddf = () => {
        if (stepOne === undefined) {
            setSelectedTab('account')
        }
    }

    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    {
                        title: 'Recruitment',
                        href: `/recruitment`,
                    },
                    {
                        // @ts-ignore
                        title: 'Candidates',
                        href: '/candidates',
                    },
                    {
                        // @ts-ignore
                        title: 'Add Candidates',
                        href: '/add-candidates',
                    },
                ]}
            />
            <Tabs
                onClick={handleClickddf}
                defaultValue="account"
                value={selectedTab}
                className="  mx-auto flex items-center justify-center   flex-col my-[64px]"
            >
                <TabsList
                    onSelect={(value) => console.log(value)}
                    className="h-[120px] bg-white w-[100%] z-50 sticky top-0 mx-auto rounded "
                >
                    <TabsTrigger
                        onClick={() => setSelectedTab('account')}
                        value="account"
                        className=" w-[50%] h-[100px]   opacity-60 data-[state=active]:opacity-100 data-[state=active]:shadow-none relative"
                    >
                        <div className="flex z-10  flex-col justify-center items-center">
                            <div
                                className={cn(
                                    'w-[50px] h-[50px] flex items-center justify-center relative rounded-full border-2 border-[#3F88EC] bg-white  text-[#3F88EC]   ',
                                    selectedTab === 'account' &&
                                        ' bg-[#3F88EC] text-white ',
                                )}
                            >
                                1
                            </div>
                            <p className="text-[#3F88EC] text-[12px] md:text-[14px] mt-[20px]">
                                Personal Information
                            </p>
                        </div>
                        <div className="border-2 w-[50%] left-[50%] z-[0] top-[28%] absolute border-[#3F88EC]"></div>
                    </TabsTrigger>
                    <TabsTrigger
                        onClick={() => setSelectedTab('password')}
                        value="password"
                        className=" w-[50%]  h-[100px] opacity-60 data-[state=active]:opacity-100 data-[state=active]:shadow-none relative "
                    >
                        <div className="flex  flex-col justify-center items-center">
                            <div
                                className={cn(
                                    'w-[50px] h-[50px] flex items-center justify-center relative rounded-full border-2 border-[#3F88EC] z-10 bg-white  text-[#3F88EC]   ',
                                    selectedTab === 'password' &&
                                        ' bg-[#3F88EC] text-white ',
                                )}
                            >
                                2
                            </div>
                            <p className="text-[#3F88EC] text-[12px] md:text-[14px] mt-[20px]">
                                Personal Information
                            </p>
                        </div>
                        <div className="border-2 w-[50%] right-[50%] z-[0] top-[28%] absolute border-[#3F88EC]"></div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent className=" w-full" value="account">
                    <PersonalDetail
                        detail={detail ? true : false}
                        setSelectedTab={() => setSelectedTab('password')}
                    />
                </TabsContent>
                <TabsContent className=" w-full" value="password">
                    <PersonalSkillPage detail={detail ? true : false} />
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default MainPage
