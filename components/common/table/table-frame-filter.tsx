import ShowFinancials from '@/components/setting/public-holiday/modal/show-financials'
import { Button } from '@/components/ui/button'
import { ChevronDown, Filter, PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { COLORS } from '@/constants'
import EmployeeFilterSheet from '@/components/employee/employee-filter-sheet'
import Image from 'next/image'
import SOLARDOWNLOAD from '@/public/assets/solar_download-bold.png'
import EMBEDCODE from '@/public/icons/LinkSimple.svg'
import EMBEDCODEWHITE from '@/public/icons/linkSimpleWhite.svg'
import { useRouter } from 'next/navigation'

export interface TableFrameProps {
    language: string
    isOutline?: boolean
    modalTrue: () => void
    subTitle: boolean
    isDownload?: boolean
    isWrite: boolean
    showFi?: boolean
    margin?: string
    download?: boolean
    viewCareers?: boolean
    embedCode?: boolean
    open: string
    setOpen: any
}

function TableFrameFilter({
    language,
    modalTrue,
    isWrite,
    isOutline = false,
    showFi,
    download = false,
    viewCareers = false,
    embedCode = false,
    open,
    setOpen,
    margin = 'mb-4 mt-[24px]',
}: TableFrameProps) {
    const { t } = useTranslation(language)
    const router = useRouter()

    const [linkButtonHover, setLinkButtonHover] = useState<boolean>(false)

    return (
        <div className=" w-full max-w-full overflow-auto  setting-data-table">
            <div
                className={cn(
                    'flex items-center   gap-5 justify-between',
                    margin,
                )}
            >
                <div className="">
                    <h2 className="font-bold min-w-[150px]  text-primary-500  text:md sm:text-2xl">
                        {t('title')}
                    </h2>
                    <div className="mt-2">{showFi && <ShowFinancials />}</div>
                </div>
                <div className="flex space-x-4">
                    {embedCode && (
                        <Button
                            variant="primary"
                            onMouseEnter={() => setLinkButtonHover(true)}
                            onMouseLeave={() => setLinkButtonHover(false)}
                            className={cn(
                                'font-normal rounded-[10px] hover:bg-whit w-[60px] sm:w-auto  hover:text-white md:px-[30px] gap-2 text-sm  ',
                                isOutline &&
                                    ' border-primary-500 bg-white border duration-500 text-primary-500 sm:hover:bg-primary-500 hover:bg-white',
                            )}
                            onClick={modalTrue}
                        >
                            <Image
                                className="w-[16px] sm:w-[24px]"
                                src={linkButtonHover ? EMBEDCODEWHITE : EMBEDCODE}
                                alt="icon"
                            />
                            <span className="hidden text-[16px] sm:inline-block font-bold">
                                {t('embedCode')}
                            </span>
                        </Button>
                    )}
                    {viewCareers && (
                        <Button
                            variant="primary"
                            className={cn(
                                'font-normal rounded-[10px] hover:bg-whit w-[60px] sm:w-auto  hover:text-white md:px-[30px] gap-2 text-sm  ',
                                isOutline &&
                                    ' border-primary-500 bg-white border duration-500 text-primary-500 sm:hover:bg-primary-500 hover:bg-white',
                            )}
                            onClick={() =>
                                router.push(
                                    '/recruitment/job-opening/career',
                                )
                            }
                        >
                            <span className="hidden text-[16px] sm:inline-block font-bold">
                                {t('viewCareers')}
                            </span>
                        </Button>
                    )}
                    {download && (
                        <div className="w-[45px] cursor-pointer hover:bg-[#e3e8ec]   h-[45px] flex items-center justify-center rounded-full  bg-[#F6FBFF] ">
                            <Image
                                src={SOLARDOWNLOAD}
                                className="w-[24px] h-[24px]"
                                alt="solar"
                            />
                        </div>
                    )}
                    <Button
                        variant="primary"
                        className={cn(
                            'font-normal rounded-[10px] hover:bg-whit w-[60px] sm:w-auto  hover:text-white md:px-[30px] gap-2 text-sm  ',
                            isOutline &&
                                ' border-primary-500 bg-white border duration-500 text-primary-500 sm:hover:bg-primary-500 hover:bg-white',
                        )}
                        onClick={() =>
                            setOpen((value: string) => {
                                if (value === 'open') return 'close'

                                return 'open'
                            })
                        }
                    >
                        <Filter
                            fill={open === 'open' ? 'white' : 'white'}
                            className="w-[16px] sm:w-[24px]"
                        />
                        <span className="hidden text-[16px] sm:inline-block">
                            {t('Filter')}
                        </span>
                        <span className="hidden sm:block">|</span>
                        <ChevronDown
                            className={cn(
                                'size-4 hidden sm:block font-bold scale-150',
                                open === 'open' && 'rotate-180',
                            )}
                        />
                    </Button>
                    {isWrite && (
                        <Button
                            variant="primary"
                            className={cn(
                                'font-normal rounded-[10px] hover:bg-whit w-[60px] sm:w-auto  hover:text-white md:px-[30px] gap-2 text-sm  ',
                                isOutline &&
                                    ' border-primary-500 bg-white border duration-500 text-primary-500 sm:hover:bg-primary-500 hover:bg-white',
                            )}
                            onClick={modalTrue}
                        >
                            <PlusIcon className="size-4" />
                            <span className="hidden text-[16px] sm:inline-block">
                                {t('addNew')}
                            </span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TableFrameFilter
