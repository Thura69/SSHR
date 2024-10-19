'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBoolean } from 'usehooks-ts'
import { Confirm } from '@/components/common/modal/confirm'
import { deleteAudit } from '@/lib/audit-trail-api'
import useToast from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import menuStore from '@/state/zustand/menu'
import useUserCookie from '@/hooks/use-user'

import { useRouter } from 'next/navigation'
import { PositionColDefType } from '@/types/setting/position-type'
import { useDeletePosition } from '@/service/query-hooks/setting/use-position'
import ModalFrame from '@/components/common/modal/modal-frame'

const CellAction = ({ data }: { data: PositionColDefType }) => {
    const router = useRouter()
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('position')
    const { showNotification } = useToast()
    const { selectedMenuId, selectedGrandSubMenu } = menuStore()
    const {
        value: dValue,
        toggle: dToggle,
        setTrue: dSetTrue,
    } = useBoolean(false)
    const { deleteById, isPending } = useDeletePosition()
    const user = useUserCookie()

    const handleEdit = () => {
        router.push(`/settings/position/edit/${data.id}`)
    }
    const handldDeleteModalOpen = () => {
        dSetTrue()
    }

    //audit payload
    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: 'Position Page',
        Parent_Menu_ID: selectedMenuId!,
        Sub_Menu_ID: selectedGrandSubMenu?.parent_menu_id!,
        Child_Menu_ID: selectedGrandSubMenu?.menu_id!,
    }

    const deleteHandler = () => {
        deleteById(data.id, {
            onSuccess: (deletedData) => {
                // show notification
                showNotification({
                    message: deletedData.message,
                    type: 'success',
                })
                // close modal
                dToggle()

                // delete audit

                deleteAudit({
                    ...auditPayload,
                    ValueBefore: deletedData.data,
                    Record_Name: data.name,
                })
            },
            onError: (error) => {
                showNotification({
                    message: error.message,
                    type: 'danger',
                })
            },
        })
    }

    const hideActionBtn = !selectedGrandSubMenu?.is_edit && !selectedGrandSubMenu?.is_delete ;

    return (
        <div className={'flex justify-center w-[80px]'}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="hover:">
                <Button
                        variant="primary"
                        disabled={hideActionBtn}
                        className="h-8  bg-primary-600 hover:bg-primary-500 w-[1.75rem] rounded-[7px] p-0"
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 rotate-90" />
                    </Button>
                </DropdownMenuTrigger>

                {
                    hideActionBtn ? (''):(<DropdownMenuContent align="end">
                    {selectedGrandSubMenu?.is_edit && (
                        <DropdownMenuItem onClick={handleEdit}>
                            {t('edit')}
                        </DropdownMenuItem>
                    )}
                    {selectedGrandSubMenu?.is_delete && (
                        <DropdownMenuItem onClick={handldDeleteModalOpen}>
                            {t('delete')}
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>)
                }
            </DropdownMenu>

            <Confirm
                message={`${t('deleteText')}`}
                title={`${t('deleteTitle')}`}
                isLoading={isPending}
                toggle={dToggle}
                open={dValue}
                fun={deleteHandler}
            />
            <ModalFrame
                className="w-[500px]"
                open={value}
                closeBtn={true}
                toggle={toggle}
            >
            </ModalFrame>
        </div>
    )
}

export default CellAction
