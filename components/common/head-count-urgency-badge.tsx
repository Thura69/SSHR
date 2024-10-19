import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

export enum urgency_level_enum {
    medium = 'medium',
    high = 'high',
    low = 'low',
    critical = 'critical',
}

type HeadCountUrgencyBadgeProps = {
    rounded?: boolean
    value: urgency_level_enum
}

const HeadCountUrgencyBadge: React.FC<HeadCountUrgencyBadgeProps> = ({
    rounded = false,
    value,
}) => {
    const { t } = useTranslation('common')
    // Define a mapping of statuses to background colors
    const bgUrgencyColors = {
        low: 'bg-neutral-50',
        medium: 'bg-secondary-10',
        high: 'bg-yellow-50',
        critical: 'bg-warningColor',
    }

    // Determine the background color based on the value

    const textUrgencyColors = {
        low: 'text-secondaryTextColor',
        medium: 'text-secondary-500',
        high: 'text-yellow-100',
        critical: 'text-danger-999',
    }

    const bgColor = bgUrgencyColors[value] || 'bg-neutral-50'
    const textColor = textUrgencyColors[value] || 'text-secondaryTextColor'
    console.log(textColor, 'textColor', value)
    return (
        <div
            className={cn(
                bgColor,
                ' rounded  w-[120px] mx-auto p-2 px-3  flex justify-center',
                rounded &&
                    'rounded-[100px] p-2 w-[76px] h-[24px] flex justify-center items-center',
            )}
        >
            <span className={cn(textColor, `text-xs font-medium `)}>
                {t(capitalizeFirstLetter(value) as string)}
            </span>
        </div>
    )
}

export default HeadCountUrgencyBadge
