import React from 'react'
import { useTranslation } from 'react-i18next'

const ColorLegend = ({ color, title }: { color: string; title: string }) => {
    return (
        <div className="flex flex-row items-center justify-center  gap-2 md:gap-1">
            <p className={`rounded-full h-[12px] w-[12px] ${color} border`}></p>
            <p className="sideMenuTextColor2  text-xs md:text-[14px] text-start">
                {title}
            </p>
        </div>
    )
}

const HeadCountColorLegend = ({ language }: { language: string }) => {
    const { t } = useTranslation(language)
    return (
        <div className="flex flex-row justify-end items-center pb-3 gap-3 md:gap-6 ">
            <ColorLegend color="bg-neutral-300" title={t('Waiting Approval')} />
            <ColorLegend color="bg-success-400" title={t('Accepted')} />
            <ColorLegend color="bg-danger-999" title={t('Denied')} />
        </div>
    )
}

export default HeadCountColorLegend
