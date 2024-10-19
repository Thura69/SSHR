import { cn } from '@/lib/utils'
import { useGetAllDropDownValues } from '@/service/query-hooks/get-all-dropdown-api'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useQueryState } from 'nuqs'
import { Badge } from '@/components/ui/badge'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { CommandInput } from 'cmdk'
import { ScrollArea } from '@/components/ui/scroll-area'
import Loader from '../../loaders/loader'
import { CheckIcon, ChevronDownIcon, MagnetIcon, Search } from 'lucide-react'
import { filterDataType } from '@/components/employee/employee-filtere'

// Enum for filter titles

interface MultiEmployeeSelec {
    apiFields: { label: string; value: string }
    endPoint: string
    translation: string
    nuqsField: string
    value: any
    setValue: any
    title: any
    fieldName: any
}

const MultiEmployeeSelect: React.FC<MultiEmployeeSelec> = ({
    apiFields,
    endPoint,
    translation,
    nuqsField,
    value,
    setValue,
    fieldName,
    title,
}) => {
    const [modifiedData, setModifiedData] = useState<
        { label: string; value: string }[]
    >([])
    const { t } = useTranslation(translation)
    const [__, setNuqsValue] = useQueryState(nuqsField, {
        defaultValue: '',
        clearOnDefault: true,
    })

    const { data, isLoading, isError } = useGetAllDropDownValues(endPoint)

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
        <section
            className={cn(
                'w-full sm:w-[172px] duration-600  animate-fade-item flex flex-col gap-2 h-[63px]',
            )}
        >
            <p className="font-[400] text-[14px] text-sideMenuTextColor2">
                {t(`${fieldName}`)}
            </p>
            <Popover modal>
                <PopoverTrigger>
                    <Button
                        variant={'ghost'}
                        role="combobox"
                        className={cn(
                            ` w-full sm:w-[172px] disabled:bg-[#F1F5FB] disabled:opacity-100 disabled:border-none border-[#A0AEC0] bg-[#F2F8FD] text-[#A0AEC0] disabled:text-secondaryTextColor  justify-between focus:ring-0 focus:ring-offset-2 `,
                        )}
                    >
                        {value[fieldName].length > 0 ? (
                            <span className="text-[#3F88EC]">{`${value[fieldName].length} ${t('selected')}`}</span>
                        ) : (
                            <span className="font-bold text-secondaryText text-[14px]">
                                Select
                            </span>
                        )}
                        <ChevronDownIcon
                            className={cn(
                                'ml-2  text-secondaryText h-[20px] w-[20px] shrink-0 ',
                                value[fieldName].length > 0 && 'text-[#3F88EC]',
                            )}
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[247px] p-2">
                    <Command>
                        <div className="flex h-[44px] select-none items-center gap-2 px-3 border-b">
                            <Search className="text-sideMenuTextColor2 w-5 h-5" />
                            <CommandInput
                                placeholder="Search Dropdown "
                                className="w-[80%]   outline-none  text-sm focus:border-none focus:ring-0 border-0 select-none text-sideMenuTextColor2"
                            />
                        </div>
                        <CommandList>
                            <CommandEmpty>No item found.</CommandEmpty>

                            <CommandGroup>
                                <ScrollArea
                                    className="w-full rounded-md"
                                    style={{
                                        height:
                                            Math.min(7, modifiedData?.length) *
                                            34,
                                    }}
                                >
                                    {isLoading ? (
                                        <Loader />
                                    ) : (
                                        modifiedData?.map((item) => {
                                            return (
                                                <CommandItem
                                                    className="cursor-pointer text-sideMenuTextColor2"
                                                    key={item.value}
                                                    onSelect={() => {
                                                        setValue(
                                                            (
                                                                prevFilterData: any,
                                                            ) => {
                                                                const updatedValues =
                                                                    [
                                                                        ...(prevFilterData[
                                                                            fieldName
                                                                        ] as string[]),
                                                                    ]

                                                                const index =
                                                                    updatedValues.indexOf(
                                                                        item.label,
                                                                    )

                                                                if (
                                                                    index !== -1
                                                                ) {
                                                                    updatedValues.splice(
                                                                        index,
                                                                        1,
                                                                    ) // Remove existing value
                                                                } else {
                                                                    updatedValues.push(
                                                                        item.label,
                                                                    ) // Add value if it doesn't exist
                                                                }

                                                                return {
                                                                    ...prevFilterData,
                                                                    [fieldName]:
                                                                        updatedValues,
                                                                }
                                                            },
                                                        )
                                                    }}
                                                >
                                                    <div
                                                        className={cn(
                                                            'mr-2 flex h-5 w-5 items-center justify-center rounded-md border border-primary ',
                                                            value[
                                                                fieldName
                                                            ].includes(
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
                                    )}
                                </ScrollArea>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </section>
    )
}

export default MultiEmployeeSelect
