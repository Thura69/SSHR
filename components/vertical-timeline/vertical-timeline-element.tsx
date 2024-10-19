'use client'

import {
    AuditTrailEventTypes,
    cn,
    getAuditTrailBorderColor,
    safeJsonParse,
} from '@/lib/utils'
import React, { ComponentProps, useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'
import { Skeleton } from '../ui/skeleton'
import './vertical.css'
import { format } from 'date-fns'
import { PersonIcon } from '@radix-ui/react-icons'
import VerticalTimeModal from '@/components/vertical-timeline/vertical-time-modal'
import OldValues from '@/components/vertical-timeline/components/OldValues'
import NewValues from '@/components/vertical-timeline/components/NewValues'
import AuditTrailActions from '@/components/vertical-timeline/components/AuditTrailActions'
import Image from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const VerticalTimelineElement = React.forwardRef<
    HTMLDivElement,
    ComponentProps<'div'> & { item: any }
>(({ item }, ref) => {
    const { value, setTrue, setFalse, toggle } = useBoolean(true)
    const {
        value: modalValue,
        setTrue: modalTrue,
        toggle: dmodal,
    } = useBoolean(false)
    const { value: start, setTrue: startSetTrue } = useBoolean(false)

    useEffect(() => {
        startSetTrue()
    }, [start])

    if (!start)
        return (
            <section className="w-full space-y-4 px-10">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-8" />
            </section>
        )

    const dateString = format(new Date(item.CreateDate), 'MMMM d yyyy')
    const dayOfWeek = format(new Date(item.CreateDate), 'EEEE')
    const dateInHourAndMin = format(new Date(item.CreateDate), 'h:mm a')
    const changesType = item?.EventType
    const showActions =
        changesType !== AuditTrailEventTypes.LOGIN &&
        changesType !== AuditTrailEventTypes.LOGOUT &&
        changesType !== AuditTrailEventTypes.INSERT && 
        changesType !== AuditTrailEventTypes.DELETE
    const isViewEvent = changesType === AuditTrailEventTypes.VIEW
    const isUpdateEvent = changesType === AuditTrailEventTypes.UPDATE

    const valueAfterString =
        changesType === AuditTrailEventTypes.UPDATE &&
        safeJsonParse(item?.ValueAfter)

    const valueAfter = valueAfterString && JSON.parse(valueAfterString)
    const valueAfterKeys = Object.keys(valueAfter)

    const valueBeforeString =
        changesType === AuditTrailEventTypes.UPDATE &&
        safeJsonParse(item?.ValueBefore)

        
    const valueBefore = valueBeforeString && JSON.parse(valueBeforeString)
    const valueBeforeKeys = valueBefore && Object.keys(valueBefore)

    const ePhoto = item?.tbl_User?.tbl_Employee?.ePhoto
    const ePhotoUrl = ePhoto ?  process.env.NEXT_PUBLIC_BASE_URL +'/'+ ePhoto : '/default_profile';
    const empName = item?.tbl_User?.tbl_Employee?.Employee_Name 

    return (
        <div
            className="flex border-gray-300 my-1 pl-[30px] md:pl-[50px] w-[100%]"
            ref={ref}
        >
            <div className="min-w-[120px] max-w-[150px]">
                {item?.CreateDate ? (
                    <>
                        <h3 className="text-md">{dayOfWeek}</h3>
                        <p className="text-xs text-nowrap">{dateString}</p>
                    </>
                ) : null}
            </div>
            <div
                className={cn(
                    'border rounded-lg relative py-[20px] flex items-start justify-center border-slate-300',
                    {
                        'border-green-300': AuditTrailEventTypes.VIEW === changesType,
                        'border-red-300': AuditTrailEventTypes.DELETE === changesType,
                        'border-yellow-300': AuditTrailEventTypes.UPDATE === changesType,
                        'border-blue-300': AuditTrailEventTypes.INSERT === changesType,
                    }
                )}
            />

            <div
                className={cn(
                    'px-10  py-[20px] w-full flex flex-col rounded-md ',
                )}
            >
                <div className="flex flex-col justify-start ">
                    <section>
                        <div className="mb-[5px]">
                            <p className="text-xs text-gray-500">
                                {dateInHourAndMin}
                            </p>
                        </div>

                        <section className="flex items-center">
                              <TooltipProvider>
                                    <Tooltip>
                            <TooltipTrigger asChild>
                            <div className="p-2 rounded-full mr-5 h-fit ">
                                    <div className="p-1 rounded-full w-6 h-6 relative">
                                       <Image src={ePhotoUrl} alt={empName} className='rounded-full object-cover scale-150' fill/>
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className='grid grid-cols-[auto_1fr] gap-x-2 gap-y-2'>
                                    <p className='text-xs'>Employee No</p>
                                    <p className="text-xs">
                                        <span className='mx-4'>:</span>
                                        {item?.tbl_User?.tbl_Employee?.Employee_No}</p>
                                    <p className='text-xs'>Position</p>
                                    <p className='text-xs'><span className='mx-4'>:</span>{item?.tbl_User?.tbl_Employee?.tbl_Position?.Position_Name}</p>
                                    <p className='text-xs'>Department</p>
                                    <p className='text-xs'><span className='mx-4'>:</span>{item?.tbl_User?.tbl_Employee?.tbl_Department?.Department_Name}</p>
                                    <p className='text-xs'>Branch</p>
                                    <p className='text-xs'><span className='mx-4'>:</span>{item?.tbl_User?.tbl_Employee?.tbl_Branch?.Branch_Name}</p>
                                    <p className='text-xs'>Company</p>
                                    <p className='text-xs'><span className='mx-4'>:</span>{item?.tbl_User?.tbl_Employee?.tbl_Company?.Company_Name}</p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                           
                            <section className="contant">
                                <h3 className="text-sm">{item?.Description}</h3>
                                <div className="flex flex-col md:flex-row md:items-center items-start justify-start gap-1">
                                    {showActions ? (
                                        <AuditTrailActions
                                            toggleValue={value}
                                            isViewEvent={isViewEvent}
                                            onActionClick={() => toggle()}
                                            onDetailClick={() => dmodal()}
                                        />
                                    ) : null}
                                </div>
                            </section>
                        </section>
                    </section>
                    <div className="">
                        <div
                            className={cn(
                                ' transition-all overflow-hidden duration-1000 ease',
                                value ? ' max-h-0' : 'h-fit',
                            )}
                        >
                            {isUpdateEvent ? (
                                <div className="flex gap-[60px] items-start">
                                    <NewValues
                                        valueAfterKeys={valueAfterKeys}
                                        valueAfter={valueAfter}
                                    />
                                    <OldValues
                                        valueBeforeData={valueBefore}
                                        valueBeforeKeys={valueBeforeKeys}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <VerticalTimeModal
                        key={JSON.stringify(item)}
                        toggle={dmodal}
                        open={modalValue}
                        title="Audit Trail History"
                        data={item}
                    />
                </div>
            </div>
        </div>
    )
})

export default VerticalTimelineElement
