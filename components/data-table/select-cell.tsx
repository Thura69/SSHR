import tableSelectStore from '@/state/zustand/table-select-state'
import { Checkbox } from '@/components/ui/checkbox'
import { Row } from '@tanstack/react-table'
const SelectCell = <T,>({ row }: { row: Row<T> }) => {
    const { setIsAllSelected } = tableSelectStore()

    return (
        <div className=" text-center">
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => {
                    row.toggleSelected(!!value)
                    setIsAllSelected(false)
                }}
                aria-label="Select row"
              className="border-[#A0AEC0] rounded-[7px]  border-[2px] mt-1"
            />
        </div>
    )
}

export default SelectCell
