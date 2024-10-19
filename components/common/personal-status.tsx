import Image from 'next/image'
import LOGO from '@/public/Rectangle 42000.png'
import { useMediaQuery } from 'usehooks-ts'
import { useRef } from 'react'
import EmployeeCard from '../employee/employee-card'
import { cn } from '@/lib/utils'

type PersonalStatusType = {
    status: 'success' | 'pending' | 'declined'
    userImg: string,
}

const PersonalStatus:React.FC<PersonalStatusType> = ({status,userImg}) => {

    const isMobile = useMediaQuery('(max-width: 1100px)')
    const absoluteRef = useRef<HTMLDivElement>(null)

    const handleMouseEnter = () => {
        const absoluteElement = absoluteRef.current
        const parentRect =
            absoluteElement?.parentElement?.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        if (absoluteElement && parentRect) {
            absoluteElement.style.position = 'fixed'
            absoluteElement.style.display = 'flex'

            // Ensure the element is within the viewport
            let top = parentRect.top + 50
            let left = parentRect.left - 200

            if (top + absoluteElement.clientHeight > viewportHeight) {
                top = viewportHeight - absoluteElement.clientHeight
            }
            if (left + absoluteElement.clientWidth > viewportWidth) {
                left = viewportWidth - absoluteElement.clientWidth
            }
            if (top < 0) top = 0
            if (left < 0) left = 0

            absoluteElement.style.top = `${top}px`
            absoluteElement.style.left = `${left}px`
        }
    }

    const handleMouseLeave = () => {
        const absoluteElement = absoluteRef.current
        if (absoluteElement) {
            absoluteElement.style.position = 'absolute'
            absoluteElement.style.display = 'none'

            absoluteElement.style.top = '20px'
            absoluteElement.style.left = '20px'
        }
    }

    return (
        <div className="" onMouseLeave={handleMouseLeave}>
            <div
                className={cn(
                    ' border-2  inline-block  p-[2px] rounded-full',
                    status === 'success' && "border-[#57B086]",
                    status === 'pending' && "border-[#FF9500]",
                    status === 'declined' && "border-[#E03137]"
                )}
            >
                <Image
                    onMouseEnter={handleMouseEnter}
                    src={LOGO}
                    alt="logo"
                    className="w-[32px] h-[32px]  rounded-full"
                />
                {!isMobile && (
                    <div ref={absoluteRef} className="hidden  z-50 ">
                        <EmployeeCard />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PersonalStatus
