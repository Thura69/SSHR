'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandEmpty,
} from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '@/lib/utils'
import { useFormContext, useController, useFieldArray } from 'react-hook-form'
import { useGetAllEmpStatus } from '@/service/query-hooks/setting/useEmploymentStatus'

type Framework = Record<'value' | 'label', string>

interface FancyMultiSelectProps {
    FRAMEWORKS: Framework[]
    field: any
    form: any
    isEmpty: boolean
    incomeStatus?: any
}

const FancyMultiSelect = ({
    FRAMEWORKS,
    field,
    isEmpty,
    form,
    incomeStatus,
    ...props
}: FancyMultiSelectProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [open, setOpen] = React.useState(false)
    const [onFocus, setOnFocus] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')

    const { formState, getValues } = useFormContext()

    //new solution
    const [includesData, setIncludesData] = React.useState<any>([])
    const { isLoading: empLo, data: EmpData, isError } = useGetAllEmpStatus()

    const memorizedData = React.useMemo(() => EmpData, [EmpData])
    const { control } = form
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'employeeStatus',
    })

    React.useEffect(() => {
        if (field.value) {
            setIncludesData(field.value)
        }
    }, [])

    const isPositionTypeEmpty = getValues('employeeStatus')?.length === 0

    const handleUnselect = React.useCallback((framework: Framework) => {
        setIncludesData((prev: any) =>
            prev.filter((s: any) => s.value !== framework.value),
        )
    }, [])

    React.useEffect(() => {
        form.setValue('employeeStatus', includesData, { shouldDirty: true })
    }, [includesData])

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current
            if (input) {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    if (input.value === '') {
                        form.setValue(
                            'employeeStatus',
                            (prevPositionType: any) => {
                                const newPositionType = [...prevPositionType]
                                newPositionType.pop()
                                return newPositionType
                            },
                            { shouldDirty: true },
                        )
                    }
                }
                if (e.key === 'Escape') {
                    input.blur()
                }
            }
        },
        [],
    )

    const areFrameworksEqual = (framework1: any, framework2: any) => {
        return (
            framework1?.value === framework2?.value &&
            framework1?.label === framework2?.label
        )
    }

    const selectables = FRAMEWORKS?.filter(
        (framework) =>
            !includesData.some((selectedFramework: any) =>
                areFrameworksEqual(selectedFramework, framework),
            ),
    )

    return (
        <Command onKeyDown={handleKeyDown} className="overflow-visible">
            <div
                className={cn(
                    'group flex w-full rounded-xl border border-gray-400 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
                )}
            >
                <div className="">
                    <div className="flex w-full  overflow-y-scroll gap-1 flex-wrap">
                        {includesData.map((framework: any) => {
                            return (
                                <Badge
                                    key={framework.value}
                                    variant="secondary"
                                >
                                    {framework.label}
                                    <div
                                        className="ml-1 ring-offset-background  rounded-full outline-none focus:ring-2 cursor-pointer focus:ring-ring focus:ring-offset-2"
                                        onClick={() =>
                                            handleUnselect(framework)
                                        }
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </div>
                                </Badge>
                            )
                        })}
                    </div>
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => {
                            setOpen(true)
                            setOnFocus(true)
                        }}
                        placeholder="Select Employment Status..."
                        className="ml-2 bg-transparent w-[180px]   outline-none placeholder:text-muted-foreground  "
                    />
                </div>
            </div>
            <div className="relative">
                {open && selectables?.length > 0 ? (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-white text-popover-foreground shadow-md outline-none animate-in">
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup className="h-full overflow-auto">
                                {selectables?.map((framework) => {
                                    return (
                                        <CommandItem
                                            key={framework.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onSelect={(value) => {
                                                setInputValue('')
                                                const currentPositionType =
                                                    form.getValues(
                                                        'employeeStatus',
                                                    )

                                                // form.setValue(
                                                //     'employeeStatus',
                                                //     [
                                                //         ...currentPositionType,
                                                //         framework,
                                                //     ],
                                                //     { shouldDirty: true },
                                                // )

                                                setIncludesData((pre: any) => [
                                                    ...pre,
                                                    framework,
                                                ])
                                            }}
                                            className={'cursor-pointer '}
                                        >
                                            {framework.label}
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </CommandList>
                    </div>
                ) : null}
            </div>
        </Command>
    )
}

export default FancyMultiSelect
