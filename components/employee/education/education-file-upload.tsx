'use client'

import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Upload, Progress, UploadFile } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import {
    X,
    File,
    CloudUploadIcon,
    UploadCloud,
    Trash,
    Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COLORS } from '@/constants'
import { ICONS } from './education-icons'
import { cn } from '@/lib/utils'
import Dragger from 'antd/es/upload/Dragger'
import useToast from '@/hooks/use-toast'
import type { UploadProps } from 'antd'
import { useTranslation } from 'react-i18next'

interface UploadFileActions {
    download(): void
    preview(): void
    remove(): void
}

const DraggableUploadListItem = ({
    originNode,
    file,
    actions,
}: {
    originNode: any
    file: any
    actions: any
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: file.uid,
    })
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: 'move',
    }

    const [percent, setPercent] = useState(0)

    useEffect(() => {
        const duration = 2000 // 3 seconds
        const interval = 30 // Update every 30ms
        const increment = 100 / (duration / interval)

        const timer = setInterval(() => {
            setPercent((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    return 100
                }
                return prev + increment
            })
        }, interval)

        return () => clearInterval(timer)
    }, [])

    return (
        <div
            ref={setNodeRef}
            style={style}
            // prevent preview event when drag end
            className={isDragging ? 'is-dragging' : ' h-[50px]  w-full flex'}
            {...attributes}
            {...listeners}
        >
            <div className="flex w-full  justify-between items-center">
                <div className="flex w-full lg:w-[90%] items-center justify-start">
                    <div className="w-[50px] flex items-center justify-start h-[30px]">
                        {ICONS.file({ className: 'text-primary-500' })}
                    </div>

                    {percent === 100 && (
                        <div className="w-[20%]">
                            <p className=" truncate lg:w-[300px]  w-[100px] ">
                                {file.name}
                            </p>
                        </div>
                    )}
                    {percent !== 100 && (
                        <div className="w-[90%]">
                            <p className={`text-[#A0AEC0] text-sm`}>
                                Uploading...
                            </p>
                            <Progress
                                strokeColor={COLORS.primary[500]}
                                showInfo={false}
                                percent={percent}
                            />
                        </div>
                    )}
                </div>
                <div className="ml-2">
                    {percent === 100 ? (
                        <Trash2
                            onClick={() => actions.remove()}
                            className="w-5 h-5 text-danger-500 cursor-pointer"
                        />
                    ) : (
                        <X
                            onClick={() => actions.remove()}
                            className="w-5 h-5"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

const EducationFileUpload = ({
    fileList,
    setFileList,
}: {
    fileList: any
    setFileList: (prev: any) => void
}) => {
    const { showNotification } = useToast()
    const { t } = useTranslation('fileUpload')

    const [isBig, setIsBig] = useState(false)
    const uploadRef = useRef<any>(null)

    const props: UploadProps = {
        beforeUpload: (file, fileList) => {
            const maxFileSize = 10 * 1024 * 1024 // 250MB limit
            if (file.size > maxFileSize) {
                // message.error(`${file.name} file upload failed (exceeds 250MB)`);
                showNotification({
                    message: 'File size exceeds the limit of 1MB',
                    type: 'danger',
                })

                return false || Upload.LIST_IGNORE
            }
            return true
        },
    }

    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    })

    const onDragEnd = ({ active, over }: { active: any; over: any }) => {
        if (active.id !== over?.id) {
            setFileList((prev: any) => {
                const activeIndex = prev.findIndex(
                    (i: any) => i.uid === active.id,
                )
                const overIndex = prev.findIndex((i: any) => i.uid === over?.id)
                return arrayMove(prev, activeIndex, overIndex)
            })
        }
    }

    const onChange = ({ fileList: newFileList }: { fileList: any }) => {
        setFileList(newFileList)
    }

    const handleButtonClick = (e: any) => {
        uploadRef.current?.upload?.uploader?.onClick(e)
    }

    return (
        <div>
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                <SortableContext
                    items={fileList.map((i: any) => i.uid)}
                    strategy={verticalListSortingStrategy}
                >
                    <Dragger
                        {...props}
                        className=" flex  flex-col-reverse p-0"
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        fileList={fileList}
                        onChange={onChange}
                        maxCount={5}
                        itemRender={(originNode, file, fileList, actions) => (
                            <DraggableUploadListItem
                                originNode={originNode}
                                file={file}
                                actions={actions}
                            />
                        )}
                    >
                        <button
                            type="button"
                            disabled={fileList.length === 5 ? true : false}
                            className={cn(
                                `lg:text-center  
                                hover:text-primary-500  rounded-lg  min-h-[90px] px-5 py-3  text-gray-400  space-y-2 w-full text-[14px] flex  justify-center items-center flex-col border-dashed
                             disabled:cursor-not-allowed disabled:opacity-50  disabled:bg-danger-100/50 disabled:border-danger-300
                             
                            `,
                                fileList.length == 5 &&
                                    'border-danger-300 bg-danger-100/50',
                            )}
                        >
                            {ICONS.upload({
                                className: 'w-6 h-6 text-primary-500',
                                fill:
                                    fileList.length === 5
                                        ? COLORS.danger[500]
                                        : COLORS.primary[500],
                            })}
                            {fileList.length! === 5 ? (
                                <p className="text-danger-500 w-full ">
                                    {t('fileRemove')}
                                    {t('remove')}
                                </p>
                            ) : (
                                <div className="w-full space-y-1">
                                    {' '}
                                    <p className="font-[600] text-sm ">
                                        {t('click')}
                                    </p>
                                    <p className="text-xs">
                                        {fileList.length} {t('ofDocuments')}
                                    </p>
                                </div>
                            )}
                        </button>
                    </Dragger>
                </SortableContext>
            </DndContext>
        </div>
    )
}

export default EducationFileUpload
