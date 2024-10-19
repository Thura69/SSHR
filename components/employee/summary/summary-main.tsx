'use client'
import TableFrame from '@/components/common/table/table-frame'
import { useBoolean } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'
import SummaryProfile from './summary-profile'
import { Separator } from '@/components/ui/separator'
import SummaryBoard from './summary-board'

const Status = [
    {
        title: 'Martial Status',
        value: 'Single',
    },
    {
        title: 'Gender',
        value: 'Female',
    },
    {
        title: 'Date of Birth',
        value: '08/08/2000',
    },
]

const department = [
    {
        title: 'Department',
        value: 'Software Development',
    },
    {
        title: 'Section',
        value: 'Section Name',
    },
    {
        title: 'Join Date',
        value: '12/08/2024',
    },
]

const percent = [
    {
        title: 'User Research',
        value: 80,
    },
    {
        title: 'Wireframing',
        value: 60,
    },
    {
        title: 'HTML/CSS',
        value: 40,
    },
]

const SummaryMainTable = () => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('summary')

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={false!}
                subTitle={false}
                margin="mb-0 mt-[24px]"
                modalTrue={() => setTrue()}
                language="summary"
            />
            <SummaryProfile
                imageUrl="https://s3-alpha-sig.figma.com/img/c85e/5b69/e4720c38fa89f0fa3dbe4918c78ba3e8?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=leSPPvscy-D5yASuunXDN2uUoMsjJFH0bEojYxJZcEu-2smzrpGbp62-9lujVbQ5YCcYajGVyPIC298NFGQ7-Tk3aula2N6QqxJkXbZNFK~yX0Wp-wz9kh0IQ8Ph6FyetC~yK5KklEQxi6wXP8CqdmhWkrpJHNFJ1gRL9vvH9pKzAQmY1VVt2Zwe-WjWLmP2zqrymA81IQb8TNyR8DB71Z-dReUj9ibvCYWRezb8oUUeUMuZApHCfyrItN-TQpgCUEh1ddgKT1R517bqpBHYxCw8OrzhBUtqude4uNHI7aQNXVYW9PR2bQ2JbvR0gjQVi8JmbS3l8DGPtnFrGlag-Q__"
                name="Artana Bonmati"
                status={true}
                position="UI/UX Designer"
                code="EP-0123456"
                gmail="someone@gmail.com"
                phNo="09789654321"
                location="Junction Square, Kamayut Township, Yangon"
            />
            <Separator className="mb-6" />

            <div className="flex flex-col lg:flex-row lg:gap-8 ">
                <SummaryBoard data={Status} />
                <SummaryBoard data={department} />
            </div>
            <SummaryBoard data={percent} />

            <div className="bg-[#F2F8FD] flex flex-col md:gap-0 gap-[24px] justify-between p-6 w-full rounded-3xl mt-5">
                <div className="flex   justify-between  gap-[24px] w-full">
                    <div className="w-full space-y-1">
                        <h3 className="text-[14px] text-secondaryText font-bold">
                            Current Status
                        </h3>

                        <p className="text-[16px] text-sideMenuTextColor2">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Esse necessitatibus accusantium illo
                            repellendus id fuga exercitationem autem cupiditate
                            tenetur fugiat numquam tempore, harum, qui
                            laudantium quod iure odit quos reiciendis.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SummaryMainTable
