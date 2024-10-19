
import { useTranslation } from 'react-i18next'

interface ApprovalList {
    branch_name: string;
    company_name: string;
    department_name: string;
    position_name: string;
    section_name: string;
    location_name: string;
}

const HeadCountPositionCard = ({
    approver,
    language,
}: {
    approver: ApprovalList
    language: string
}) => {
    const {
        branch_name,
        company_name,
        department_name,
        location_name,
        section_name,
    } = approver
    const { t } = useTranslation(language)
    return (
        <>
            <div className=" animate-show-card-initial  bg-white  rounded-[16px] top-[-200px]  p-0 space-y-4  border w-[504px] h-auto z-50 ">
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
        <li className="flex flex-col w-[33%] gap-1 ">
            <h3 className="text-[14px] text-primary-500 font-bold">{title}</h3>
            <p className="text-[16px] text-sideMenuTextColor2">{value}</p>
        </li>
    )
}

export default HeadCountPositionCard
