import React, { Fragment } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { BellIcon, SettingIcon } from '../common/icons'
import { cn } from '@/lib/utils'
import { Dot } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { formatDistanceToNow } from 'date-fns'
import { NotiData, NotiMenuProps } from '@/types/notifications'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function NotifyMenu(props: NotiMenuProps) {
    const {
        isExtraSmall,
        onOpenChange,
        isOpen,
        queryState: { data, status },
        infiniteScroll,
        notiCount,
        onMessageClick,
    } = props

    return (
        <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="group w-[30px] relative hover:bg-white"
                >
                    <BellIcon
                        className={cn(
                            `group-hover:stroke-primary-500 ${isOpen && 'stroke-primary-500'} z-50 w-[22px]`,
                            { 'w-[20px]': isExtraSmall },
                        )}
                    />
                    <NotiCount count={notiCount} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-96">
                <DropdownMenuLabel className="flex items-center justify-between">
                    <span className="block">Notifications</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="group w-[30px]"
                    >
                        <SettingIcon
                            className={cn('group-hover:fill-primary-500', {
                                'w-[20px]': isExtraSmall,
                            })}
                        />
                    </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {status === 'pending' ? (
                    <Loader />
                ) : data?.length > 0 ? (
                    <DropdownMenuGroup className="max-h-[30em] overflow-auto">
                        <InfiniteScroll
                            {...infiniteScroll}
                            loader={<Spinner />}
                            endMessage={
                                <p className="py-2 text-center text-xs font-semibold text-gray-600">
                                    No more notifications to load.
                                </p>
                            }
                            height={400}
                        >
                            {data.map((noti) => (
                                <Fragment key={noti.Notification_ID}>
                                    <MenuItem
                                        noti={noti}
                                        onClick={onMessageClick}
                                    />
                                </Fragment>
                            ))}
                        </InfiniteScroll>
                    </DropdownMenuGroup>
                ) : null}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function NotiCount({ count }: { count: number }) {
    if (count <= 0) {
        return null
    } else if (count > 9) {
        return (
            <span className="absolute font-extrabold -top-[0.15em] -right-[0.9em] bg-red-600 text-xs f rounded-full px-[0.4em] py-[0.08em] text-white">
                9+
            </span>
        )
    } else {
        return (
            <span className="absolute  font-extrabold -top-[0.11em] -right-[0.4em] bg-red-600 text-xs f rounded-full px-[0.5em] py-[0.08em] text-white">
                {count}
            </span>
        )
    }
}

function MenuItem({
    noti,
    onClick,
}: {
    noti: NotiData
    onClick?: (msg: NotiData) => void
}) {
    return (
        <DropdownMenuItem
            onClick={() => {
                if (onClick) {
                    onClick(noti)
                }
            }}
            className="my-1 py-2 cursor-pointer"
        >
            <Dot
                className={`w-[1.8em]  h-[1.8em] ${noti.IsRead ? 'text-primary-500' : 'text-red-700'} `}
            />
            <div className="mx-1">
                <h2 className="mb-[0.05em] font-bold text-sm">{noti.Title}</h2>
                <p className="text-sm font-light mb-[0.1em]">{noti.Detail}</p>
                <span className="text-xs font-thin">
                    {formatDistanceToNow(new Date(noti.Notification_Date), {
                        addSuffix: true,
                    })}
                </span>
            </div>
        </DropdownMenuItem>
    )
}

function Loader() {
    const indicator = () => (
        <div className="flex items-center space-x-2 space-y-4">
            <Skeleton className="h-2 w-2 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-3 w-[200px]" />
                <Skeleton className="h-2 w-[300px]" />
                <Skeleton className="h-1 w-[50px]" />
            </div>
        </div>
    )

    return (
        <DropdownMenuGroup>
            {indicator()}
            {indicator()}
            {indicator()}
            {indicator()}
        </DropdownMenuGroup>
    )
}

function Spinner() {
    return (
        <div
            role="status"
            className="w-full flex items-center justify-center my-1"
        >
            <svg
                aria-hidden="true"
                className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}
