import React, { CSSProperties } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    Row,
    useReactTable,
} from '@tanstack/react-table'

// needed for table body level scope DnD setup
import {
    closestCenter,
    DndContext,
    type DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    type UniqueIdentifier,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
// needed for row & cell level scope DnD setup
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { createColumnHelper } from '@tanstack/table-core'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { DndTableProps } from '@/types/common'

// Cell Component
const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
    const { attributes, listeners } = useSortable({
        id: rowId,
    })
    return (
        // Alternatively, you could set these attributes on the rows themselves
        <button
            type={'button'}
            className={'cursor-grab'}
            {...attributes}
            {...listeners}
        >
            🟰
        </button>
    )
}

// Row Component
const DraggableRow = ({ row }: { row: Row<any> }) => {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.Position_ID,
    })

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
        transition: transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: 'relative',
    }
    return (
        // connect row ref to dnd-kit, apply basic styles
        <TableRow
            ref={setNodeRef}
            style={style}
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className={cn('h-[52px] bg-white py-0 text-sm')}
                >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}
const columnHelper = createColumnHelper<any>()

// table Component
function DndTable({
    initialList,
    setOrderedList,
    setRequestToKeys,
}: DndTableProps) {
    const handleRemove = (rowID: string | number) => {
        const updatedList = initialList?.filter(
            (pList: any) => pList?.Position_ID !== rowID,
        )
        setOrderedList(updatedList)

        const treeKeys = new Set<string>()

        if (updatedList.length > 0) {
            updatedList?.map((data: any) => {
                treeKeys.add(data?.key)
            })

            const treeKeysArray = Array.from(treeKeys)
            setRequestToKeys(treeKeysArray)
        } else {
            setRequestToKeys([])
        }
    }
    const RequestToTable = [
        columnHelper.accessor('Company_Name', {
            header: 'Company',
        }),
        columnHelper.accessor('Location_Name', {
            header: 'Location',
        }),
        columnHelper.accessor('Branch_Name', {
            header: 'Branch',
        }),
        columnHelper.accessor('Department_Name', {
            header: 'Department',
        }),
        columnHelper.accessor('Section_Name', {
            header: 'Section',
        }),
        columnHelper.accessor('Position_Name', {
            header: 'Position',
        }),
        columnHelper.display({
            id: 'actions',
            header: ()=><p className='text-center'>Actions</p>,
            cell: ({ row }) => (
                <div className="flex justify-center ">
                    <Button
                        variant="ghost"
                        onClick={() => handleRemove(row.original.Position_ID)}
                    >
                        <Trash className="text-red-500" />
                    </Button>
                </div>
            ),
        }),
    ]

    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            // Create a dedicated drag handle column. Alternatively, you could just set up dnd events on the rows themselves.
            {
                id: 'drag-handle',
                header: 'Move',
                cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
                size: 60,
            },
            ...RequestToTable,
        ],
        [],
    )
    const [data, setData] = React.useState(initialList)

    const dataIds = React.useMemo<UniqueIdentifier[]>(
        () => data?.map(({ Position_ID }) => Position_ID),
        [data],
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.Position_ID, //required because row indexes will change
    })

    // reorder rows after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            const oldIndex = dataIds.indexOf(active.id)
            const newIndex = dataIds.indexOf(over.id)
            setData((data) => {
                return arrayMove(data, oldIndex, newIndex) //this is just a splice util
            })
            setOrderedList((data) => {
                return arrayMove(data, oldIndex, newIndex) //this is just a splice util
            })
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {}),
    )

    return (
        // NOTE: This provider creates div elements, so don't nest inside of <table> elements
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            autoScroll={false}
        >
            <div className="relative overflow-auto w-full max-h-[600px]">
                <Table>
                    <TableHeader className="bg-zinc-50 sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={cn(
                                            'border-gray-100 border-b bg-zinc-50',
                                            {
                                                'border-r':
                                                    header.index > 0 &&
                                                    header.index <
                                                        columns.length - 1,
                                            },
                                        )}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length > 0 ? (
                            <SortableContext
                                items={dataIds}
                                strategy={verticalListSortingStrategy}
                            >
                                {table.getRowModel().rows.map((row) => (
                                    <DraggableRow key={row.id} row={row} />
                                ))}
                            </SortableContext>
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </DndContext>
    )
}

export default DndTable
