import USER from '@/public/Rectangle 42000.png'
import Image from 'next/image'
import { ApprovalList } from './head-count-request/types/head-count-request-types'
import ActiveBadge from '@/components/common/active-badge'
import InactiveBadge from '@/components/common/inactive-badge'
import { useTranslation } from 'react-i18next'

const HeadCountCard = ({
    approver,
    language,
}: {
    approver: ApprovalList
    language: string
}) => {
    const {
        approver_name,
        branch_name,
        company_name,
        department_name,
        location_name,
        position_name,
        section_name,
        employee_no,
        is_active,
    } = approver
    const { t } = useTranslation(language)
    return (
        <>
            <div className=" animate-show-card-initial  bg-white  rounded-[16px] top-[-200px]  p-6  space-y-4  border w-[504px] h-auto z-50 ">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-6">
                        <Image
                            src={USER}
                            alt="logo"
                            className="w-[80px] h-auto rounded-[12px]"
                        />
                        <div className="flex flex-col gap-1">
                            <h3 className=" text-sm font-bold text-sideMenuTextColor2">
                                {approver_name}
                            </h3>
                            <p className="text-[12px]   text-sideMenuTextColor2">
                                {position_name}
                            </p>
                            <p className="text-[10px]   text-secondaryText">
                                {employee_no}
                            </p>
                        </div>
                    </div>
                    <div className="w-auto h-[24px] flex items-center justify-center hover:bg-none px-4 ">
                        {is_active ? (
                            <ActiveBadge rounded />
                        ) : (
                            <InactiveBadge rounded />
                        )}
                    </div>
                </div>
                <div className=" p-6 space-y-4 rounded-8 bg-[#F7FAFF]">
                    <ul className="flex justify-start">
                        <ListItem
                            title={t('company_id')}
                            value={company_name}
                        />
                        <ListItem
                            title={t('location_id')}
                            value={location_name}
                        />
                        <ListItem title={t('branch_id')} value={branch_name} />
                    </ul>
                    <ul className="flex justify-start">
                        <ListItem
                            title={t('department_id')}
                            value={department_name}
                        />
                        <ListItem
                            title={t('section_id')}
                            value={section_name}
                        />
                    </ul>
                </div>
            </div>
            <div className="fixed animate-fade-item pointer-events-none z-40 w-[100svw] h-[100svh]  top-0 bottom-0 left-0 right-0 bg-black/50"></div>
        </>
    )
}

const ListItem = ({ title, value }: { title: string; value: string }) => {
    return (
        <li className="flex flex-col w-[33%] gap-1">
            <h3 className="text-[14px] text-primary-500 font-bold">{title}</h3>
            <p className="text-[16px] text-sideMenuTextColor2">{value}</p>
        </li>
    )
}

export default HeadCountCard
