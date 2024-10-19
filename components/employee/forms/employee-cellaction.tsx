import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { truncate } from 'lodash'
import Image from 'next/image'
import Trash from '@/public/cell-action-icons/trash.png'
import Vector from '@/public/cell-action-icons/Vector.png'
import Detail from '@/public/cell-action-icons/Vector(1).png'
import Add from '@/public/cell-action-icons/Vector(2).png'
import Copy from '@/public/cell-action-icons/content_copy.svg';

export interface CellActionProps {
    language: string
    selectedGrandSubMenu: any
    handleEdit: (row: any) => void
    handleDelete: (row: any) => void
    handleAdd?: (row: any) => void
    handleDetail: (row: any) => void
    row: any
    isDetail?:boolean
    setSingleCodeGenerator: (row: any) => void
}

function EmployeeCellAction({
    language,
    setSingleCodeGenerator,
    selectedGrandSubMenu,
    handleAdd,
    handleDelete,
    handleEdit,
    isDetail = true,
    handleDetail,
    row,
}: CellActionProps) {
    const { t } = useTranslation(language)

    const hideActionBtn =
        !selectedGrandSubMenu?.IsEdit && !selectedGrandSubMenu?.IsDelete

    return (
        <div
            className={`flex justify-center items-center  w-full ${hideActionBtn && 'cursor-not-allowed'}`}
        >
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    className={`${hideActionBtn && '  opacity-50 '} hover:`}
                >
                    <Button
                        variant="primary"
                        disabled={hideActionBtn}
                        className="h-8  bg-primary-600 hover:bg-primary-500 w-[1.75rem] rounded-[7px] p-0"
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 rotate-90" />
                    </Button>
                </DropdownMenuTrigger>
                {hideActionBtn ? (
                    ''
                ) : (
                    <DropdownMenuContent align="end">
                        {selectedGrandSubMenu?.IsAdd && (
                            <DropdownMenuItem
                                className="text-[#338C93] font-[600] focus:text-[#338C93] focus:bg-primary-100/50 flex cursor-pointer items-center justify-start gap-2"
                                onClick={() => {
                                    handleAdd && handleAdd(row)
                                    setSingleCodeGenerator(row)
                                }}
                            >
                                <Image alt="edit" src={Add} />
                                {t('addNew')}
                            </DropdownMenuItem>
                        )}
                        {isDetail && (
                            <DropdownMenuItem
                                className="text-blue-500 focus:text-blue-500 focus:bg-primary-100/50  cursor-pointer  font-[600] flex items-center justify-start gap-2"
                                onClick={() => handleDetail(row)}
                            >
                                <Image alt="edit" src={Detail} />
                                {t('Details')}
                            </DropdownMenuItem>
                        )}
                        {selectedGrandSubMenu?.IsCopy && (
                            <DropdownMenuItem
                                className="text-[#338C93] font-[600] focus:text-[#338C93] focus:bg-primary-100/50 flex cursor-pointer items-center justify-start gap-2"
                                onClick={() => {
                                    handleAdd && handleAdd(row)
                                    setSingleCodeGenerator(row)
                                }}
                            >
                                <Image alt="copy" src={Copy} />
                                {t('copy')}
                            </DropdownMenuItem>
                        )}

                        {selectedGrandSubMenu?.IsEdit && (
                            <DropdownMenuItem
                                className="text-primary-500 focus:text-primary-500 focus:bg-primary-100/50 cursor-pointer font-[600] flex items-center justify-start gap-2"
                                onClick={() => handleEdit(row)}
                            >
                                <Image alt="edit" src={Vector} />
                                {t('edit')}
                            </DropdownMenuItem>
                        )}
                        {selectedGrandSubMenu?.IsDelete && (
                            <DropdownMenuItem
                                className="text-danger-500 font-[600] focus:text-danger-500 focus:bg-primary-100/50 flex cursor-pointer items-center justify-start gap-2"
                                onClick={() => {
                                    handleDelete(row)
                                    setSingleCodeGenerator(row)
                                }}
                            >
                                <Image alt="edit" src={Trash} />
                                {t('delete')}
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        </div>
    )
}

export default EmployeeCellAction
