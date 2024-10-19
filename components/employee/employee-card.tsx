import USER from '@/public/Rectangle 42000.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

const EmployeeCard = () => {
    return (
        <>
            <div className=" animate-show-card-initial  bg-white  rounded-[16px] top-[-200px]  p-6  space-y-4  border w-[504px] h-[264px] z-50 ">
                <div className="flex items-center justify-between">
                    <div className="flex gap-6">
                        <Image
                            src={USER}
                            alt="logo"
                            className="w-[40px] h-[40px] rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                            <h3 className=" text-sm font-bold text-sideMenuTextColor2">
                                Julia
                            </h3>
                            <p className="text-[10px]   text-secondaryText">
                                EMP123456
                            </p>
                        </div>
                    </div>
                    <div className="bg-[#E4FFDF] w-[76px] h-[24px] rounded-2xl flex items-center justify-center hover:bg-none px-4 text-[10px] font-light  text-[#338C93]">
                        Active
                    </div>
                </div>
                <div className=" p-6 space-y-4 rounded-8 bg-[#F7FAFF]">
                    <ul className="flex justify-start">
                        <ListItem title="Company" value="Google" />
                        <ListItem title="Location" value="New York, USA" />
                        <ListItem title="Branch" value="Head Office" />
                    </ul>
                    <ul className="flex justify-start">
                        <ListItem title="Department" value="Management" />
                        <ListItem title="Section" value="Section Name" />
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

export default EmployeeCard
