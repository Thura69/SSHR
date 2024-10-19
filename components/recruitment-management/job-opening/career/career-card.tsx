import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type CareerCardType = {
    gridCard?: boolean
}

export const CareerCard: React.FC<CareerCardType> = ({ gridCard }) => {
    const router = useRouter()

    const handleClick = () => {
        router.push('/recruitment/job-opening/career/1')
    }

    return (
        <Card className={cn(' rounded-xl hover:drop-shadow')}>
            <CardHeader>
                <CardTitle
                    className={cn(
                        'mb-[8px] flex  sm:space-y-0 space-y-3',
                        gridCard ? ' flex-col items-start' : 'flex-col sm:flex-row  sm:items-center justify-between ',
                    )}
                >
                    {gridCard && (
                        <div className="flex w-full  justify-between">
                            <Badge className="bg-[#FCFCFC] hover:bg-white text-[#737373] flex items-center justify-center w-[110px] border-[#BFBFBF] px-[6px] py-[8px] ">
                                20 May, 2023
                            </Badge>
                            <Badge className="bg-[#E4FFDF] hover:bg-[#E4FFDF] text-[#158205] flex items-center justify-center  w-[72px] h-[28px] px-[6px] py-[12px] ">
                                <p>Open</p>
                            </Badge>
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-[30px]">
                        <p
                            className={cn(
                                'text-[14px] sm:text-2xl',
                                gridCard && 'text-[14px] mt-2 font-medium',
                            )}
                        >
                            Junior Backend Developer
                        </p>
                        {!gridCard && (
                            <Badge className="bg-[#E4FFDF] hover:bg-[#E4FFDF] text-[#158205] flex items-center justify-center  w-[72px] h-[28px] px-[6px] py-[12px] ">
                                <p>Open</p>
                            </Badge>
                        )}
                    </div>
                    {!gridCard && (
                        <Badge className="bg-[#FCFCFC] hover:bg-white text-[#737373] flex items-center justify-center sm:w-[110px] border-[#BFBFBF] px-[6px] py-[8px] ">
                            20 May, 2023
                        </Badge>
                    )}
                </CardTitle>
                <CardDescription>
                    <Badge
                        className={cn(
                            'bg-[#FCFCFC] w-full sm:w-auto hover:bg-white text-[#737373] border-[#BFBFBF] px-[6px] py-[8px] ',
                            gridCard && 'text-[10px] py-0 mt-5  mb-2',
                        )}
                    >
                        <p className=" mx-auto"> Software Development</p>
                    </Badge>
                </CardDescription>
            </CardHeader>
            <CardFooter className="border-t flex items-center pb-0 justify-between rounded-xl h-[75px]">
                <div>
                    <p className="text-[10px] text-[#737373]">Location</p>
                    <p className="text-[13px] font-bold">
                        St 76, New York, USA
                    </p>
                </div>
                <Button
                    onClick={handleClick}
                    className="w-[90px] h-[45px] px-[12px] py-[24px]  duration-300 hover:bg-white hover:border-primary-500 border border-white hover:text-primary-500 bg-primary-500"
                >
                    Detail
                </Button>
            </CardFooter>
        </Card>
    )
}
