import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Pen } from 'lucide-react'
import EmployeeInformationPhotCheck from './employee-information-photo'
import { useBoolean } from 'usehooks-ts'
import { useState } from 'react'
import Employee from '@/public/Rectangle 42000.png'
import Image from 'next/image'

const EmployeeInformationUpoad = ({
    setTrue,
    selectedImage,
    handleChange,
}: {
    setTrue: any
    selectedImage: any
    handleChange: any
}) => {
    return (
        <div className="flex items-center justify-center">
            <div className="   relative inline-block items-center gap-2 flex-col">
                <Avatar
                    onClick={() => setTrue()}
                    className="rounded-[24px] cursor-pointer h-[120px] w-[120px]"
                >
                    <Image className=' object-cover' src={selectedImage ? selectedImage : Employee} alt='employee' />
                    {/* <AvatarImage
                        className="object-cover "
                        src={selectedImage ? selectedImage : Employee}
                        alt="@shadcn"
                    />
                    <AvatarFallback>employee</AvatarFallback> */}
                </Avatar>
                <div className="absolute right-[-20px] bottom-[-5px]   h-[45px] text-[#A0AEC0] border-[#A0AEC0] rounded-3xl inline-block mx-auto">
                    <input
                        type="file"
                        className="absolute hidden"
                        name="myImage"
                        id="actual-btn"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <div className="flex px-1 gap-2 h-full items-center justify-center relative">
                        <label
                            className=" hover:bg-primary-600 border bg-primary-500 duration-300 p-1 rounded-full w-[35px] flex items-center justify-center text-white cursor-pointer h-[35px] "
                            htmlFor="actual-btn"
                        >
                            <Pen className="w-4 h-4" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeInformationUpoad
