'use client'

import React, { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import isAuth from '@/components/auth/components/protected-route'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { Button } from '@/components/ui/button'
import {
    BellIcon,
    BuildingIcon,
    BuildingTwoIcon,
    DocumentChartIcon,
    DocumentChartTwoIcon,
    DocumentIcon,
    DocumentTwoIcon,
    DoubleLeftChevornIcon,
    EmployeeIcon,
    EmployeeTwoIcon,
    MenuIcon,
    OffboardIcon,
    OnboardIcon,
    PencilIcon,
    PerformanceIcon,
    PlusOutlineIcon,
    QuestionCircle,
    SettingIcon,
    TrainingTwoIcon,
    TrashIcon,
    UsersIcon,
} from '@/components/common/icons'
import { TransferIcon } from '@/components/common/icons/transfer'
import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

import { Buttons } from '../../components/common/demo'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Briefcase, CheckIcon } from 'lucide-react'
import useToast from '@/hooks/use-toast'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CaretSortIcon } from '@radix-ui/react-icons'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tree, TreeDataNode, TreeProps } from 'antd'
import EmployeeCardTable from '@/components/user-and-access/card-list/employee-card-table'
import EmployeeCardModal from '@/components/user-and-access/card-list/employee-card-modal'

type Inputs = {
    example: string
    email: string
    mobile: boolean
    radioGroup: string
}

let userSchema = yup.object({
    example: yup.string().required(' '),
    email: yup.string().email().required(' '),
    mobile: yup.boolean().required(' '),
    radioGroup: yup.string().required(' '),
    textarea: yup.string().required(' '),
    autoComplete: yup.string().required(' '),
    password: yup.string().required(' '),
})

const emailOptions = [{ value: 'm@example.com', label: 'm@example.com' }]
const raioOptions = [
    { value: 'all', label: 'All new messages' },
    { value: 'mentions', label: 'Direct messages and mentions' },
    { value: 'none', label: 'Nothing' },
]
const autoCompleteOptions = [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'Portuguese', value: 'pt' },
    { label: 'Russian', value: 'ru' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Korean', value: 'ko' },
    { label: 'Chinese', value: 'zh' },
]

const ExamplePage = () => {
    const form = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            example: '',
        },
    })

    const { showNotification } = useToast()

    useEffect(() => {
        const timer = setTimeout(() => {
            showNotification({ message: 'default notifications' })
            showNotification({
                message: 'success notifications',
                type: 'success',
            })
            showNotification({
                message: 'errorf notifications',
                type: 'danger',
            })
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    const treeData: TreeDataNode[] = [
        {
            title: 'parent 1',
            key: '0-0',
            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',
                    disabled: true,
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
                            disableCheckbox: true,
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-1',
                        },
                    ],
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    children: [
                        {
                            title: (
                                <span
                                    style={{
                                        color: '#1677ff',
                                    }}
                                >
                                    sss
                                </span>
                            ),
                            key: '0-0-1-0',
                        },
                    ],
                },
            ],
        },
    ]

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {}

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {}

    return (
        <section className="p-4">
            <Breadcrumbs
                segments={[
                    {
                        title: 'Home',
                        href: '/example',
                    },
                    {
                        title: 'Employee',
                        href: `/employee`,
                    },
                    {
                        title: 'Last Page',
                        href: '',
                    },
                ]}
            />
            <Tree
                checkable
                defaultExpandedKeys={['0-0-0', '0-0-1']}
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData}
            />
            <br />
            <Buttons />
            <br />

            <EmployeeCardModal />

            <Accordion type="single" collapsible className="w-[300px]">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent value="example">
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/*<DateSelectors />*/}
            <br />
            <ProfileDropdown />
            <br />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full lg:w-2/4 space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="example"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">
                                    Form Input
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Form Input"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password Input</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={'textarea'}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Form TextArea</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Form Select</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={'Select Email'}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {emailOptions
                                            ? emailOptions.map((option) => (
                                                  <SelectItem
                                                      key={option.value}
                                                      value={option.value}
                                                  >
                                                      {option.label}
                                                  </SelectItem>
                                              ))
                                            : []}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormProvider {...form}>
                        <FormField
                            control={form.control}
                            name="autoComplete"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Form Auto Complete</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        `w-[200px] justify-between focus:ring-primary-500 focus:ring-offset-2 focus:ring-2`,
                                                        !field.value &&
                                                            'text-muted-foreground',
                                                    )}
                                                >
                                                    {field.value
                                                        ? autoCompleteOptions.find(
                                                              (language) =>
                                                                  language.value ===
                                                                  field.value,
                                                          )?.label
                                                        : `Select`}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className={cn(`w-[200px] p-0`)}
                                        >
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>
                                                    No item found.
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {autoCompleteOptions.map(
                                                        (item) => (
                                                            <CommandItem
                                                                value={
                                                                    item.label
                                                                }
                                                                key={item.value}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        'autoComplete',
                                                                        item.value,
                                                                    )
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
                                                        ),
                                                    )}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </FormProvider>

                    <FormField
                        control={form.control}
                        name="radioGroup"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        {raioOptions.map((option, index) => (
                                            <FormItem
                                                key={JSON.stringify(
                                                    option.value + '' + index,
                                                )}
                                                className="flex items-center space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={option.value}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {option.label}
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <br />

            {/* <div className="w-[300px] space-y-2">
        <MultiSelect options={FRAMEWORKS} />
      </div> */}
            <br />

            <br />

            <EmployeeCardTable />

            <br />

            <section>
                <div className="bg-slate-600 p-3 rounded-8 grid grid-cols-3 place-items-start space-y-2 text-neutral-200">
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <PencilIcon width={24} height={24} />
                        <p>PencilIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <TrashIcon width={24} height={24} />
                        <p>TrashIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <PlusOutlineIcon width={24} height={24} />
                        <p>PlusOutlineIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <SettingIcon width={24} height={24} fill="white" />
                        <p>SettingIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <BellIcon stroke="white" />

                        <p>BellIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <QuestionCircle fill="white" />
                        <p>QuestionCircle</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <EmployeeIcon stroke="white" />
                        <p>EmployeeIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <UsersIcon stroke="white" />

                        <p>UsersIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <DocumentIcon stroke="white" />
                        <p>DocumentIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <TransferIcon stroke="white" />
                        <p>TransferIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <BuildingIcon fill="white" />

                        <p>BuildingIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <DocumentChartIcon fill="white" />
                        <p>DocumentChartIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <OnboardIcon
                            stroke="
            white"
                        />
                        <p>OnboardIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <OffboardIcon stroke="white" />
                        <p>OffboardIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <PerformanceIcon fill="white" />
                        <p>PerformanceIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <DoubleLeftChevornIcon stroke="white" />
                        <p>DoubleLeftChevornIcon</p>
                    </div>

                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <EmployeeTwoIcon stroke="white" />
                        <p>EmployeeTwoIcon</p>
                    </div>
                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <DocumentTwoIcon stroke="white" />
                        <p>DocumentTwoIcon</p>
                    </div>

                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <BuildingTwoIcon fill="white" />
                        <p>BuildingTwoIcon</p>
                    </div>

                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <DocumentChartTwoIcon fill="white" />
                        <p>DocumentChartTwoIcon</p>
                    </div>

                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <TrainingTwoIcon fill="white" />
                        <p>TrainingTwoIcon</p>
                    </div>

                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <Briefcase stroke="white" />

                        <p>Briefcase</p>
                    </div>

                    <div className="flex justify-center flex-col items-start w-[100px]">
                        <MenuIcon fill="white" />

                        <p>MenuIcon</p>
                    </div>
                </div>
            </section>
            <br />
        </section>
    )
}

export default isAuth(ExamplePage)
