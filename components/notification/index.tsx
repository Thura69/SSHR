import React, { useEffect, useState } from 'react'
import NotifyMenu from './notify-menu'
import { useMediaQuery } from 'usehooks-ts'
import { useFCM } from '@/hooks/use-fcm'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import {
    fetchAllNotifications,
    readNotifications,
} from '@/service/apis/notification-alert'

  const Notification = ()=>{
    const isExtraSmall = useMediaQuery('(max-width:280px')
    const { notiCount, resetNotiCount } = useFCM()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { status, data, isFetching, fetchNextPage, hasNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ['notifications'],
            queryFn: ({ pageParam }) =>
                fetchAllNotifications(`size=10&page=${pageParam}`),
            initialPageParam: 0,
            getNextPageParam: (lastPage, AllPages) => {
                return lastPage.length ? AllPages.length + 1 : undefined
            },
            enabled: isMenuOpen,
        })

    const { mutate, isSuccess } = useMutation({
        mutationKey: ['notifications-read'],
        mutationFn: (Notification_ID: number[]) => {
            return readNotifications(Notification_ID)
        },
    })

    useEffect(() => {
        if (isSuccess) {
            refetch()
        }
    }, [isSuccess])

    function handleMenuOpenChange(open: boolean) {
        setIsMenuOpen(open)
        if (open) {
            resetNotiCount()
        }
    }

    return (
        <NotifyMenu
            notiCount={notiCount}
            isOpen={isMenuOpen}
            onOpenChange={handleMenuOpenChange}
            onMessageClick={(msg) => {
                mutate([msg.Notification_ID])
            }}
            isExtraSmall={isExtraSmall}
            queryState={{
                data: data?.pages.flat()!,
                status,
                isFetching,
            }}
            infiniteScroll={{
                dataLength: data?.pages.flat().length!,
                next: () => {
                    fetchNextPage()
                },
                hasMore: hasNextPage,
            }}
        />
    )
}


export default Notification;