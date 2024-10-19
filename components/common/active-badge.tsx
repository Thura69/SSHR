import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

type ActiveBadgeProps ={
    rounded?:boolean
}

const ActiveBadge:React.FC<ActiveBadgeProps> = ({rounded=false}) => {
    const { t } = useTranslation('common')
    return (
        <div className={cn('bg-green-100 rounded w-[150px] mx-auto p-2 px-3  flex justify-center',rounded && 'rounded-[100px] p-2')}>
            <span className={cn('text-xs text-green-500 font-medium',rounded  &&'text-[#338C93]')}>
                {t('active')} 
            </span>
        </div>
    )
}

export default ActiveBadge
