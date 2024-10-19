'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Checkbox } from '@/components/ui/checkbox'

const dropdowns = ['Apple', 'Orange', 'Pieapple'] as const

export const ProfileDropdown = () => {
    const form = useForm()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="primary"
                    className="flex gap-2 items-center rounded-full bg-neutral-100/50 hover:bg-neutral-200/50 max-sm:w-[40px]"
                >
                    <span className="text-neutral-600 text-sm sm:text-base truncate line-clamp-1">
                        Apple
                    </span>
                    <ChevronDown className="text-neutral-600 w-5 sm:w-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Form {...form}>
                    <form className="flex flex-col p-2 space-y-2">
                        {dropdowns.map((item, index) => (
                            <div
                                className="flex items-center"
                                key={item + index}
                            >
                                <FormField
                                    control={form.control}
                                    name={item}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    id={item}
                                                    checked={field.value}
                                                    defaultChecked={false}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    className="data-[state=checked]:bg-primary-500 data-[state=checked]:text-white border-gray-800 data-[state=checked]:border-0 rounded-md"
                                                />
                                            </FormControl>
                                            <FormLabel
                                                className="w-full h-full text-base"
                                                htmlFor={item}
                                            >
                                                {item}
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                    </form>
                </Form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
