import { Button } from '@/components/ui/button'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface CellActionProps {
    language: string
    selectedGrandSubMenu: any
    handleEdit: (row: any) => void
    handleDelete: (row: any) => void
    row: any
    setSingleCodeGenerator: (row: any) => void
}

const CellAction = ({
    language,
    setSingleCodeGenerator,
    selectedGrandSubMenu,
    handleDelete,
    handleEdit,
    row,
}: CellActionProps) => {
    const { t } = useTranslation(language)

    return (
        <div className={'flex  justify-center items-center  w-full'}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="hover:">
                    <Button variant="primary" className="h-8  bg-primary-600 hover:bg-primary-500 w-[1.75rem] rounded-[7px] p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 rotate-90" />
                    </Button>
                </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">

                            <DropdownMenuItem onClick={() => handleEdit(row)}>
                                {t('edit')}
                            </DropdownMenuItem>

                        {selectedGrandSubMenu?.IsDelete && (
                            <DropdownMenuItem
                                onClick={() => {
                                    handleDelete(row)
                                    setSingleCodeGenerator(row)
                                }}
                            >
                                {t('delete')}
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>

            </DropdownMenu>
        </div>
    )
}

export default CellAction
