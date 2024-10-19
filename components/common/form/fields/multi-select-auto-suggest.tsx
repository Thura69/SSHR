import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
    PopoverTrigger,
    Popover,
    PopoverContent,
} from '@/components/ui/popover'
import { FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface MultiSelectDropProps {
    field: any
    additionalData: { label: string; value: string }[]
    languageTitle: string
    fieldName: string
    placeHolder?: string
    height?: string
    disabled?: boolean
}

export const AutoSuggestDrop: React.FC<MultiSelectDropProps> = ({
    field,
    additionalData,
    languageTitle,
    placeHolder,
    fieldName,
    height,
    disabled = false,
}) => {
    const form = useFormContext()
    const { t } = useTranslation(languageTitle)
    const [data, setData] = useState<string>('')
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
    const [click, setClick] = useState<boolean>(false)
    const [suggestions, setSuggestions] = useState<
        { label: string; value: string }[]
    >([])

    useEffect(() => {
        setClick(false)
        const employeeName = data.toLowerCase() || ''
        const filteredSuggestions = additionalData.filter((item) =>
            item.label.toLowerCase().includes(employeeName),
        )
        setSuggestions(filteredSuggestions)
        if (filteredSuggestions.length > 0) {
            setPopoverOpen(true)
        } 
        if (employeeName.length === 0) {
            setPopoverOpen(false)
        }

        if (click) {
            setPopoverOpen(false)
        }
    }, [data])

    const handleClick = (item: { label: string; value: string }) => {
        setClick(true)
        form.setValue(fieldName, item.label)
        setData(item.label)
        setPopoverOpen(false)
    }

    return (
        <div className="relative">
            <FormControl className="w-full">
                <Input
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder={placeHolder}
                    className={cn(
                        height,
                        'text-[14px] disabled:border-none disabled:opacity-100  disabled:text-secondaryTextColor disabled:bg-[#F1F5FB] border-[#A0AEC0]',
                    )}
                    disabled={disabled}
                />
            </FormControl>
            {popoverOpen && (
                <div className="absolute mt-2 max-h-[200px] bg-white w-full border p-3 rounded-md overflow-y-scroll">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.value}
                            className="hover:bg-primary-200/50 cursor-pointer"
                        >
                            <p
                                onClick={() => handleClick(suggestion)}
                                className="relative cursor-pointer flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                            >
                                {suggestion.label}
                            </p>
                            <Separator />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
