'use client'

import './globals.css'
import './globalicons.css'
import Layout from '@/components/common/shells/layout'
import { Manrope, Poppins } from 'next/font/google'
import { SideMenuProvider } from '@/state/side-menu-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import i18next from '@/i18n'
import { Suspense, useEffect } from 'react'
import BaseApi from '@/service/axios'
import Cookies from 'js-cookie'
import usePreferenceState from '@/state/zustand/preference'
import { cn } from '@/lib/utils'
import { APIErrorHandler } from '@/components/api-error-handler'
import { ToastContainer } from 'react-toastify'
import { CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { COLORS } from '@/constants'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import Tailwind from 'primereact/passthrough/tailwind'
import 'primereact/resources/themes/lara-light-cyan/theme.css'

const manrope = Manrope({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const lang = usePreferenceState((state) => state.selectedLanguage)
    const token = Cookies.get('auth')

    useEffect(() => {
        BaseApi.defaults.headers.common['Accept-Language'] = lang || 'en'
    }, [lang, token])

    return (
        <html lang={lang}>
            <title>SSHR</title>
            <link rel="icon" type="image/x-icon" href="/logo.ico" />

            <QueryClientProvider client={queryClient}>
                <I18nextProvider i18n={i18next}>
                    <PrimeReactProvider>
                        <body
                            className={cn(
                                'h-screen w-screen  overflow-hidden',
                                manrope.className,
                            )}
                        >
                            <SideMenuProvider>
                                <Suspense>
                                    <APIErrorHandler />
                                    <ToastContainer
                                        closeOnClick
                                        position="bottom-right"
                                        autoClose={2000}
                                        icon={({ type }) => {
                                            if (type === 'success')
                                                return (
                                                    <CircleCheck
                                                        fill={
                                                            COLORS.primary[500]
                                                        }
                                                        className="text-white"
                                                    />
                                                )
                                            if (type === 'error')
                                                return (
                                                    <CircleAlert
                                                        fill={
                                                            COLORS.danger[500]
                                                        }
                                                        className="text-white"
                                                    />
                                                )
                                            if (type === 'warning')
                                                return (
                                                    <TriangleAlert
                                                        fill={
                                                            COLORS.warning[500]
                                                        }
                                                        className="text-white"
                                                    />
                                                )
                                            else return null
                                        }}
                                        style={{
                                            zIndex: 1000,
                                        }}
                                        className={`fixed [z-index:60]  cursor-pointer`}
                                    />

                                    <Layout>{children}</Layout>
                                    {/* {children} */}

                                  
                                </Suspense>
                            </SideMenuProvider>

                           

                            <div id="portal-root"></div>
                        </body>
                    </PrimeReactProvider>
                </I18nextProvider>
            </QueryClientProvider>
        </html>
    )
}
