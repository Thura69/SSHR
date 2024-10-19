'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useBoolean } from 'usehooks-ts'
import useAPIErrors from '@/hooks/use-api-error'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'

interface ApiErrorHandler {
    children?: ReactNode
}

export const APIErrorHandler: FC<ApiErrorHandler> = ({ children }) => {
    const { ready, errors } = useAPIErrors()
    const router = useRouter()
    const { value: opened, setTrue, toggle } = useBoolean(false)

    useEffect(() => {
        if (errors) {
            if ('response' in errors) {
                const { response }: any = errors
                if (response.status === 500) {
                    setTrue()
                }
            } else {
                setTrue()
            }
        }
    }, [errors, setTrue])

    if (ready) {
        return (
            <>
                {children}
                <AlertDialog open={opened} onOpenChange={toggle}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {errors?.message ?? 'Something went wrong'}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                We encountered a problem and couldn't complete
                                the task. Please try again.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => router.refresh()}>
                                Refresh
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </>
        )
    }

    return <></>
}
