import React, { useState, useRef, useCallback, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css'
import './email-quill.css'
import SearchDrop from '@/components/ui/custom/search-drop'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './button.css'
import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
} from '@/components/ui/form'
import { Placeholder } from 'react-select/animated'
import { useRouter } from 'next/navigation'

interface Placeholder {
    label: string
    value: string
}

interface EmailEditorType {
    fieldName: string
    required: boolean
    languageName: string
}

const Inline = Quill.import('blots/inline')

class Icon extends Inline {
    static create(value: any) {
        let node = super.create(value)
        const separatorNode = document.createTextNode('\u200B');


        if (value) {
            node.setAttribute('class', value)
            node.setAttribute('type', 'button')
            node.setAttribute('contenteditable', 'false')
        }

        node.appendChild(separatorNode);

        return node
    }

    static formats(domNode: any) {
        return domNode.getAttribute('class')
    }

    format(name: any, value: any) {
        if (name !== this.statics.blotName || !value)
            return super.format(name, value)
        if (value) {
            this.domNode.setAttribute('class', value)
        }
    }
}

Icon.blotName = 'icon'
Icon.tagName = 'button'

Quill.register(Icon)


const EmailEditorTest: React.FC<EmailEditorType> = ({
    fieldName,
    required,
    languageName,
}) => {
    const [editorHtml, setEditorHtml] = useState<string>('')
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [placeholderValue, setPlaceholderValue] = useState('')
    const quillRef = useRef<ReactQuill>(null)
    const router = useRouter()

    const handleEditorChange = useCallback(
        (html: string, delta: any, source: any, editor: any) => {},
        [],
    )

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
        'icon',
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
                ['link', 'image'],
            ],
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
                    const leafBefore = quill.getLeaf(range.index)[0]
                    const leafAfter = quill.getLeaf(range.index)[0]

                    const isIconBefore =
                        leafBefore &&
                        leafBefore?.parent.domNode.className === 'fa-icon-green'
                    const isIconAfter =
                        leafAfter &&
                        leafAfter?.parent.domNode.className === 'fa-icon-green'

                    const newPosition = range.index

                    if (!isIconBefore && !isIconAfter) {
                        quill.insertText(
                            newPosition,
                            `${placeholder}`,
                            'icon',
                            'fa-icon-green',
                        )
                        quill.insertText(
                            newPosition + placeholder.length,
                            '\u200B',
                        )
                    }

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

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor()

            quill.on('editor-change', (eventName: any, ...args: any) => {
                if (eventName === 'text-change') {
                    handleTextChange(args[0], args[2], quill)
                }
            })

            // quill.on('text-change', (delta:any, oldDelta:any, source:any) => {
            //     handleTextChange(delta, source, quill)
            // })
        }
    }, [])

    const handleTextChange = (delta: any, source: any, quill: any) => {
        if (source === 'api') {
            const cursorPosition = quill.getSelection().index

            if (cursorPosition !== undefined) {
                const leafBefore = quill.getLeaf(cursorPosition - 1)[0]
                const leafAfter = quill.getLeaf(cursorPosition + 1)[0]

                const isIconBefore =
                    leafBefore &&
                    leafBefore?.parent.domNode.className === 'fa-icon-green'
                const isIconAfter =
                    leafAfter &&
                    leafAfter?.parent.domNode.className === 'fa-icon-green'

                if (isIconBefore || isIconAfter) {
                    const lastDelta = delta.ops[delta.ops.length - 1]

                    if (
                        lastDelta &&
                        lastDelta.insert &&
                        typeof lastDelta.insert === 'string'
                    ) {
                        quill.deleteText(
                            cursorPosition - placeholderValue?.length,
                            1,
                        )
                    }
                }
            }
        }

        setEditorHtml(quill.root.innerHTML)
    }

    const handlePreview = () => {
        router.push('/recruitment/email-template/preview-email-template')
    }

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
                    <div>
                        <div className="spec-markdown-editor ">
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
                        <div className=" mt-[50px]  flex items-center justify-end">
                            <button
                                onClick={handlePreview}
                                type="button"
                                className="w-[53px] h-[20px] border text-[10px] rounded text-center "
                            >
                                Preview
                            </button>
                        </div>
                    </div>
                </FormItem>
            )}
        />
    )
}

export default EmailEditorTest
