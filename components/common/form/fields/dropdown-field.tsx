import EmployeeInformationDrop from '@/components/employee/employee-information/employee-information-dropdown'
import { FormField, FormLabel, FormItem } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { useGetAllDropDownValues } from '@/service/query-hooks/get-all-dropdown-api'
import React, { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface DropDownFieldProps {
    fieldName: string
    required: boolean
    languageName: string
    fieldHeight: string
    placeHolder?:string
    fieldWidth: string
    apiFields: { label: string; value: string }
    requiredLabel?: boolean
    disabled?:boolean
}

const DropDownField: React.FC<DropDownFieldProps> = ({
    fieldName,
    required,
    languageName,
    fieldHeight,
    fieldWidth,
    placeHolder,
    disabled = false,
    apiFields,
    requiredLabel = true,
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageName)
    const [modifiedData, setModifiedData] = useState([])
    const { data, isLoading, isError } = useGetAllDropDownValues(
        'common/branches/distinct',
    )

    const memorizedData = useMemo(() => data?.data, [data])

    useEffect(() => {
        const modifiedDataResult = memorizedData?.map((item: any) => {
            return {
                label: item[apiFields.label],
                value: item[apiFields.value],
            }
        })

        setModifiedData(modifiedDataResult)
    }, [memorizedData])

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={cn(fieldWidth)}>
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
                        InputHi={fieldHeight}
                        placeHolder={placeHolder}
                        languageTitle={languageName}
                        additionalData={modifiedData || []}
                        fieldName={fieldName}
                        field={field}
                    />
                </FormItem>
            )}
        />
    )
}

export default DropDownField
