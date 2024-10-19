import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

export const CareerDetailsHeader = () => {
    const handleClick = () => {}

    return (
        <div className="flex justify-between items-center">
            <div>
                <h3 className=" font-bold text-[24px] text-[#111827]">
                    Junior Backend Developer
                </h3>
                <p className=" text-zinc-500 text-[14px] w-[63%]">
                    Join our dynamic team as we seek passionate individuals to
                    fill key roles in diverse industries. Don't miss out on your
                    next career move — apply now and let us connect you with the
                    perfect job match.nd let us connect you with the perfect job
                    match.
                </p>
            </div>
            <div className="flex gap-5">
                <Button
                    variant="primary"
                    className={cn(
                        'font-normal disabled:opacity-50 rounded-[10px] w-[45px] md:w-[186px] h-[35px] md:h-[48px] hover:text-white gap-2 text-sm px-[30px] ',
                    )}
                    onClick={handleClick}
                >
                    <span className="hidden text-[16px] sm:inline-block font-bold">
                        Apply For the Job
                    </span>
                </Button>
            </div>
        </div>
    )
}
