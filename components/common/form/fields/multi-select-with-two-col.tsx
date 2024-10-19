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
import { CheckIcon, ChevronDownIcon, Search } from 'lucide-react'
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
    apiFieldsTwo: { label: string; value: string }
    endPoint: string
    endPointTwo: string
    translation: string
    disabled?:boolean
    title: any
    required: boolean
    requiredLabel?: boolean
    fieldHeight: any
    fieldWidth: string
    fieldName: string
    value: any
    setValue: any
}

const MultiSelectTwoColField: React.FC<MultiEmployeeField> = ({
    value,
    setValue,
    apiFields,
    apiFieldsTwo,
    endPoint,
    endPointTwo,
    translation,
    disabled = false,
    title,
    fieldWidth,
    fieldHeight,
    required,
    requiredLabel = true,
    fieldName,
}) => {
    const [modifiedData, setModifiedData] = useState<
        { label: string; value: number }[]
    >([])

    const [modifiedDataTwo, setModifiedDataTwo] = useState<
        { label: string; value: number }[]
    >([])

    const { t } = useTranslation(translation)

    const { data, isLoading, isError } = useGetAllDropDownValues(endPoint)

    const {
        data: dataTwo,
        isLoading: isLoadingTwo,
        isError: isErrorTwo,
    } = useGetAllDropDownValues(endPointTwo)

    const form = useFormContext()

    const memorizedData = useMemo(() => data?.data, [data])
    const memorizedDataTwo = useMemo(() => dataTwo?.data, [dataTwo])

    useEffect(() => {
        const modifiedDataResult = memorizedData?.map((item: any) => {
            return {
                label: item[apiFields.label],
                value: item[apiFields.value],
            }
        })

        setModifiedData(modifiedDataResult)
    }, [memorizedData])

    useEffect(() => {
        const modifiedDataResult = memorizedDataTwo?.map((item: any) => {
            return {
                label: item[apiFieldsTwo.label],
                value: item[apiFieldsTwo.value],
            }
        })

        setModifiedDataTwo(modifiedDataResult)
    }, [memorizedDataTwo])

    const handleSelect = (item: {
        id: number
        name: string
        type: 'hard' | 'soft'
        mandatory?: boolean
    }) => {
        setValue((prevStages: any) => {
            const updatedStages = [...prevStages]

            const mandatory = item.mandatory ?? false

            const index = updatedStages.findIndex(
                (stage) => stage.name === item.name,
            )

            if (index !== -1) {
                updatedStages.splice(index, 1)
            } else {
                updatedStages.push({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    mandatory,
                })
            }

            return updatedStages
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
                    <Popover  modal>
                        <PopoverTrigger disabled={disabled} className="w-full" asChild>
                            <FormControl className="w-full">
                                <Button
                                    {...field}
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
                                        <span className="text-[14px] text-[#A0AEC0]">
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
                        <PopoverContent className="w-auto p-2">
                            <Command>
                                <div className="flex  h-[44px] select-none items-center gap-2 px-3 border-b">
                                    <CommandInput
                                        placeholder="Search Dropdown "
                                        className="w-[80%]   outline-none  text-sm focus:border-none focus:ring-0 border-0 select-none text-sideMenuTextColor2"
                                    />
                                </div>
                                <CommandList className="">
                                    <CommandEmpty>No item found.</CommandEmpty>
                                    <ScrollArea className="h-[216px]  w-full">
                                        <CommandGroup>
                                            {isLoading ? (
                                                <Loader />
                                            ) : (
                                                <div className=" flex md:flex-row flex-col justify-between">
                                                    <div>
                                                        <p
                                                            className={cn(
                                                                'text-textBlue hidden text-center px-4 text-sm mt-4 mb-2 font-[500]',
                                                            )}
                                                        >
                                                            Hard Skills
                                                        </p>
                                                        {modifiedData?.map(
                                                            (item) => {
                                                                return (
                                                                    <CommandItem
                                                                        className="cursor-pointer text-sideMenuTextColor2"
                                                                        key={
                                                                            item.value
                                                                        }
                                                                        onSelect={() => {
                                                                            let itemObject: {
                                                                                id: number
                                                                                name: string
                                                                                type:
                                                                                    | 'hard'
                                                                                    | 'soft'
                                                                                mandatory?: boolean
                                                                            } =
                                                                                {
                                                                                    id: item.value,
                                                                                    name: item.label,
                                                                                    type: 'hard',
                                                                                    mandatory:
                                                                                        false,
                                                                                }

                                                                            handleSelect(
                                                                                itemObject,
                                                                            )
                                                                        }}
                                                                    >
                                                                        <div
                                                                            key={
                                                                                item.label
                                                                            }
                                                                            className={cn(
                                                                                'mr-2 flex h-5 w-5 items-center justify-center rounded-md border border-primary',
                                                                                value.some(
                                                                                    (
                                                                                        stage: any,
                                                                                    ) =>
                                                                                        stage.name ===
                                                                                        item.label,
                                                                                )
                                                                                    ? 'bg-primary text-primary-foreground'
                                                                                    : 'opacity-50 [&_svg]:invisible',
                                                                            )}
                                                                        >
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'h-5 w-5',
                                                                                    'bg-primary-500 p-[2px] font-bold rounded-[4px] text-white',
                                                                                )}
                                                                            />
                                                                        </div>

                                                                        {
                                                                            item.label
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            },
                                                        )}
                                                    </div>
                                                    <div>
                                                    <p
                                                            className={cn(
                                                                'text-textBlue text-center hidden px-4 text-sm mt-4 mb-2 font-[500]',
                                                            )}
                                                        >
                                                            Soft Skills
                                                        </p>
                                                        {modifiedDataTwo?.map(
                                                            (item) => {
                                                                return (
                                                                    <CommandItem
                                                                        className="cursor-pointer text-sideMenuTextColor2"
                                                                        key={
                                                                            item.value
                                                                        }
                                                                        onSelect={() => {
                                                                            let itemObject: {
                                                                                id: number
                                                                                name: string
                                                                                type:
                                                                                    | 'hard'
                                                                                    | 'soft'
                                                                                mandatory?: boolean
                                                                            } =
                                                                                {
                                                                                    id: item.value,
                                                                                    name: item.label,
                                                                                    type: 'soft',
                                                                                    mandatory:
                                                                                        false,
                                                                                }

                                                                            handleSelect(
                                                                                itemObject,
                                                                            )
                                                                        }}
                                                                    >
                                                                        <div
                                                                            key={
                                                                                item.label
                                                                            }
                                                                            className={cn(
                                                                                'mr-2 flex h-5 w-5 items-center justify-center rounded-md border border-primary',
                                                                                value.some(
                                                                                    (
                                                                                        stage: any,
                                                                                    ) =>
                                                                                        stage.name ===
                                                                                        item.label,
                                                                                )
                                                                                    ? 'bg-primary text-primary-foreground'
                                                                                    : 'opacity-50 [&_svg]:invisible',
                                                                            )}
                                                                        >
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    'h-5 w-5',
                                                                                    'bg-primary-500 rounded-[4px] p-[2px] font-bold  text-white',
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            },
                                                        )}
                                                    </div>
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

export default MultiSelectTwoColField
