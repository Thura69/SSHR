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
import { CellActionProps } from '@/types/common'
import { truncate } from 'lodash'

function CellAction({
    language,
    setSingleCodeGenerator,
    selectedGrandSubMenu,
    handleDelete,
    handleEdit,
    row,
}: CellActionProps) {
    const { t } = useTranslation(language);

    


    const hideActionBtn = !selectedGrandSubMenu?.is_edit && !selectedGrandSubMenu?.is_delete ;

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
                { hideActionBtn ? (
                    ''
                ) : (
                    <DropdownMenuContent align="end">
                        {selectedGrandSubMenu?.is_edit && (
                            <DropdownMenuItem onClick={() => handleEdit(row)}>
                                {t('edit')}
                            </DropdownMenuItem>
                        )} 
                        {selectedGrandSubMenu?.is_delete && (
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
                 )} 
            </DropdownMenu>
        </div>
    )
}

export default CellAction
