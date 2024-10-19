export type NotiData = {
    Notification_ID: number
    Notification_Type: string
    Title: string
    Detail: string
    Notification_Date: string
    URL: string
    IsRead: boolean
    IsSent: boolean
    CreatedBy: number
    CreatedDate: string
    User_ID: number
    Tenant_ID: number
}

type NotiMenuProps = {
    notiCount: number
    isExtraSmall: boolean
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onMessageClick?: (msg: NotiData) => void
    queryState: {
        status: 'error' | 'success' | 'pending'
        isFetching: boolean
        data: NotiData[]
    }
    infiniteScroll: {
        dataLength: number
        next: () => void
        hasMore: boolean
    }
}
