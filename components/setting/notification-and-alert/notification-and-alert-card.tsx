import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import ChildrenInput from './components/children-input'
import { cn } from '@/lib/utils'

type NotificationAndAlertCardType = {
    title: string
    data: any[]
    form: any
}

const NotificationAndAlertCard = ({
    title,
    data,
    form,
}: NotificationAndAlertCardType) => {
    return (
        <Card className="drop-shadow relative p-0 md:p-3  pt-10">
            <div className=" bg-primary-500 px-5 flex items-center justify-center rounded text-white p-1 absolute top-[-15px] left-[5%]">
                {title}
            </div>
            <CardContent
                className={cn(
                    `grid grid-cols-1 xl:grid-cols-2  md:mt-[30px] justify-start items-center gap-y-4 gap-x-3 xl:gap-x-10`,
                    title === 'Send Email' &&
                        'lg:grid-cols-3 grid-cols-1 sm:grid-cols-2',
                )}
            >
                {data.map((e, index) => (
                    <ChildrenInput
                        formInput={e.formInput}
                        formDrop={e.formDrop}
                        form={form}
                        formCheck={e.formCheck}
                        title={e.title}
                        key={index}
                        type={e.type}
                    />
                ))}
            </CardContent>
        </Card>
    )
}

export default NotificationAndAlertCard
