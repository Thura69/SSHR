import React from 'react'
import DropDownField from './fields/dropdown-field'
import { cn } from '@/lib/utils'

export const SelectStatus = ({ placeHolder }: { placeHolder: string }) => {
    return (
        <DropDownField
            fieldName="softSkills"
            disabled={false}
            required={true}
            requiredLabel={false}
            placeHolder={placeHolder}
            languageName={'jobOpening'}
            fieldHeight={cn(' w-full')}
            fieldWidth={''}
            apiFields={{
                value: 'branch_id',
                label: 'branch_name',
            }}
        />
    )
}
