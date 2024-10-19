'use client'

// import Quill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dynamic from "next/dynamic";
import { useMemo } from 'react';

type EditorProps = {
    // value: string
    field: any
    className?: string
}

const QuillEditor: React.FC<EditorProps> = ({ field, className }) => {
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
        // 'clean',
        'align',
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
                // ["link", "image"],
                ['link'],
                // ['clean'],
            ],
        },
        clipboard: {
            matchVisual: true,
        },
    }

    const Quill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

    return (
        <Quill
            theme="snow"
            // value={value}
            {...field}
            formats={formats}
            modules={modules}
            className={`${className}`}
        />
    )
}

export default QuillEditor
