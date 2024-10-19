'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { useEffect, useState } from 'react'
import PageLoader from '@/components/common/loaders/page-loader'

const LazyMap = dynamic(() => import('@/components/map/Map'), {
    ssr: false,
    loading: () => 
    <div className="h-[300px]  flex items-center justify-center w-full">
        <PageLoader/>
    </div>,
})

interface SettingModalProps
    extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
    toggle: () => void
    open: boolean
}

const MapBox: React.FC<SettingModalProps> = ({ open, toggle }) => {
   
    return (
        <AlertDialog open={open} onOpenChange={toggle}>
            <AlertDialogContent className="md:p-6  h-auto rounded-[10px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                      Select Branch Location.
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <LazyMap toggle={toggle} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default MapBox
