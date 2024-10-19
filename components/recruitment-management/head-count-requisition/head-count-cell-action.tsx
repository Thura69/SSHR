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
import Approve from '@/public/cell-action-icons/approve.png'
import Deny from '@/public/cell-action-icons/deny.png'

export interface CellActionProps {
    language: string
    selectedGrandSubMenu: any
    handleEdit: (row: any) => void
    handleDelete: (row: any) => void
    handleAdd?: (row: any) => void
    handleDetail: (row: any) => void
    row: any
    isDetail?: boolean
    setSingleCodeGenerator: (row: any) => void
    isHCDelete?: boolean
}

function HeadCountCellAction({
    language,
    setSingleCodeGenerator,
    selectedGrandSubMenu,
    handleAdd,
    handleDelete,
    handleEdit,
    isDetail = true,
    handleDetail,
    row,
    isHCDelete = false,
}: CellActionProps) {
    const { t } = useTranslation(language)

    // const hideActionBtn =
    //     !selectedGrandSubMenu?.IsEdit && !selectedGrandSubMenu?.IsDelete

    const hideActionBtn = false

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
                        {selectedGrandSubMenu?.IsEdit && (
                            <DropdownMenuItem
                                className="text-primary-500 focus:text-primary-500 focus:bg-primary-100/50 cursor-pointer font-[600] flex items-center justify-start gap-2"
                                onClick={() => handleEdit(row)}
                            >
                                <Image alt="approve" src={Approve} />
                                {t('approve-cell-action')}
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
                                {isHCDelete ? (
                                    <>
                                        <Image alt="delete" src={Trash} />
                                        {t('delete')}
                                    </>
                                ) : (
                                    <>
                                        <Image alt="cancel" src={Deny} />
                                        {t('cancel')}
                                    </>
                                )}
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                )}
            </DropdownMenu>
        </div>
    )
}

export default HeadCountCellAction
