import { cn } from '@/lib/utils'
import { useGetAllDropDownValues } from '@/service/query-hooks/get-all-dropdown-api'
import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
} from '@/components/ui/form'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CheckCheckIcon, CheckIcon, ChevronDownIcon } from 'lucide-react'

import { useFormContext } from 'react-hook-form'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import Loader from '../../loaders/loader'

interface MultiEmployeeField {
    apiFields: { label: string; value: string }
    endPoint: string
    translation: string
    title: any
    required: boolean
    disabled?: boolean
    requiredLabel?: boolean
    fieldHeight: any
    fieldWidth: string
    fieldName: string
    value: any
    setValue: any
}

const MultiEmployeeSelectField: React.FC<MultiEmployeeField> = ({
    value,
    setValue,
    apiFields,
    endPoint,
    translation,
    title,
    fieldWidth,
    disabled = false,
    fieldHeight,
    required,
    requiredLabel = true,
    fieldName,
}) => {
    const [modifiedData, setModifiedData] = useState<
        { label: string; value: string }[]
    >([])
    const { t } = useTranslation(translation)

    const { data, isLoading, isError } = useGetAllDropDownValues(endPoint)
    const form = useFormContext()

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

    const handleSelect = (item: any) => {
        setValue((prev: any) => {
            const updatedValues = [...prev]
            const index = updatedValues.indexOf(item.label)
            if (index !== -1) {
                updatedValues.splice(index, 1) // Remove existing value
            } else {
                updatedValues.push(item.label) // Add value if it doesn't exist
            }

            return updatedValues
        })
    }

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={cn(fieldWidth)}>
                    {requiredLabel && (
                        <FormLabel className="font-light">
                            {t(fieldName)}{' '}
                            {required && (
                                <span className="ms-1 text-danger-500">*</span>
                            )}
                        </FormLabel>
                    )}
                    <Popover modal>
                        <PopoverTrigger className="w-full" asChild>
                            <FormControl className="w-full">
                                <Button
                                    {...field}
                                    disabled={disabled}
                                    variant={'ghost'}
                                    role="combobox"
                                    className={cn(
                                        `w-full border-[1px] disabled:bg-[#F1F5FB] disabled:opacity-100 disabled:border-none border-[#A0AEC0]  text-sideMenuTextColor2 disabled:text-secondaryTextColor rounded-[10px]   justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                                        fieldHeight,
                                    )}
                                >
                                    {value.length > 0 ? (
                                        <span className="text-[#3F88EC]">{`${value.length} ${t('selected')}`}</span>
                                    ) : (
                                        <span className='text-[14px] text-[#A0AEC0]'>
                                            Select
                                        </span>
                                    )}
                                    <ChevronDownIcon
                                        className={cn(
                                            'ml-2  text-secondaryText h-[20px] w-[20px] shrink-0 ',
                                        )}
                                    />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[247px] p-2">
                            <Command>
                                <div className="flex  h-[44px] select-none items-center gap-2 px-3 border-b">
                                    <CommandInput
                                        placeholder="Search Dropdown "
                                        className="w-[80%]   outline-none  text-sm focus:border-none focus:ring-0 border-0 select-none text-sideMenuTextColor2"
                                    />
                                </div>
                                <CommandList>
                                    <CommandEmpty>No item found.</CommandEmpty>
                                    <ScrollArea className="h-[216px] ">
                                        <CommandGroup>
                                            {isLoading ? (
                                                <Loader />
                                            ) : (
                                               <div>
                                                {
                                                     modifiedData?.map((item) => {
                                                        return (
                                                            <CommandItem
                                                                className="cursor-pointer text-sideMenuTextColor2"
                                                                key={item.value}
                                                                onSelect={() =>
                                                                    handleSelect(
                                                                        item,
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className={cn(
                                                                        'mr-2 flex h-5 w-5 items-center justify-center rounded-md border border-primary ',
    
                                                                        value.includes(
                                                                            item.label,
                                                                        )
                                                                            ? 'bg-primary text-primary-foreground'
                                                                            : 'opacity-50 [&_svg]:invisible',
                                                                    )}
                                                                >
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            'h-5 w-5',
                                                                            'bg-primary-500 p-[2px] font-bold rounded-sm text-white ',
                                                                        )}
                                                                    />
                                                                </div>
    
                                                                {item.label}
                                                            </CommandItem>
                                                        )
                                                    })
                                                }
                                                {
                                                     modifiedData?.map((item) => {
                                                    return (
                                                        <CommandItem
                                                            className="cursor-pointer text-sideMenuTextColor2"
                                                            key={item.value}
                                                            onSelect={() =>
                                                                handleSelect(
                                                                    item,
                                                                )
                                                            }
                                                        >
                                                            <div
                                                                className={cn(
                                                                    'mr-2 flex h-5 w-5 items-center justify-center rounded-md border border-primary ',

                                                                    value.includes(
                                                                        item.label,
                                                                    )
                                                                        ? 'bg-primary text-primary-foreground'
                                                                        : 'opacity-50 [&_svg]:invisible',
                                                                )}
                                                            >
                                                                <CheckIcon
                                                                    className={cn(
                                                                        'h-5 w-5',
                                                                        'bg-primary-500 p-[2px] font-bold rounded-sm text-white ',
                                                                    )}
                                                                />
                                                            </div>

                                                            {item.label}
                                                        </CommandItem>
                                                    )
                                                })
                                                }
                                               </div>
                                            )}
                                        </CommandGroup>
                                    </ScrollArea>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </FormItem>
            )}
        />
    )
}

export default MultiEmployeeSelectField
