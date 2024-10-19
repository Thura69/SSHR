'use client'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Cross1Icon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, PlusIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table/data-table'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'

const DemoInterviewFeedback = [
    {
        interviewer_Name: 'Aung Zin',
        feedback:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    },
    {
        interviewer_Name: 'Aung Zin',
        feedback:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
    },
]

const CreateInterviewEvaluation = () => {
    const form = useForm()

    const languages = [
        {
            id: 'c++',
            label: 'C++',
        },
        {
            id: 'python',
            label: 'Python',
        },
        {
            id: 'java',
            label: 'Java',
        },
    ] as const

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'interviewer_Name',
            header: ({ column }) => {
                return (
                    <div className={'md:w-[150px]'}>
                        <p className={'line-clamp-1'}>Interviewer Name</p>
                    </div>
                )
            },
        },
        {
            accessorKey: 'feedback',
            header: ({ column }) => {
                return <p>Feedback</p>
            },
        },
        {
            accessorKey: 'action',
            header: ({ column }) => {
                return <p>Action</p>
            },
            cell: ({}) => {
                return (
                    <div className={'flex justify-center w-[40px]'}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="hover:">
                                <Button
                                    variant="primary"
                                    className="h-8 w-8 p-0"
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4 rotate-90" />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => {}}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {}}>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="p-4">
            <Breadcrumbs
                segments={[
                    { title: 'Settings', href: '/setting' },
                    { title: 'Change Recruitment', href: '' },
                    { title: 'Job Opening', href: '' },
                    { title: 'Interview Evaluation Entry', href: '' },
                ]}
            />
            <h1 className="text-2xl font-bold my-4">
                Interview Evaluation Entry
            </h1>

            <Form {...form}>
                <form className="space-y-5">
                    <div className="md:flex justify-between items-center gap-10 max-sm:space-y-4">
                        <FormField
                            name="job-title"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel>
                                            Job Title{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="EMPID 0001"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            name="job-title"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel>
                                            Candidate no{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Select Position"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                    </div>
                    <div className="md:flex justify-between items-center gap-10 max-sm:space-y-4">
                        <FormField
                            name="candidate-name"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel>
                                            Candidate Name{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Type Here"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            name="screening-stage"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem className="w-full">
                                        <FormLabel>
                                            Screening Stage{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="15/08/2001"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                    </div>
                    <div>
                        <Label>
                            Hiring Manager{' '}
                            <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="border border-gray-300 rounded-full py-2 flex justify-between items-center w-1/2 md:w-1/4 lg:w-1/6 px-4">
                                <p className="text-zinc-500  text-sm">
                                    Aung Lee
                                </p>
                                <Cross1Icon />
                            </div>
                            <div className="border border-gray-300 rounded-full py-2 flex justify-between items-center w-1/2 md:w-1/4 lg:w-1/6 px-4">
                                <p className="text-zinc-500 text-sm">
                                    Aung Lee
                                </p>
                                <Cross1Icon />
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-16 p-4 border-gray-300 space-y-5">
                        <h2 className="text-2xl font-bold">
                            Interview Question
                        </h2>
                        <div>
                            <FormField
                                name="what-is-oop"
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <FormItem className="w-full">
                                            <FormLabel className="mb-1">
                                                1 What is OOP?
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="border-gray-300
                                                    lg:w-3/4"
                                                    placeholder="Type Here"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mt-1">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>
                                                {' '}
                                                2 Able to Travel?
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="all" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Yes
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="mentions" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            No
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="mb-1 font-medium">
                                3 Programming Language
                            </Label>
                            <FormField
                                control={form.control}
                                name="items"
                                render={() => (
                                    <FormItem className="flex items-center space-y-0 gap-3">
                                        {languages.map((lang) => (
                                            <FormField
                                                key={lang.id}
                                                control={form.control}
                                                name="language"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={lang.id}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(
                                                                        lang.id,
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) => {
                                                                        return checked
                                                                            ? field.onChange(
                                                                                  [
                                                                                      ...(field.value
                                                                                          ? field.value
                                                                                          : []),
                                                                                      lang.id,
                                                                                  ],
                                                                              )
                                                                            : field.onChange(
                                                                                  field.value?.filter(
                                                                                      (
                                                                                          value: any,
                                                                                      ) =>
                                                                                          value !==
                                                                                          lang.id,
                                                                                  ),
                                                                              )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="">
                                                                <p className="mb-1 text-sm ">
                                                                    {lang.label}
                                                                </p>
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        name="file-attachment"
                        control={form.control}
                        render={({ field }) => {
                            return (
                                <FormItem className="w-full py-3">
                                    <FormControl>
                                        <Input
                                            id="actual-btn"
                                            className="hidden"
                                            type="file"
                                            {...field}
                                        />
                                    </FormControl>
                                    <label
                                        htmlFor="actual-btn"
                                        className="border border-dashed border-gray-300 rounded-8 py-3 text-sm px-6 text-zinc-500"
                                    >
                                        Attach File
                                    </label>
                                </FormItem>
                            )
                        }}
                    />
                    <div className={'pb-4'}>
                        <FormField
                            control={form.control}
                            name="next-screening"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Select Next Screening Stage{' '}
                                        <span className={'text-red-500'}>
                                            *
                                        </span>
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select here" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="m@example.com">
                                                m@example.com
                                            </SelectItem>
                                            <SelectItem value="m@google.com">
                                                m@google.com
                                            </SelectItem>
                                            <SelectItem value="m@support.com">
                                                m@support.com
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>

            <div
                className={
                    'border rounded-16 p-4 border-gray-300 space-y-5 mb-4'
                }
            >
                <div className={'flex justify-between items-center'}>
                    <h2 className={'text-2xl font-bold'}>Interview feedback</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="primary">
                                <PlusIcon />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Feedback</DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form className={'space-y-4'}>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="next-screening"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-medium">
                                                        Evaluator
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select here" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="m@example.com">
                                                                m@example.com
                                                            </SelectItem>
                                                            <SelectItem value="m@google.com">
                                                                m@google.com
                                                            </SelectItem>
                                                            <SelectItem value="m@support.com">
                                                                m@support.com
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="feedback"
                                            className={'font-medium'}
                                        >
                                            Feedback
                                        </Label>
                                        <Textarea
                                            id={'feedback'}
                                            className={'mt-1'}
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            variant={'primary'}
                                            type="submit"
                                        >
                                            Save feedback
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>

                <DataTable columns={columns} data={DemoInterviewFeedback} />
            </div>

            <div className={'flex gap-2 justify-end'}>
                <Button className={'w-[140px]'} size={'lg'} variant={'primary'}>
                    Save
                </Button>
                <Button className={'w-[140px]'} size={'lg'} variant={'outline'}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default CreateInterviewEvaluation
