'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormField, FormLabel, FormItem, FormControl } from '@/components/ui/form'
import QuillEditor from '../../quill-editor'
import { MultiSelectDrop } from '../multi-select-drop'
import { useGetAllDropDownValues } from '@/service/query-hooks/get-all-dropdown-api'

type DatePickerFieldProps = {
    fieldName: string,

    languageName: string
    required: boolean
    fieldHeight: string
    fieldWidth: string
    placeholder?: string
    requiredLabel?: boolean
    disabled?: boolean
}

const QuillEditorField: React.FC<DatePickerFieldProps> = ({
    fieldName,
    languageName,
    required,
    fieldHeight,
    fieldWidth,
    placeholder = 'placeHolder',
    requiredLabel = true,
    disabled = false,
}) => {

    const form = useFormContext()
    const { t } = useTranslation(languageName);
    const [modifiedData, setModifiedData] = useState([])
   

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                   <div  className='flex  items-center justify-between'>
                   <FormLabel className='font-light'>       
                            {t(fieldName)}{' '}
                            {required && (
                                <span className="ms-1 text-danger-500">*</span>
                            )}
                     </FormLabel>
                     
                   </div>
                    <div className="spec-markdown-editor">
                        <QuillEditor
                            className="prose max-w-[100%] rounded-md focus-within:outline-none focus-within:ring-offset-2 focus-within:ring-2 focus-within:ring-primary-500 " 
                            field={field}
                        />
                    </div>
                </FormItem>
            )}
        />
    )
}

export default QuillEditorField
