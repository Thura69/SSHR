import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

export enum head_count_request_approve_status {
    WaitingApproval = 'WaitingApproval',
    Accepted = 'Accepted',
    Denied = 'Denied',
    Cancelled = 'Cancelled',
}

type HeadCountStatusBadgeProps = {
    rounded?: boolean
    value: head_count_request_approve_status
}

const HeadCountStatusBadge: React.FC<HeadCountStatusBadgeProps> = ({
    rounded = false,
    value,
}) => {
    const { t } = useTranslation('common')
    // Define a mapping of statuses to background colors
    const bgStatusColors = {
        WaitingApproval: 'bg-neutral-50',
        Accepted: 'bg-green-100',
        Denied: 'bg-warningColor',
        Cancelled: 'bg-neutral-50',
    }

    // Determine the background color based on the value

    const textStatusColors = {
        WaitingApproval: 'text-secondaryTextColor',
        Accepted: 'text-editActionBg',
        Denied: 'text-danger-999',
        Cancelled: 'text-danger-999',
    }

    const bgColor = bgStatusColors[value] || 'bg-neutral-50'
    const textColor = textStatusColors[value] || 'text-secondaryTextColor'
    const finalValue =
        value === head_count_request_approve_status.WaitingApproval
            ? 'Waiting Approval'
            : value
    console.log(textColor, 'textColor', value)
    return (
        <div
            className={cn(
                bgColor,
                ' rounded  w-[120px] mx-auto p-2 px-3  flex justify-center',
                rounded && 'rounded-[100px] p-2 w-fit',
            )}
        >
            <span className={cn(textColor, `text-xs font-medium text-center `)}>
                {t(finalValue)}
            </span>
        </div>
    )
}

export default HeadCountStatusBadge
