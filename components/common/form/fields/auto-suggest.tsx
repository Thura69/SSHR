import { useGetAllDropDownValues } from "@/service/query-hooks/get-all-dropdown-api"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import React, { useEffect, useMemo, useState } from 'react'
import { FormField, FormLabel, FormItem } from '@/components/ui/form'
import { cn } from "@/lib/utils"
import { AutoSuggestDrop } from "./multi-select-auto-suggest"


interface DropDownFieldProps {
    fieldName: string
    required: boolean
    languageName: string
    placeHolder:string
    fieldHeight: string
    fieldWidth: string
    apiFields: { label: string; value: string }
    requiredLabel?: boolean
    disabled?:boolean
}


const AutoSuggestField:React.FC<DropDownFieldProps> = ({
    fieldName,
    required,
    languageName,
    placeHolder,
    fieldHeight,
    fieldWidth,
    disabled = false,
    apiFields,
    requiredLabel = true,
})=>{

    const form = useFormContext();
    const { t } = useTranslation(languageName)
   
    const [modifiedData, setModifiedData] = useState([])
    const { data, isLoading, isError } = useGetAllDropDownValues(
        'main/branches/distinct',
    );

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
                    <AutoSuggestDrop
                        disabled={disabled}
                        languageTitle={languageName}
                        placeHolder={placeHolder}
                        additionalData={modifiedData || []}
                        fieldName={fieldName}
                        field={field}
                        height={fieldHeight}
                    />
                </FormItem>
            )}
        />
    )

}

export default AutoSuggestField;