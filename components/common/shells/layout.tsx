'use client'

import Logo from '@/public/logo.svg'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { SideMenuTwo } from './side-menu-two'
import { APIErrorHandler } from '../../api-error-handler'
import { useSideMenuContext } from '@/state/side-menu-context'
import SideMenuBackdrop from './side-menu-backdrop'
import { Navbar } from './navbar'
import { useMediaQuery } from 'usehooks-ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const authRoutePattern = /^\/auth/
    const route = usePathname()
    const isMobile = useMediaQuery('(max-width:850px)')
    const { value: expended, toggle } = useSideMenuContext()
    const [authenticated, setAuthenticated] = useState(false)

    const isAuthRoute = authRoutePattern.test(route)
    const token = Cookies.get('auth')

    useEffect(() => {
        token ? setAuthenticated(true) : setAuthenticated(false)
    }, [token, authenticated])

    const isAuth = !isAuthRoute && authenticated && token

    return (
        <main
            className={cn(
                'grid-cols-1 mx-auto grid w-full h-full  grid-rows-[auto_1fr] side:grid-cols-[auto_1fr]',
                {
                    'md:grid-cols-[1fr]': !isAuth,
                },
            )}
        >
            <h1 className="order-2">{isAuth ? <Navbar /> : null}</h1>
            <aside
                className={cn('order-1 row-span-2 hidden side:block h-full')}
            >
                {isAuth ? <SideMenuTwo /> : null}
            </aside>
            <section
                className={cn(
                    'order-3 md:ps-3 max-h-full max-w-full overflow-y-auto flex-1',
                    {
                        'md:ps-0': !isAuth,
                    },
                )}
            >
                {children}
            </section>

            {isMobile && isAuth && token ? (
                <Sheet open={expended && isMobile} onOpenChange={toggle}>
                    <SheetContent side="left" showX={false} className="p-0">
                        <SheetHeader>
                            <div className="">
                                {' '}
                                <SideMenuTwo />{' '}
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            ) : null}
        </main>
    )

    // return (
    //     <div
    //         className={cn('w-full h-full', {
    //             flex: !isAuthRoute,
    //         })}
    //     >
    //         {!isAuthRoute && authenticated ? (
    //             <>
    //                 <SideMenuBackdrop />
    //                 <div
    //                     className={cn(
    //                         'fixed z-40 transition-all ease-in-out duration-200 space-y-8 bg-white',
    //                         {
    //                             'w-[252px]': expended,
    //                             'w-[80px]': !expended,
    //                             '-translate-x-full': !expended && isMobile,
    //                         },
    //                     )}
    //                 >
    //                     <SideMenuTwo />
    //                 </div>
    //                 <div
    //                     key={expended + ''}
    //                     className={cn({
    //                         'w-[252px]': expended,
    //                         'w-[80px]': !expended,
    //                         'w-0': isMobile,
    //                     })}
    //                 />
    //             </>
    //         ) : null}

    //         <div className="flex-1 overflow-x-auto">
    //             <APIErrorHandler />
    //             <ToastContainer
    //                 closeOnClick
    //                 position="bottom-right"
    //                 autoClose={5000}
    //             />
    //             <section>
    //                 {!isAuthRoute && authenticated ? <Navbar /> : null}
    //                 {/* {authenticated ? children : (<>Loading...</>)} */}
    //                 {children}
    //             </section>
    //         </div>
    //     </div>
    // )
}

export default Layout
