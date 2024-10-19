import { CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import {
    useState,
    useRef,
    useCallback,
    useEffect,
    KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import CustomCommandInput from './custom-command-input'
import { useDebouncedCallback } from 'use-debounce'
import { useQueryState } from 'nuqs'
import { useTranslation } from 'react-i18next'

interface Option {
    value?: number
    label?: string
}

interface AutoCompleteProps<T> {
    options: T[]
    emptyMessage: string
    value?: Option
    onValueChange?: (value: Option) => void
    isLoading?: boolean
    disabled?: boolean
    placeholder?: string
    setFormData: (value: any) => void
    getKey: (item: T) => number
    getLabel: (item: T) => string
}

const DropdownInput = <T,>({
    options,
    placeholder,
    emptyMessage,
    value,
    onValueChange,
    disabled,
    setFormData,
    isLoading = false,
    getKey,
    getLabel,
}: AutoCompleteProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { t } = useTranslation('user')
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState<Option>(value as Option)
    const [inputValue, setInputValue] = useState<string>(value?.label || '')
    const debouncedValue = useDebouncedCallback(setInputValue, 500)
    const [query, setQuery] = useQueryState('query', {
        clearOnDefault: true,
    })

    useEffect(() => {
        if (value && value.label !== inputValue) {
            setInputValue(value.label || inputValue)
        }
    }, [value])

    const handleKeyDown = useCallback(
        (event: ReactKeyboardEvent<HTMLDivElement>) => {
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

    const handleBlur = useCallback(() => {
        setOpen(false)
        if (selected?.label) {
            setInputValue(selected.label)
        }
    }, [selected])

    const handleOnChange = (value: string) => {
        isLoading ? undefined : setInputValue(value)
        // setFormData(null)
        debouncedValue(value)
        setQuery(value)
    }

    const handleSelectOption = useCallback(
        (selectedOption: T) => {
            const label = getLabel(selectedOption)
            const key = getKey(selectedOption)

            setSelected({
                value: key,
                label: label,
            })
            onValueChange?.({
                value: key,
                label: label,
            })

            setInputValue(label)

            setTimeout(() => {
                inputRef?.current?.blur()
            }, 0)
        },
        [onValueChange, getKey, getLabel],
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
                        'border border-gray-400 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-500',
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
                                        const optionValue = getLabel(option)
                                        const isSelected =
                                            selected?.value === getKey(option)
                                        return (
                                            <CommandItem
                                                key={getKey(option)}
                                                value={optionValue}
                                                onMouseDown={(event) => {
                                                    event.preventDefault()
                                                    event.stopPropagation()
                                                }}
                                                onSelect={() =>
                                                    handleSelectOption(option)
                                                }
                                                className={cn(
                                                    'flex items-center gap-2 w-full',
                                                    !isSelected ? 'pl-8' : null,
                                                )}
                                            >
                                                {isSelected ? (
                                                    <Check className="w-4" />
                                                ) : null}
                                                {optionValue}
                                            </CommandItem>
                                        )
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

export default DropdownInput
