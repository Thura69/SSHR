import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { ChevronDown, ChevronDownCircleIcon } from 'lucide-react'

type Checked = DropdownMenuCheckboxItemProps['checked']

function NotificationDropdown({ data }: { data: any[] }) {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="w-full flex items-center justify-between"
                    variant="outline"
                >
                    <p>Days</p>
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuSeparator />
                {data?.map((e, index) => {
                    return <DropdownMenuItem key={index}>{e}</DropdownMenuItem>
                })}
            </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default NotificationDropdown
