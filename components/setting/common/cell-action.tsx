import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBoolean } from 'usehooks-ts'
import SettingModal from '@/components/setting/common/setting-modal'
import { Confirm } from '@/components/common/modal/confirm'
import { deleteAudit } from '@/lib/audit-trail-api'
import useToast from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import useMenu from '@/state/zustand/menu'
import useUserCookie from '@/hooks/use-user'
import { useDeleteSetting } from '@/service/query-hooks/setting/use-setting-api'
import { urlMapObj } from '@/service/apis/setting/setting-map-obj'
import { SettingColumnDefType, menuTypes } from '@/types/setting'

const CellAction = ({ data }: { data: SettingColumnDefType }) => {
    const { selectedMenuId, selectedGrandSubMenu } = useMenu()
    // @ts-ignore
    const menu = urlMapObj[selectedGrandSubMenu.Web_URL as menuTypes]
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation(menu)
    const { showNotification } = useToast()

    const {
        value: dValue,
        toggle: dToggle,
        setTrue: dSetTrue,
    } = useBoolean(false)

    const { deleteById, isPending } = useDeleteSetting(menu)
    const user = useUserCookie()

    const handleModalOpen = () => {
        setTrue()
    }
    const handldDeleteModalOpen = () => {
        dSetTrue()
    }

    const editData = {
        name: data.name,
        description: data.description,
        isActive: data.status,
        id: data.id,
    }

    //audit payload
    const auditPayload = {
        Is_Mobile: false,
        Emp_Name: user?.employee_name!,
        Page_Name: selectedGrandSubMenu?.menu_name + '  Page',
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
    };

  


    const hideActionBtn =
        !selectedGrandSubMenu?.is_edit && !selectedGrandSubMenu?.is_delete
    
    return (
        <div className={`flex  bg-white  justify-center items-center  w-full ${hideActionBtn && 'cursor-not-allowed'}`}>
            <DropdownMenu>
                <DropdownMenuTrigger
                    asChild
                    className={`${hideActionBtn && ' border-2 bg-blue-500 opacity-50 '} hover:`}
                >
                    <Button
                        variant="primary"
                        disabled={hideActionBtn}
                        className={`h-8  bg-primary-600 hover:bg-primary-500 w-[1.75rem] rounded-[7px]  p-0`}
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4 rotate-90" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {selectedGrandSubMenu?.is_edit && (
                        <DropdownMenuItem onClick={handleModalOpen}>
                            {t('edit')}
                        </DropdownMenuItem>
                    )}
                    {selectedGrandSubMenu?.is_delete && (
                        <DropdownMenuItem onClick={handldDeleteModalOpen}>
                            {t('delete')}
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* edit m */}
            <SettingModal
                open={value}
                title={`${t('editRecord')}`}
                toggle={toggle}
                editMode={true}
                editData={editData}
            />
            <Confirm
                message={`${t('deleteText')}`}
                title={`${t('deleteTitle')}`}
                isLoading={isPending}
                toggle={dToggle}
                open={dValue}
                fun={deleteHandler}
            />
        </div>
    )
}

export default CellAction
