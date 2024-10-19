import tableSelectStore from '@/state/zustand/table-select-state'
import { Checkbox } from '@/components/ui/checkbox'
import { Table } from '@tanstack/react-table'

const SelectHeader = <T,>({ table }: { table: Table<T> }) => {
    const { setIsAllSelected } = tableSelectStore()

    return (
        <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-[#A0AEC0] rounded-[7px]  border-[2px] mt-1"
      />
    )
}

export default SelectHeader
