import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

type ActiveBadgeProps ={
    rounded?:boolean
}

const InactiveBadge:React.FC<ActiveBadgeProps> = ({rounded=false}) => {
    const { t } = useTranslation('common')
    return (
        <div className={cn('bg-danger-100 w-[150px]  mx-auto  h-8  items-center px-3 rounded flex justify-center',rounded && 'rounded-[100px] p-2 w-auto')}>
            <span className="text-xs text-danger-500 font-medium">
                {t('inactive')}
            </span>
        </div>
    )
}

export default InactiveBadge
