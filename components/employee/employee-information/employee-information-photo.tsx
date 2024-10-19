import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Pen, X } from 'lucide-react'
import Image from 'next/image'
import { useBoolean, useMediaQuery } from 'usehooks-ts'

const EmployeeInformationPhotCheck = ({
    open,
    setOpen,
    img,
}: {
    open: boolean
    setOpen: any
    img: any
}) => {
    const isMobile = useMediaQuery('(min-width: 850px)')

    return (
        <>
            {isMobile && (
                <AlertDialog open={open}>
                    <AlertDialogContent className=" bg-inherit w-auto h-auto  border-none p-0  rounded-3xl">
                        <div>
                            <div className=" flex items-center gap-4 flex-col">
                                <Avatar  className="h-auto max-w-full   object-cover w-auto md:w-auto lg:w-auto cursor-pointer duration-300  rounded-3xl mx-auto">
                                    <Image alt='employee' className=' object-cover' src={img}/>
                                    {/* <AvatarImage  className='object-cover' src={img} alt="@shadcn" ></AvatarImage>
                                    <AvatarFallback>employee</AvatarFallback> */}
                                </Avatar>
                            </div>
                            <div
                                onClick={() => setOpen()}
                                className="w-auto absolute top-[-20px] text-primary-500 cursor-pointer right-[-20px]"
                            >
                                <X />
                            </div>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    )
}

export default EmployeeInformationPhotCheck
