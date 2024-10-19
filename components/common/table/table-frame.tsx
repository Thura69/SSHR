import ShowFinancials from '@/components/setting/public-holiday/modal/show-financials'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TableFrameProps } from '@/types/common'
import { cn } from '@/lib/utils'

function TableFrame({
    language,
    modalTrue,
    isWrite,
    isOutline = false,
    showFi,
    margin = 'mb-4 mt-[24px]',
}: TableFrameProps) {
    const { t } = useTranslation(language)
    return (
        <div className=" w-full max-w-full overflow-auto  setting-data-table">
            <div className={cn('flex items-start justify-between', margin)}>
                <div className="">
                    <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
                        {t('title')}
                    </h2>
                    <div className="mt-2">{showFi && <ShowFinancials />}</div>
                </div>
                {isWrite && (
                    <Button
                        variant="primary" 
                        className={cn(
                            'font-normal rounded-[12px]  hover:text-white gap-2 text-sm ',
                            isOutline &&
                                ' border-primary-500 bg-white border duration-500 text-primary-500 hover:bg-primary-500',
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
    )
}

export default TableFrame
