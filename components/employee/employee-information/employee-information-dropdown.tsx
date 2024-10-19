import { MultiSelectDrop } from '@/components/common/form/multi-select-drop'
import { useState } from 'react'

const EmployeeInformationDrop = ({
    InputHi,
    additionalData,
    field,
    languageTitle,
    placeHolder,
    fieldName,
    disabled =  false
}: {
    InputHi: string
    additionalData: object
    field: any
    languageTitle: string
    fieldName: string,
    placeHolder?:string,
    disabled?:boolean
}) => {

    const [popoverOpen, setPopoverOpen] = useState(false);

    return (
        <MultiSelectDrop
            disabled={disabled}
            height={InputHi}
            placeHolder={placeHolder}
            popoverOpen={popoverOpen}
            setPopoverOpen={setPopoverOpen}
            languageTitle={languageTitle}
            additionalData={additionalData}
            fieldName={fieldName}
            field={field}
        />
    )
}

export default EmployeeInformationDrop
