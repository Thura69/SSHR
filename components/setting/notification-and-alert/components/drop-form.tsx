import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command';


const autoCompleteOptions = [
    { label: 'Frequency', value: 'frequency' },
    { label: 'Day', value: 'day' },
    { label: 'Hour', value: 'hour' },
]

const Lateness = [
    { label: 'Frequency', value: 'frequency' },
    { label: 'Day', value: 'day' },
    { label: 'Hour', value: 'hour' },
]

const missingSwipe = [
    { label: 'Time', value: 'time' },
    { label: 'Day', value: 'day' },
]

const DropForm = ({
    form,
    formInput,
    title,
    formDrop,
}: {
    form: any
    formInput: string
    formDrop: string
    title?: string
}) => {
    const [closePopover, setClosePopover] = useState(false)
    const [dropData, setDropData] = useState(autoCompleteOptions);
    const [show,setShow] = useState(false);

    console.log(title);
    

    useEffect(() => {

        const isRequired = form.formState?.errors[formInput];

        if(isRequired?.message === 'required'){
            setShow(true);
          }else{
            setShow(false);
          }

        if ((title == 'lateness') || (title == 'earlyOut') ) {
            setDropData(Lateness)
        } else if (title == 'missingSwipes') {
            setDropData(missingSwipe)
        }
    }, [title,form.formState?.errors[formInput]]);


    return (
        <div className="flex w-full">
            <FormField
                control={form.control}
                name={formInput}
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Input
                               type="number" 
                               pattern="[0-9]*"
                                className=" border-slate-300 rounded-none"
                                {...field}
                            />
                        </FormControl>
                   {show? <></> : <FormMessage className='  w-[150%]'/>  }
                    </FormItem>
                )}
            ></FormField>

            <FormField
                control={form.control}
                name={formDrop}
                render={({ field }) => (
                    <FormItem className="flex-col w-[120px] ">
                        <Popover
                            open={closePopover}
                            onOpenChange={setClosePopover}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        `  justify-between gap-1 w-full bg-gray-200 rounded-none `,
                                        !field.value && 'text-muted-foreground',
                                    )}
                                >
                                    {field.value
                                        ? dropData?.find(
                                              (language: any) =>
                                                  language.value ===
                                                  field.value,
                                          )?.label
                                        : 'Frequency'}

                                    <ChevronDownIcon className="  h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className={cn(`    p-0`)}>
                                <Command>
                                    <CommandList>
                                        <CommandEmpty>
                                            No item found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {dropData?.map((item: any) => (
                                                <CommandItem
                                                    value={item.label}
                                                    key={item.value}
                                                    onSelect={() => {
                                                        form.setValue(
                                                            `${formDrop}`,
                                                            item.value,
                                                            {shouldDirty:true}
                                                        )
                                                        setClosePopover(false)
                                                    }}
                                                >
                                                    {item.label}
                                                    <CheckIcon
                                                        className={cn(
                                                            'ml-auto h-4 w-4',
                                                            item.value ===
                                                                field.value
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
                    </FormItem>
                )}
            ></FormField>
        </div>
    )
}

export default DropForm
