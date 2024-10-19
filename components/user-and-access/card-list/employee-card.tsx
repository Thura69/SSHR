import Image from 'next/image'
import React, { forwardRef, useState } from 'react'
import { Button } from '../../ui/button'
import { PencilIcon, TrashIcon } from '../../common/icons'
import { useRouter } from 'next/navigation'
import { useBoolean } from 'usehooks-ts'
import EmployeeCardModal from './employee-card-modal'
import { useTranslation } from 'react-i18next'
import { CustomDialogContent, Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { EmployeeCardType } from '@/types/user-and-access/user'
import DEFAULTUSER from '@/public/Rectangle 42000.png';


type EmployeeCardProps = React.ComponentPropsWithRef<'div'> & EmployeeCardType

// @ts-ignore
const EmployeeCard: React.FC<EmployeeCardProps> = forwardRef<
    HTMLDivElement,
    EmployeeCardProps
>(
    (
        {
            is_active,
            role_name,
            employee_no,
            employee_name,
            branch_name,
            position_name,
            department_name,
            company_name,
            location_name,
            section_name,
            employee_id,
            email,
            user_id,
            toggle,
            handleEmployee_ID,
            permission,
            ePhoto,
            description,
            role_id,
            company_id,
        },
        ref,
    ) => {
        const imgUrl = DEFAULTUSER
        const router = useRouter()
        const [imageError, setImageError] = useState(false)

        const handleImageError = () => {
            setImageError(true)
        }
        const { toggle: detailToggle } = useBoolean(false)
        const handleToggle = () => {
            toggle()
            handleEmployee_ID({
                role_id,
                company_id,
                description,
                employee_id,
                employee_name,
                is_active,
                user_id,
            })
            // handleEmployee_ID(deleteInfo)
        }
        const { t } = useTranslation('user')
        const handleDetailModal = () => {
            detailToggle()
        }
        return (
            <div
                ref={ref}
                className={`min-w-[290px] rounded-xl border border-collapse border-slate-200 ${
                    is_active ? 'bg-white' : 'bg-slate-100'
                } group hover:bg-neutral-100 transition-all`}
            >
                <div className="flex justify-between px-4">
                    <div className="flex gap-[5px] pe-[18px] py-[15px] group-hover:grayscale group-hover:blur-sm transition-all">
                        <div className="w-[43px] h-[43px] bg-neutral-300 rounded-2xl relative overflow-hidden">
                            {!imageError && ePhoto ? (
                                <Image
                                    src={`http://82.208.22.253:9000/uploads${ePhoto}`}
                                    alt="avatar"
                                    onError={handleImageError}
                                    fill
                                />
                            ) : (
                                <Image src={imgUrl} alt="avatar" fill />
                            )}
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="text-sm font-medium">
                                {employee_name}
                            </h2>
                            <span className="text-neutral-400 text-[10px]">
                                {employee_no}
                            </span>
                        </div>
                    </div>

                    <div className="items-center relative w-1/2 gap-[5px] justify-center group-hover:grayscale-0 hidden group-hover:flex transition-all">
                        <Dialog>
                            <DialogTrigger>
                                <Button
                                    variant="primary"
                                    className="h-[24px] rounded-lg text-xs font-normal bg-editActionBg"
                                    onClick={handleDetailModal}
                                >
                                    {t('table.action.detail')}
                                </Button>
                            </DialogTrigger>
                            <CustomDialogContent
                                className={cn(
                                    'right-10 top-9 w-6 h-6 border-slate-500 bg-slate-200',
                                )}
                            >
                                <EmployeeCardModal
                                    props={{
                                        email,
                                        company_name,
                                        employee_id,
                                        location_name,
                                        branch_name,
                                        department_name,
                                        section_name,
                                        position_name,
                                        user_id,
                                        employee_name,
                                        role_name,
                                        employee_no,
                                        is_active,
                                        ePhoto,
                                        description,
                                    }}
                                />
                            </CustomDialogContent>
                        </Dialog>
                        {permission.IsDelete ? (
                            <Button
                                size="icon"
                                variant="primary"
                                className="rounded-[7px] w-[24px] h-[24px] bg-editActionBg hover:opacity-90"
                                onClick={() =>
                                    router.push(
                                        `/user-and-access/user/edit-user/${employee_id}`,
                                    )
                                }
                            >
                                <PencilIcon width={14} height={14} />
                            </Button>
                        ) : null}
                        {permission.IsDelete ? (
                            <Button
                                size="icon"
                                variant="destructive"
                                className="rounded-[7px] w-[24px] h-[24px]"
                                onClick={handleToggle}
                            >
                                <TrashIcon
                                    width={14}
                                    height={14}
                                    defaultColor="#FFFFFF"
                                />
                            </Button>
                        ) : null}
                    </div>
                </div>

                <div className="grid grid-cols-2 px-[24px] py-[16px] gap-y-[15px] border-t border-slate-200 rounded-xl group-hover:blur-sm">
                    <div>
                        <EmployeeCardRoleLabel>
                            {t('table.filter.role')}
                        </EmployeeCardRoleLabel>
                        <EmployeeCardRoleContent>
                            {role_name}
                        </EmployeeCardRoleContent>
                    </div>
                    <div>
                        <EmployeeCardRoleLabel>
                            {t('table.filter.branch')}
                        </EmployeeCardRoleLabel>
                        <EmployeeCardRoleContent>
                            {branch_name}
                        </EmployeeCardRoleContent>
                    </div>
                    <div>
                        <EmployeeCardRoleLabel>
                            {t('table.filter.position')}
                        </EmployeeCardRoleLabel>
                        <EmployeeCardRoleContent>
                            {position_name}
                        </EmployeeCardRoleContent>
                    </div>
                    <div>
                        <EmployeeCardRoleLabel>
                            {t('table.filter.department')}
                        </EmployeeCardRoleLabel>
                        <EmployeeCardRoleContent>
                            {department_name}
                        </EmployeeCardRoleContent>
                    </div>
                </div>
                {/* <EmployeeCardModal open={toggleValue}></EmployeeCardModal> */}
            </div>
        )
    },
)

export default EmployeeCard

const EmployeeCardRoleLabel = ({ children }: { children: React.ReactNode }) => {
    return <span className="text-neutral-400 text-[10px]">{children}</span>
}

const EmployeeCardRoleContent = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return <h3 className="text-[13px] font-medium">{children}</h3>
}
