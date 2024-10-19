import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table'
import React, { CSSProperties } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { CSS } from '@dnd-kit/utilities'

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    updateFun?: () => void
    handleRemoveClick?: (id: number) => void
    setData?: any
    className?: string
    loading?: boolean
    handleGetTableObj?: (table: any) => void
}

export function DataDndTable<TData, TValue>({
    columns,
    data,
    setData,
    className,
    handleRemoveClick,
    updateFun,
    loading = false,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row: any) => row.id,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
        pageCount:5
    })

    //draging component
    // Row Component
    const DraggableRow = ({ row }: { row: Row<any> }) => {
        const { transform, transition, setNodeRef, isDragging } = useSortable({
            id: row.original.id,
        })

        const style: CSSProperties = {
            transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
            transition: transition,
            opacity: isDragging ? 0.8 : 1,
            zIndex: isDragging ? 1 : 0,
            position: 'relative',
        }
        return (
            // connect row ref to dnd-kit, apply important styles
            <TableRow
               
                ref={setNodeRef}
                style={style}
                className=" hover:bg-[#f1fcfc] bg-white cursor-pointer border-b border-[#E2E8F0] "
            >
                {row.getVisibleCells().map((cell: any) => (
                    <TableCell className=''  key={cell.id}>
                        <div className="h-fit ">
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                            )}
                        </div>
                    </TableCell>
                ))}
            </TableRow>
        )
    }

    //ids
    const dataIds = React.useMemo<any[]>(
        () => data?.map((e: any) => e.id),
        [data],
    )

    //handle drag end
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

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {}),
    )

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <div className="z-10 relative max-h-[340px] overflow-auto w-full">
                <Table className={cn(className, 'p-0 m-0')}>
                    <TableHeader className="bg-[#EEFDFD] hover:bg-[#EEFDFD] sticky   h-[51px]   top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className='bg-[#EEFDFD]  hover:bg-[#EEFDFD]'
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                   )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody >
                        <SortableContext
                            items={dataIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {table.getRowModel().rows.map((row) => (
                                  <DraggableRow key={row.id} row={row} />
                            ))}
                        </SortableContext>
                    </TableBody>
                </Table>
            </div>
        </DndContext>
    )
}
