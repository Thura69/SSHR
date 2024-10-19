'use client'
import React, { HTMLProps } from 'react'
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    flexRender,
    ExpandedState,
} from '@tanstack/react-table'
import { DndContext, closestCenter, useDroppable, useDraggable, DragOverlay } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { makeData, Person } from './makeData'
import RowDragHandleCell from '@/components/common/form/fields/draggable-column'

const TestPage = () => {
    const columns = React.useMemo<ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'firstName',
                header: ({ table }) => (
                    <>
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler(),
                            }}
                        />{' '}
                        <button
                            {...{
                                onClick: table.getToggleAllRowsExpandedHandler(),
                            }}
                        >
                            {table.getIsAllRowsExpanded() ? '👇' : '👉'}
                        </button>{' '}
                        First Name
                    </>
                ),
                cell: ({ row, getValue }) => (
                    <div
                        style={{
                            paddingLeft: `${row.depth * 2}rem`,
                        }}
                        className="border-2 bg-blue-200"
                    >
                        <div>
                            {row.getCanExpand() ? (
                                <>
                                    <button
                                        {...{
                                            onClick: row.getToggleExpandedHandler(),
                                            style: { cursor: 'pointer' },
                                        }}
                                    >
                                        {row.getIsExpanded() ? '👇' : '👉'}
                                    </button>
                                    {getValue()}
                                </>
                            ) : (
                                <RowDragHandleCell
                                    value={row.original.firstName}
                                    rowId={row.id}
                                />
                            )}
                        </div>
                    </div>
                ),
                footer: (props) => props.column.id,
            },
            {
                accessorFn: (row) => row.lastName,
                id: 'lastName',
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'age',
                header: () => 'Age',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: (props) => props.column.id,
            },
        ],
        [],
    )

    const [data, setData] = React.useState(() => makeData(10, 3, 2))
    const [expanded, setExpanded] = React.useState<ExpandedState>({})
    const [activeId, setActiveId] = React.useState(null)

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        debugTable: true,
    })

    const handleDragStart = (event:any) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = (event:any) => {
        const { active, over } = event
        if (!over) return

        if (active.id !== over.id) {
            setData((prevData) => {
                const newData = [...prevData]
                //@ts-ignore
                const activeIndex = newData.findIndex((item) => item?.id === active.id)
                //@ts-ignore

                const overIndex = newData.findIndex((item) => item?.id === over.id)
                return arrayMove(newData, activeIndex, overIndex)
            })
        }
        setActiveId(null)
    }

    const DraggableRow = ({ row }:{row:any}) => {
        const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: row.id })

        const style = {
            transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
            transition,
        }

        return (
            <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
                {row.getVisibleCells().map((cell:any) => (
                    <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
            </tr>
        )
    }

    return (
        <div className="p-2">
            <div className="h-2" />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <SortableContext items={table.getRowModel().rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
                    <table>
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <th key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder ? null : (
                                                    <div>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {header.column.getCanFilter() ? (
                                                            <div></div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            </th>
                                        )
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <DraggableRow row={row} />
                                   
                                    {  //@ts-ignore
                                    row.getIsExpanded() && row?.original.subRows.map((subRow) => (
                                    //@ts-ignore

                                        <DraggableRow key={subRow?.id} row={subRow} />
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </SortableContext>
                <DragOverlay>
                    {activeId ? (
                        <div className="dragging-overlay">
                            {table.getRowModel().rows.find((row) => row.id === activeId)?.original.firstName}
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}

export default TestPage
