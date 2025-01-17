"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DropdownProps } from 'react-day-picker'
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { ScrollArea } from "./scroll-area"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {

  
  

  return (
    <DayPicker
    showOutsideDays={showOutsideDays}
    
    className={cn(" p-2 border-none   sm:w-auto", className)}
    classNames={{
      
      months: "flex flex-col sm:flex-row space-y-2  sm:space-x-4 sm:space-y-0",
      month: "space-2-4",
      dropdown:'border-none',
      caption: "flex justify-center  pt-1 relative items-center",
      caption_label: "text-sm  font-medium",
      caption_dropdowns: "flex justify-center gap-1",
      nav: "space-x-1 flex items-center",
      nav_button: cn(
        buttonVariants({ variant: "outline" }),
        "md:h-7 md:w-7 w-4 h-4 bg-transparent p-0 opacity-50 hover:opacity-100"
      ),
      nav_button_previous: "absolute left-0",
      nav_button_next: "absolute right-0",
      table: "w-[50px] border-collapse space-y-1",
      head_row: "flex ",

      head_cell: "text-muted-foreground rounded-md w-full font-sm text-[0.8rem]",
      row: "flex w-full mt-2 first:justify-end last:justify-start",
      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
      day: cn(buttonVariants({ variant: "ghost" }), "w-7 h-7 p-0 font-sm aria-selected:opacity-100"),
      day_selected:
        "bg-primary-500 text-white hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white",
      day_today: "bg-accent text-accent-foreground",
      day_outside: "text-muted-foreground opacity-50",
      day_disabled: "text-muted-foreground opacity-50",
      day_range_middle: "aria-selected:bg-primary-400/80  border-[0.1px] aria-selected:text-accent-foreground",
      day_hidden: "invisible",
      ...classNames,
    }}

    components={{
      Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
        const options = React.Children.toArray(children) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[]
        const selected = options.find((child) => child.props.value === value)
        const handleChange = (value: string) => {
          const changeEvent = {
            target: { value },
          } as React.ChangeEvent<HTMLSelectElement>
          onChange?.(changeEvent)
        }
        return (
                <Select
                    value={value?.toString()}
                    onValueChange={(value) => {
                        handleChange(value)
                    }}
                >
                    <SelectTrigger className="pr-1.5 bg-white focus:ring-white border-none focus:ring-0">
                        <SelectValue>
                            {selected?.props?.children}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <ScrollArea className="h-40">
                            {options.map((option, id: number) => (
                                <SelectItem
                                    key={`${option.props.value}-${id}`}
                                    value={
                                        option.props.value?.toString() ??
                                        ''
                                    }
                                >
                                    {option.props.children}
                                </SelectItem>
                            ))}
                        </ScrollArea>
                    </SelectContent>
                </Select>
            )
        },
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => (
            <ChevronRight className="h-4 w-4" />
        ),
    }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
