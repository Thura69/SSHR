import React, { useState, useRef, useCallback, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css'
import './email-quill.css'
import SearchDrop from '@/components/ui/custom/search-drop'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import InsertButton from './ButtonBlot'

import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
} from '@/components/ui/form'

interface Placeholder {
    label: string
    value: string
}

interface EmailEditorType {
    fieldName: string
    required: boolean
    languageName: string
}

const EmailEditor: React.FC<EmailEditorType> = ({
    fieldName,
    required,
    languageName,
}) => {
    const [editorHtml, setEditorHtml] = useState<string>('')
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [placeholderValue, setPlaceholderValue] = useState('')
    const quillRef = useRef<ReactQuill>(null)

    const handleEditorChange = useCallback((html: string) => {
        setEditorHtml(html)
    }, [])

    const { t } = useTranslation(languageName)

    useEffect(() => {
        console.log({ editorHtml })
    }, [editorHtml])

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
        'align',
        'button',
    ]

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{ color: [] }],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                ],
                [
                    { align: '' },
                    { align: 'center' },
                    { align: 'right' },
                    { align: 'justify' },
                ],
                ['link'],
            ],
        },
        clipboard: {
            matchVisual: true,
        },
    }

    const insertPlaceholder = useCallback(
        (placeholder: string) => {
            if (quillRef.current) {
                const quill = quillRef.current.getEditor()
                const range = quill.getSelection(true)

                if (range) {
                    // Insert placeholder using the custom blot
                    const quill = quillRef.current.getEditor()

                    const placeholderDelta = [
                      { insert: `${'dkdkd'}\n`, attributes: { placeholder: true } }]
                   
                    // quill.insertText(placeholderDelta);
                    //@ts-ignore
                    quill.setSelection(range.index + placeholder.length)
                    setEditorHtml(quill.root.innerHTML)

                  
                }
            }
        },
        [quillRef],
    )

    useEffect(() => {
        if (placeholderValue) {
            insertPlaceholder(placeholderValue)
            setPlaceholderValue('')
        }
    }, [placeholderValue, insertPlaceholder])

    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <div className="flex items-center justify-between">
                        <FormLabel className="font-light">
                            {t(fieldName)}{' '}
                            {required && (
                                <span className="ms-1 text-danger-500">*</span>
                            )}
                        </FormLabel>
                        <SearchDrop
                            popoverOpen={popoverOpen}
                            setPopoverOpen={setPopoverOpen}
                            value={placeholderValue}
                            setValue={setPlaceholderValue}
                            languageTitle="emailTemplate"
                            apiFields={{
                                value: 'Branch_ID',
                                label: 'Branch_Name',
                            }}
                        />
                    </div>
                    <div className="spec-markdown-editor">
                        <ReactQuill
                            ref={quillRef}
                            formats={formats}
                            modules={modules}
                            className="h-[400px]"
                            theme="snow"
                            value={editorHtml}
                            onChange={handleEditorChange}
                        />
                    </div>
                </FormItem>
            )}
        />
    )
}

export default EmailEditor
