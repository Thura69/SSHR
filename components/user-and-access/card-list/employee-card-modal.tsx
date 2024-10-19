import React, { FC, useState } from 'react'
import { DialogHeader } from '@/components/ui/dialog'
import Image from 'next/image'
import { Label } from '@radix-ui/react-label'
import { useTranslation } from 'react-i18next'
import { EmployeeModalProps } from '@/types/user-and-access/user'
import DEFAULTUSER from '@/public/Rectangle 42000.png'

interface EmployeeCardModalProps {
    props?: EmployeeModalProps
}

const EmployeeCardModal: FC<EmployeeCardModalProps> = ({ props }) => {
    const imgUrl = DEFAULTUSER
    const { t } = useTranslation('user')
    const { t: commonT } = useTranslation('common')
    const [imageError, setImageError] = useState(false)

    const handleImageError = () => {
        setImageError(true)
    }
    return (
        <div className="border-2 border-slate-300 rounded-xl p-4 ">
            <DialogHeader>
                <section>
                    <div className="flex justify-between">
                        <div className="grid grid-rows-1 gap-4 sm:grid-cols-2">
                            <div className="w-[100px] h-[100px] bg-neutral-300 rounded-2xl relative overflow-hidden">
                                {!imageError && props?.ePhoto ? (
                                    <Image
                                        src={`http://82.208.22.253:9000/uploads${props?.ePhoto}`}
                                        alt="avatar"
                                        onError={handleImageError}
                                        fill
                                    />
                                ) : (
                                    <Image src={imgUrl} alt="avatar" fill />
                                )}
                            </div>
                            <div className="grid grid-rows-2 gap-2">
                                <div className="grid grid-rows-2">
                                    <span className="text-left text-neutral-400 text-sm">
                                        {t('form.name')}
                                    </span>
                                    <p className="text-md break-words text-left font-semibold">
                                        {props?.employee_name}
                                    </p>
                                </div>

                                <div className="grid grid-rows-2">
                                    <span className="text-left text-neutral-400 text-sm ">
                                        {t('form.no')}
                                    </span>
                                    <p className="text-md break-words text-left font-semibold">
                                        {props?.employee_no}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start pr-12 gap-3">
                            <div
                                className={`px-2 py-1 rounded-8 ${props?.is_active ? 'bg-success-500' : 'bg-gray-400'} hover:opacity-90`}
                            >
                                <p className="text-white text-sm">
                                    {props?.is_active
                                        ? commonT('active')
                                        : t('form.inactive')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </DialogHeader>
            <section className="grid sm:grid-cols-4 pt-6 my-4">
                <div className="text-left py-4">
                    <Label className="text-neutral-400 text-sm">
                        {t('form.email')}
                    </Label>
                    <p className="text-md break-words pr-2 font-semibold">
                        {props?.email}
                    </p>
                </div>

                <div className="text-left py-4">
                    <Label className="text-neutral-400 text-sm">
                        {t('form.company')}
                    </Label>
                    <p className="text-md break-words pr-2 font-semibold">
                        {props?.company_name}
                    </p>
                </div>

                <div className="text-left py-4">
                    <Label className="text-neutral-400 text-sm">
                        {t('form.branch')}
                    </Label>
                    <p className="text-md break-words pr-2 font-semibold">
                        {props?.branch_name}
                    </p>
                </div>

                <div className="text-left py-4">
                    <Label className="text-neutral-400 text-sm">
                        {t('form.department')}
                    </Label>
                    <p className="text-md break-words pr-2 font-semibold">
                        {props?.department_name}
                    </p>
                </div>

                <div className="text-left py-4">
                    <Label className="text-neutral-400 text-sm">
                        {t('form.section')}
                    </Label>
                    <p className="text-md break-words pr-2 font-semibold">
                        {props?.section_name}
                    </p>
                </div>

                <div className="text-left py-4">
                    <Label className="text-neutral-400 text-sm">
                        {t('form.position')}
                    </Label>
                    <p className="text-md break-words pr-2 font-semibold">
                        {props?.position_name}
                    </p>
                </div>

                <div className="text-left py-4">
                    <Label className="text-neutral-400 text-sm">Role</Label>
                    <p className="text-md break-words pr-2 font-semibold">
                        {props?.role_name}
                    </p>
                </div>

                <div className="text-left py-4">
                    <Label className="text-neutral-400 text-sm">
                        {t('form.location')}
                    </Label>
                    <p className="text-md break-words pr-2 font-semibold">
                        {props?.location_name}
                    </p>
                </div>

                <div className="text-left py-4">
                    <Label className="text-neutral-400 text-sm">
                        {t('form.remark')}
                    </Label>
                    <p className="text-md break-words pr-2 font-semibold">
                        {props?.description}
                    </p>
                </div>
            </section>
        </div>
    )
}

export default EmployeeCardModal
