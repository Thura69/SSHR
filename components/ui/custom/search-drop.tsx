import {
    PopoverTrigger,
    Popover,
    PopoverContent,
} from '@/components/ui/popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { additionalData } from '@/components/setting/code-generator/utils'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import {
    CaretSortIcon,
    CheckIcon,
    ChevronDownIcon,
} from '@radix-ui/react-icons'
import { useEffect, useMemo, useState } from 'react'
import { useGetAllDropDownValues } from '@/service/query-hooks/get-all-dropdown-api'
import { Search } from 'lucide-react'
import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
} from '@/components/ui/form'

interface SearchDropProps {
    popoverOpen: boolean
    setPopoverOpen: (data: any) => void
    value: string
    setValue: (data: any) => void
    placeHolder?: string
    languageTitle: string
    apiFields: { label: string; value: string }
    type?: 'default' | 'drop'
}

const SearchDrop: React.FC<SearchDropProps> = ({
    popoverOpen,
    setPopoverOpen,
    value,
    setValue,
    placeHolder,
    apiFields,
    languageTitle,
    type,
}) => {
    const { t } = useTranslation(languageTitle)
    const [modifiedData, setModifiedData] = useState<any>([])
    const { data, isLoading, isError } = useGetAllDropDownValues(
        'main/branches/distinct',
    )

    const memorizedData = useMemo(() => data?.data, [data])

    useEffect(() => {
        const modifiedDataResult = memorizedData?.map((item: any) => {
            return {
                label: item[apiFields.label],
                value: item[apiFields.value],
            }
        })

        setModifiedData(modifiedDataResult)
    }, [memorizedData])

    return (
        <Popover modal open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger className="w-full" asChild>
                <Button
                    variant={'outline'}
                    role="combobox"
                    className={cn(
                        'w-[200px]   text-[#8A8A8E] justify-start font-bold flex  items-center gap-2 bg-[#F1F5FB]',
                        type === 'drop' && 'rounded border-[#C3DDF4]  bg-[#EEFDFD]  h-[45px]',
                    )}
                >
                    {type !== 'drop' && <Search />}

                    {value ? (
                        modifiedData?.find(
                            (language: any) => language.label === value,
                        )?.label
                    ) : (
                        <span className="text-[14px] ">
                            {placeHolder
                                ? placeHolder
                                : t('Search Placeholder')}
                        </span>
                    )}
                    
                    {type === 'drop' && <ChevronDownIcon />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn('w-full max-w-[700px] p-0')}>
                <Command>
                    <CommandInput placeholder={t('search')} className="h-9" />
                    <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                            {modifiedData?.map((item: any) => (
                                <CommandItem
                                    value={item.label}
                                    key={item.value}
                                    onSelect={() => {
                                        setValue(item.label)
                                    }}
                                >
                                    {item.label}
                                    <CheckIcon
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            item.value === value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SearchDrop
