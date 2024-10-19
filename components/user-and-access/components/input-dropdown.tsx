'use client'

import { CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import {
    useState,
    useRef,
    useCallback,
    type KeyboardEvent,
    useEffect,
} from 'react'

// import { Skeleton } from "./ui/skeleton"
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import CustomCommandInput from './custom-command-input'
import { useDebouncedCallback } from 'use-debounce'
import { useQueryState } from 'nuqs'
import { useTranslation } from 'react-i18next'

interface Employee {
    Company_ID: number
    Tenant_ID: number
    Company_Name: string
    Employee_ID: number
    Location_ID: number
    Location_Name: string
    Branch_ID: number
    Branch_Name: string
    Department_ID: number
    Department_Name: string
    Section_ID: number
    Section_Name: string
    Position_ID: number
    Position_Name: string
    User_ID: number
    Role_ID: number
    Employee_Name: string
    IsActive: boolean
    Role_Name: string
    Employee_No: string
}

export type Option = {
    value?: number
    label?: string
}

type AutoCompleteProps = {
    options: Employee[]
    emptyMessage: string
    value?: Option
    onValueChange?: (value: Option) => void
    isLoading?: boolean
    disabled?: boolean
    placeholder?: string
    type?: 'No' | 'Name' | 'Role'
    setFormData: (value: any) => void
    onReset?: () => void
}

const InputDropdown = ({
    options,
    placeholder,
    emptyMessage,
    value,
    onValueChange,
    disabled,
    type,
    setFormData,
    isLoading = false,
    onReset,
}: AutoCompleteProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { t } = useTranslation('user')
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState<Option>(value as Option)
    const [inputValue, setInputValue] = useState<string>(value?.label || '')
    const [Employee_Name, setEmployee_Name] = useQueryState('Employee_Name', {
        clearOnDefault: true,
    })
    const [Employee_No, setEmployeeNo] = useQueryState('Employee_No', {
        clearOnDefault: true,
    })
    const debouncedName = useDebouncedCallback(setEmployee_Name, 500)
    const debouncedNo = useDebouncedCallback(setEmployeeNo, 500)
    useEffect(() => {
        if (value && value.label !== inputValue) {
            setInputValue(value.label || inputValue)
        }
    }, [value])

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current
            if (!input) {
                return
            }

            if (!isOpen) {
                setOpen(true)
            }

            if (event.key === 'Escape') {
                input.blur()
            }
        },
        [isOpen],
    )

    // Function to reset the state of the InputDropdown component
    const resetDropdown = () => {
        setSelected(null as unknown as Option)
        setInputValue('')
        setOpen(false)
    }

    const handleBlur = useCallback(() => {
        setOpen(false)
        if (selected?.label) {
            setInputValue(selected.label)
        }
    }, [selected])

    // useEffect(() => {
    //     // Call the onReset function passed from the parent component when this component mounts
    //     if (onReset) {
    //         onReset(resetDropdown)
    //     }
    // }, [])

    const handleOnChange = (value: string) => {
        isLoading ? undefined : setInputValue(value)
        let payload: { Employee_Name?: string; Employee_No?: string } = {}
        type === 'Name'
            ? (payload.Employee_Name = value)
            : (payload.Employee_No = value)
        setFormData(null)
        type === 'Name' ? debouncedName(value) : debouncedNo(value)
    }

    const handleSelectOption = useCallback(
        (selectedOption: Employee) => {
            const value =
                type === 'Name'
                    ? selectedOption.Employee_Name
                    : selectedOption.Employee_No

            setSelected({
                value: selectedOption.Employee_ID,
                label: value,
            })
            onValueChange?.({
                value: selectedOption.Employee_ID,
                label: value,
            })

            setInputValue(value)

            setTimeout(() => {
                inputRef?.current?.blur()
            }, 0)
        },
        [onValueChange],
    )

    return (
        <CommandPrimitive onKeyDown={handleKeyDown}>
            <div>
                <CustomCommandInput
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={handleOnChange}
                    onBlur={handleBlur}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        'border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-500',
                    )}
                />
            </div>
            <div className="mt-1 relative">
                {isOpen ? (
                    <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
                        <CommandList className="ring-1 ring-slate-200 rounded-lg">
                            {isLoading ? (
                                <CommandPrimitive.Loading>
                                    <p className="p-6 text-sm text-slate-400">
                                        {t('form.loading')}
                                    </p>
                                </CommandPrimitive.Loading>
                            ) : null}
                            {!isLoading ? (
                                <CommandGroup>
                                    {options.map((option) => {
                                        if (
                                            option.Employee_ID != undefined &&
                                            option.Employee_No != undefined
                                        ) {
                                            const optionValue =
                                                type === 'Name'
                                                    ? option.Employee_Name
                                                    : option.Employee_No
                                            const isSelected =
                                                selected?.value ===
                                                option.Employee_ID
                                            return (
                                                <CommandItem
                                                    key={option.Employee_ID}
                                                    value={optionValue}
                                                    onMouseDown={(event) => {
                                                        event.preventDefault()
                                                        event.stopPropagation()
                                                    }}
                                                    onSelect={() =>
                                                        handleSelectOption(
                                                            option,
                                                        )
                                                    }
                                                    className={cn(
                                                        'flex items-center gap-2 w-full',
                                                        !isSelected
                                                            ? 'pl-8'
                                                            : null,
                                                    )}
                                                >
                                                    {isSelected ? (
                                                        <Check className="w-4" />
                                                    ) : null}
                                                    {optionValue}
                                                </CommandItem>
                                            )
                                        } else {
                                            return null // Skip rendering if necessary data is missing
                                        }
                                    })}
                                </CommandGroup>
                            ) : null}

                            {!isLoading ? (
                                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-sm text-center">
                                    {emptyMessage}
                                </CommandPrimitive.Empty>
                            ) : null}
                        </CommandList>
                    </div>
                ) : null}
            </div>
        </CommandPrimitive>
    )
}

export default InputDropdown
