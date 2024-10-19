import { DataDndTable } from '@/components/employee/forms/rows-drag-and-drop'
import { useState } from 'react'
import { columns } from './screening-table-columns'
import {
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import RowDragHandleCell from '@/components/common/form/fields/draggable-column'
import { cn } from '@/lib/utils'
import ScreenStageDetail from './screen-stage-detail'

const modifiedData = [
    {
        id: 1,
        name: 'Phone Screening',
    },
    {
        id: 2,
        name: 'Phone Screening',
    },
    {
        id: 3,
        name: 'Phone Screening',
    },
]


const ScreeningStageTable = ({detail}:{detail:boolean}) => {
    const [data, setData] = useState(modifiedData)
    return (
        <div>
            
            {
                detail ? <ScreenStageDetail/> : <DataDndTable
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                setData={setData}
                data={data || []}
            />
            }
           
        </div>
    )
}

export default ScreeningStageTable
