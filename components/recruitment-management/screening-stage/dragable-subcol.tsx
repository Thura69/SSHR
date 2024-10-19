import RowDragHandleCell from '@/components/common/form/fields/draggable-column'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import ScreeningSubRows from '@/components/recruitment-management/screening-stage/screening-sub-row'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { handleClientScriptLoad } from 'next/script'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

interface DragableSubColProps {
    row: any
}

const DragableSubCol: React.FC<DragableSubColProps> = ({
    row,
}) => {

    const [data, setData] = useState(
        row.original.stages,
    )

  

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {}),
    )

    const dataIds = React.useMemo<any[]>(
        () => data?.map((e: any) => e.id),
        [data],
    )

    // Handle drag end
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            setData((data: unknown[]) => {
                const oldIndex = dataIds.indexOf(active.id)
                const newIndex = dataIds.indexOf(over.id)

                return arrayMove(data, oldIndex, newIndex)
            })
        }
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
            >
                {data.map((e: any, index: number) => (
                    <ScreeningSubRows key={e.id} e={e} row={row} />
                ))}
            </SortableContext>
        </DndContext>
    )
}

export default DragableSubCol
