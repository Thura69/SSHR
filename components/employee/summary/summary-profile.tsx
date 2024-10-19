import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import DEFAULTEMPLOYEE from '@/public/Rectangle 42000.png';

type SummaryType = {
    imageUrl: string
    name: string
    status: boolean
    position: string
    code: string
    gmail: string
    phNo: string
    location: string
}

const Listitems = ({ title }: { title: string }) => {
    return (
        <li className="flex items-center gap-2">
            <div className="w-[8px] h-[8px] bg-primary-500 rounded-full"></div>
            {title}
        </li>
    )
}

const SummaryProfile: React.FC<SummaryType> = ({
    imageUrl,
    name,
    status,
    position,
    code,
    gmail,
    phNo,
    location,
}) => {
    return (
        <div className=" gap-8 mt-8 mb-4 flex flex-col lg:flex-row">
            {/* profile */}
            <div>
                <Avatar className="rounded-[24px] h-[120px] w-[120px]">
                    <Image src={DEFAULTEMPLOYEE} alt='employee'/>
                    {/* <AvatarImage
                        src={`${imageUrl}`}
                        alt="@shadcn"
                    />
                    <AvatarFallback>employee</AvatarFallback> */}
                </Avatar>
            </div>
            <div className="">
                <div className=' space-y-1'>
                    <div className="flex gap-4">
                    <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
                        {name}
                    </h2>
                        <div className="bg-[#E4FFDF] w-[76px] rounded-2xl flex items-center justify-center hover:bg-none px-4 text-[10px] font-light  text-[#338C93]">
                            {status ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                    <h3 className="md:text-[16px] text-[14px] font-[400] text-sideMenuTextColor2">
                        {position}
                    </h3>
                    <h3 className=" text-[12px] md:text-[14px] text-secondaryText">{code}</h3>
                </div>

                <div className=" gap-3 lg:gap-8 my-4 flex-col lg:flex-row lg:flex-wrap pl-1 text-sideMenuTextColor2 text-[14px] flex">
                    <Listitems title={gmail} />
                    <Listitems title={phNo} />
                    <Listitems title={location} />
                </div>
            </div>
        </div>
    )
}

export default SummaryProfile
