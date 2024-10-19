import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import VERTICALICON from '@/public/icons/vuesax/bulk/vuesax/bulk/row-vertical.svg'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import EMBEDCODE from '@/public/icons/LinkSimple.svg'
import EMBEDCODEWHITE from '@/public/icons/linkSimpleWhite.svg'
import { t } from 'i18next'
import { useMediaQuery } from 'usehooks-ts'

type CareerHeaderType = {
    setIsGrid: any
    isGrid: boolean
    setIsCopy: any
    isCopy: boolean
}

export const CareerHeader: React.FC<CareerHeaderType> = ({
    setIsGrid,
    isGrid,
    setIsCopy,
    isCopy,
}) => {
    const [linkButtonHover, setLinkButtonHover] = useState<boolean>(false)
    const isMobile = useMediaQuery('(max-width:850px)')

    useEffect(()=>{
        if(isMobile){
            setIsGrid(false)
        }
    },[isMobile])

    const handleClick = () => {
        setIsCopy(true)
        setTimeout(() => setIsCopy(false), 5000)
    }

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h3 className=" font-bold text-[24px] text-[#111827]">
                    Recommended Jobs
                </h3>
                <p className=" text-zinc-500 text-[14px] md:w-[63%]">
                    Join our dynamic team as we seek passionate individuals to
                    fill key roles in diverse industries. Don't miss out on your
                    next career move — apply now and let us connect you with the
                    perfect job match.
                </p>
            </div>
            <div className="flex  gap-5">
                {!isMobile && (
                    <Button
                        onClick={() => setIsGrid((prev: boolean) => !prev)}
                        className={cn(
                            'w-[50px] h-[48px] border hover:bg-[#ecf0f4] bg-[#F6FBFF] rounded-full',
                            isGrid && ' bg-[#ecf0f4]/0  ',
                        )}
                    >
                        <Image
                            src={VERTICALICON}
                            className={cn(
                                'duration-300',
                                isGrid && 'rotate-90 duration-300',
                            )}
                            alt="icon"
                        />
                    </Button>
                )}
                <Button
                    disabled={isCopy}
                    variant="primary"
                    className={cn(
                        'font-normal disabled:opacity-50 rounded-[10px] hover:bg-whit w-[60px] sm:w-auto  hover:text-white md:px-[30px] gap-2 text-sm  ',

                        ' border-primary-500  border duration-500 text-white sm:hover:bg-primary-500 hover:bg-white',
                    )}
                    onClick={handleClick}
                >
                    <Image src={EMBEDCODEWHITE} alt="icon" />
                    <span className="hidden text-[16px] sm:inline-block font-bold">
                        Copy Url
                    </span>
                </Button>
            </div>
        </div>
    )
}
