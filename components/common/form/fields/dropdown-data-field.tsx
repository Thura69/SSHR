import EmployeeInformationDrop from '@/components/employee/employee-information/employee-information-dropdown'
import { FormField, FormLabel, FormItem } from '@/components/ui/form'
import { useGetAllDropDownValues } from '@/service/query-hooks/get-all-dropdown-api'
import React, { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface DropDownFieldProps {
    fieldName: string
    required: boolean
    languageName: string
    fieldHeight: string
    fieldWidth: string
    additionalData: { label: string; value: string }[]
    requiredLabel?: boolean
    placeHolder?: string
    disabled?:boolean
}

const DropDownDataField: React.FC<DropDownFieldProps> = ({
    fieldName,
    required,
    languageName,
    fieldHeight,
    fieldWidth,
    additionalData,
    placeHolder,
    requiredLabel = true,
    disabled = false
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)
    const [modifiedData, setModifiedData] = useState([])

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={fieldWidth}>
                    {requiredLabel && (
                        <FormLabel className='font-light'>
                            {t(fieldName)}{' '}
                            {required && (
                                <span className="ms-1 text-danger-500">*</span>
                            )}
                        </FormLabel>
                    )}
                    <EmployeeInformationDrop
                        disabled={disabled}
                        placeHolder={placeHolder!}
                        InputHi={fieldHeight}
                        languageTitle={languageName}
                        additionalData={additionalData || []}
                        fieldName={fieldName}
                        field={field}
                    />
                </FormItem>
            )}
        />
    )
}

export default DropDownDataField
