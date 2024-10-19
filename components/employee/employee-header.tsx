import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar'
import { ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useMediaQuery } from 'usehooks-ts'
import VerticalSheet from '../vertical-timeline/vertical-sheet'
import sideMenuData from './utils'
import EmployeeMenuBar from './employee-information-menubar'
import Employee from '@/public/Rectangle 42000.png'
import Image from 'next/image'


const menuColor =
    'text-[#A0AEC0]  flex w-[120px] h-[32px] font-md  bg-white gap-2 text-sm   px-4   duration-500 data-[state=open]:bg-primary-500 rounded-md data-[state=open]:rounded-md data-[state=open]:text-white items-center justify-between'

const EmployeeHeader = () => {
    const isMobile = useMediaQuery('(max-width: 1100px)')

    return (
        <header className="flex  mb-0  2xl:mb-0  flex-col justify-start items-start ">
            <div className="flex  items-center gap-3 font-medium ">
                <Avatar className="rounded-[14px] h-12 w-12">
                    {/* <AvatarImage
                        src="https://s3-alpha-sig.figma.com/img/6aeb/97ad/3db94f63083f7b1bc5bf8f07fa2490dd?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YWMwZL~cXDpGL05t9jMebeneYGq4NTZXso0RVYNYEir3uExaxbVHX827izZPfk7RiGPcF0bj3RdkUatvuk4o6qwGiMAESZibC2jPDhdnoX9AyNHT5CQkhf~xGK8up38TSFG3P7rL5FyPgvyqCKRM6x~NwyGt4wYQKwrlKZpRV-1YJpUkUl2AVrAZxH0MXP6oTTqpcxsYrqRhcmSJloGRckNe4fy63oOfMvRrtdBn9CBz-bH7mEPz2CNUYfliTQs5jBGLilZVC~yHYtPflL-NAzZ3WXdaK~mqBt57Sdo7v-g~WAs5Qn9CmXvBbfNmCciWr8y23MvmNddc02ohjVD~Aw__"
                        alt="@shadcn"
                    /> */}

                    <Image src={Employee} alt='employee'/>
                </Avatar>
                <p className=" text-sm md:text-md">Courtney Henry</p>
            </div>
            {isMobile ? (
                ''
            ) : (
                <Menubar className=" h-auto mt-4 gap-[10px] border-2 md:flex-row border-none  flex flex-col  ">
                    {sideMenuData.map((e, index) => (
                        <EmployeeMenuBar
                            name={e.name}
                            link={e.link}
                            items={e.items}
                        />
                    ))}
                  
                </Menubar>
            )}
        </header>
    )
}

export default EmployeeHeader
