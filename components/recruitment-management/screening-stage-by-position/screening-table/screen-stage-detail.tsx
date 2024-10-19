import RowDragHandleCell from '@/components/common/form/fields/draggable-column'
import {
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

const headerTypo = 'text-[14px]  font-bold text-[#687588]'

const ScreenStageDetail = () => {
    const { t } = useTranslation('screeningStageByPosition')

    return (
        <table className="w-full text-[14px] text-[#8A8A8E]">
            <TableHeader className="bg-[#EEFDFD] sticky   h-[51px]   top-0 z-10">
                <TableRow>
                    <TableHead className={headerTypo}>
                        {t('screeningStage')}
                    </TableHead>
                    <TableHead className={cn(headerTypo, 'text-right')}>
                        {t('actions')}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableRow className="text-secondaryTextColor hover:bg-white">
                <TableCell className="p-2 ">
                    <RowDragHandleCell
                        disabled
                        value={'Phone Screening'}
                        rowId={'1'}
                    />
                </TableCell>
                <TableCell className="text-right"></TableCell>
            </TableRow>
            <TableRow className="text-secondaryTextColor hover:bg-white">
                <TableCell className="p-2">
                    <RowDragHandleCell
                        disabled
                        value={'Phone Screening'}
                        rowId={'1'}
                    />
                </TableCell>
                <TableCell className="text-right"></TableCell>
            </TableRow>
            <TableRow className="text-secondaryTextColor hover:bg-white">
                <TableCell className="p-2">
                    <RowDragHandleCell
                        disabled
                        value={'Phone Screening'}
                        rowId={'1'}
                    />
                </TableCell>
                <TableCell className="text-right"></TableCell>
            </TableRow>
        </table>
    )
}

export default ScreenStageDetail
