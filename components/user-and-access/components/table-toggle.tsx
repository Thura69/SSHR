import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import React from 'react'
import { Grid2X2, List } from 'lucide-react'

interface Props {
    size: 'sm' | 'default' | 'lg' | null
    defaultValue: 'Card' | 'List'
    setSelected: Function
}

const TableToggle = ({ size, defaultValue, setSelected }: Props) => {
    return (
        <div className="flex justify-center items-center">
            <ToggleGroup
                type="single"
                size={size}
                variant="outline"
                defaultValue={defaultValue}
                onValueChange={(value: any) => setSelected(value)} // Call the setSelected function
            >
                <ToggleGroupItem value="Card">
                    <Grid2X2 className="h-4 w-4"></Grid2X2>
                </ToggleGroupItem>
                <ToggleGroupItem value="List">
                    <List className="h-4 w-4"></List>
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}

export default TableToggle
