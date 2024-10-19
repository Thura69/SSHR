import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'

type checkBox = {
    id?: number
    title?: string
    onChange: (id: any) => void
    check?: any
}

const CheckBox = ({ id, title, onChange, check }: checkBox) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                checked={check}
                id={`${id}`}
                onCheckedChange={() => onChange(id)}
            />
            <label
                htmlFor={`${id}`}
                className="text-xs  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {title}
            </label>
        </div>
    )
}

export default CheckBox
