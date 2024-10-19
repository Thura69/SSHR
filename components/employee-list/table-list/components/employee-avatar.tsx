import { Avatar } from '@/components/ui/avatar'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import EmployeeAvatarImg from '@/public/Rectangle 42000.png';


interface EmployeeAvatarProps
    extends React.ComponentPropsWithoutRef<typeof Avatar> {
    fullName?: string
    userName?: string
    image?: string
    containerClassName?: string
}

const EmployeeAvatar: React.FC<EmployeeAvatarProps> = ({
    containerClassName,
    fullName,
    userName,
    image,
}) => {
    const imgUrl = 'https://github.com/shadcn.png'
    const [imageError, setImageError] = useState(false)

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <section className={cn('flex gap-4', containerClassName)}>
            <div className='w-[43px] h-[43px] bg-neutral-300 rounded-2xl relative overflow-hidden'>
                {!imageError && image ? (
                    <Image
                        src={`http://82.208.22.253:9000/uploads${image}`}
                        alt="avatar"
                        onError={handleImageError}
                        fill
                    />
                ) : (
                    <Image src={EmployeeAvatarImg} alt="avatar" fill />
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-nowrap line-clamp-1">
                    {fullName}
                </p>
                <p className="text-[10px] font-medium text-zinc-500 line-clamp-1">
                    {userName}
                </p>
            </div>
        </section>
    )
}

export default EmployeeAvatar
