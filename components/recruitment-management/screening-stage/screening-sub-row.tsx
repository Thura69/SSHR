import React, { CSSProperties, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import RowDragHandleCell from '@/components/common/form/fields/draggable-column'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import EmployeeCellAction from '@/components/employee/forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeModal from '@/components/employee/forms/employee-modal'
import ScreenForm from './screen-form'
import CellAction from '@/components/common/table/cell-action'
import ScreenSubFrom from './screen-sub-from'

const ScreeningSubRows = ({ e, row }: { e: any; row: any }) => {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: e.id,
    })

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
        transition: transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: 'relative',
    }

    //business logics
    const { t } = useTranslation('screenStaging')
    const [item, setItem] = useState([])
    const { value, toggle, setTrue } = useBoolean(false)
    const {
        value: DetailValue,
        setFalse: DetailFalse,
        setTrue: DetailTrue,
    } = useBoolean(false)

    const {
        value: dValue,
        toggle: dToggle,
        setTrue: dSetTrue,
    } = useBoolean(false)

    const handleEdit = (row: any) => {
        const rowData = row.original
        setItem(rowData)
        toggle()
        DetailFalse()
    }

    const handleDetail = (row: any) => {
        const rowData = row.original
        setItem(rowData)
        toggle()
        DetailTrue()
    }

    const handleDelete = () => {}
    
    const selectedGrandSubMenu = { IsEdit: true, IsDelete: true }

    return (
        <TableRow
            key={e.id}
            ref={setNodeRef}
            style={style}
            className="bg-white p-0 "
        >
            <TableCell></TableCell>
            <TableCell className="flex p-3  justify-start  text-sideMenuTextColor2 items-center  w-[200px]">
                <RowDragHandleCell rowId={e.id} value={e.name} />
            </TableCell>
            <TableCell></TableCell>
            <TableCell className="p-0">
                <div className="w-[110px] ml-[22px]">
                    {e?.active! ? (
                        <ActiveBadge rounded />
                    ) : (
                        <InactiveBadge rounded />
                    )}
                </div>
            </TableCell>
            <TableCell className="p-0">
                <div className={'flex p-0 items-center justify-center '}>
                    <EmployeeCellAction
                        language="financialYear"
                        selectedGrandSubMenu={selectedGrandSubMenu}
                        setSingleCodeGenerator={setItem}
                        handleDelete={() => dToggle()}
                        handleEdit={handleEdit}
                        isDetail={false}
                        handleDetail={handleDetail}
                        row={row}
                    />
                    <DeleteConfirm
                        message={t('deleteText')}
                        title={t('deleteSub')}
                        isLoading={false}
                        toggle={dToggle}
                        open={dValue}
                        fun={handleDelete}
                    />
                    <EmployeeModal
                        title={`${t(DetailValue ? 'detail' : 'editSub')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={value}
                        open={value}
                        toggle={toggle}
                        form={
                            <ScreenSubFrom
                                editMode={value}
                                detailValue={DetailValue}
                                editData={item}
                                toggle={toggle}
                            />
                        }
                    />
                </div>
            </TableCell>
        </TableRow>
    )
}

export default ScreeningSubRows
