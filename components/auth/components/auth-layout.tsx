import { Logo } from '@/components/logo'
import Image from 'next/image'
import { FC } from 'react'
import { LayoutProps } from '@/types/auth'

export const AuthLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <section className="w-full relative overflow-hidden">
            <Image
                src={'/assets/wave-top.svg'}
                alt="illustration"
                width={200}
                height={300}
                className="invisible md:visible absolute right-0"
            />
            <Image
                src={'/assets/wave-bottom.svg'}
                alt="illustration"
                width={324}
                height={483}
                className="invisible md:visible absolute bottom-0"
            />
            <div className="flex max-sm:flex-col justify-center md:items-center h-screen min-h-[530px]">
                <div className="rounded-16 xl:shadow-md relative bg-white lg:px-10 xl:p-5 2xl:p-10 max-w-[100%]">
                    <Logo className="hidden lg:block absolute top-5 z-10" />
                    {children}
                </div>
            </div>
        </section>
    )
}
