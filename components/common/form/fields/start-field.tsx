import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Rating } from 'react-simple-star-rating'
import FILLSTAR from '@/public/Vector(3).svg'
import UNFILLSTAR from '@/public/Vector(4).svg'
import Image from 'next/image'

interface StartRatingSelectType {
    translation: string
    nuqsField: string
    value: any
    setValue: any
    title: any
    fieldName: any
}

const StartrRatingSelect: React.FC<StartRatingSelectType> = ({
    translation,
    nuqsField,
    value,
    setValue,
    title,
    fieldName,
}) => {
    const { t } = useTranslation(translation)
    const [rating, setRating] = useState(0)

    const onPointerEnter = () => console.log('Enter')
    const onPointerLeave = () => console.log('Leave')
    const onPointerMove = (value: number, index: number) =>
        console.log(value, index)

    const handleRating = (rate: number) => {
        setRating(rate)
        // other logic
    }

    return (
        <section
            className={cn(
                'w-full sm:w-[172px] duration-600  animate-fade-item flex flex-col gap-2 h-[63px]',
            )}
        >
            <p className="font-[400] text-[14px] text-sideMenuTextColor2">
                {t(`${fieldName}`)}
            </p>
            <Rating
                rtl={false}
                showTooltip={false}
                onClick={handleRating}
                SVGstyle={{ display: 'inline', width: '30px' }}
                fillIcon={
                    <Image
                        className="w-[30px] shrink-0"
                        src={UNFILLSTAR}
                        alt="star"
                    />
                }
                emptyIcon={
                    <Image
                        className="w-[30px] shrink-0"
                        src={FILLSTAR}
                        alt="star"
                    />
                }
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                /* Available Props */
            />
        </section>
    )
}

export default StartrRatingSelect
