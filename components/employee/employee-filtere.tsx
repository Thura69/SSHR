import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useEffect, useState } from 'react'
import MultiEmployeeSelect from '../common/form/fields/multi-employee-select'
import DateEmployeeSelect from '../common/form/fields/date-employee-select'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { useMediaQuery } from 'usehooks-ts'

export interface filterDataType {
    company: string[]
    location: string[]
    branch: string[]
    department: string[]
    section: string[]
    position: string[]
    employeeNo: string[]
    employeeName: string[]
    joinDate: string
    endDate: string
    jobCategory: string[]
    jobType: string[]
    employmentStatus: string[]
    gender: string[]
    martialStatus: string[]
    status: string[]
}

type DropType = 'drop'
type TimeType = 'time'

interface ApiFields {
    value: string
    label: string
}

interface DropObject {
    type: DropType
    translation: string
    endPoint: string
    apiFields: ApiFields
    title: string
    fieldName:
        | 'company'
        | 'location'
        | 'branch'
        | 'department'
        | 'section'
        | 'position'
        | 'employeeNo'
        | 'employeeName'
        | 'joinDate'
        | 'endDate'
        | 'jobCategory'
        | 'jobType'
        | 'employmentStatus'
        | 'gender'
        | 'martialStatus'
        | 'status'
    value: any
    setValue: (value: any) => void
    nuqsField: string
}

interface TimeObject {
    type: TimeType
    translation: string
    endPoint: null
    apiFields: null
    title: string
    fieldName:
        | 'company'
        | 'location'
        | 'branch'
        | 'department'
        | 'section'
        | 'position'
        | 'employeeNo'
        | 'employeeName'
        | 'joinDate'
        | 'endDate'
        | 'jobCategory'
        | 'jobType'
        | 'employmentStatus'
        | 'gender'
        | 'martialStatus'
        | 'status'
    value: any
    setValue: (value: any) => void
    nuqsField: string
}

type DataObject = DropObject | TimeObject

const EmployeeFilter = ({
    open,
    setOpen,
}: {
    open: string
    setOpen: (value: string) => void
}) => {
    const [startDate, setStartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)
    const [filterData, setFilterData] = useState<filterDataType>({
        company: [],
        location: [],
        branch: [],
        department: [],
        section: [],
        position: [],
        employeeNo: [],
        employeeName: [],
        joinDate: Date(),
        endDate: Date(),
        jobCategory: [],
        jobType: [],
        employmentStatus: [],
        gender: [],
        martialStatus: [],
        status: [],
    })
    const isMobile = useMediaQuery('(max-width: 766px)')

    useEffect(() => {
        console.log(filterData)
    }, [filterData])

    const dataArray: DataObject[] = [
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'company',
            fieldName: 'company',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company1',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'location',
            fieldName: 'location',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'branch',
            fieldName: 'branch',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'department',
            fieldName: 'department',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'section',
            fieldName: 'section',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'position',
            fieldName: 'position',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'employee No.',
            fieldName: 'employeeNo',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'employee Name',
            fieldName: 'employeeName',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'time',
            translation: 'employee',
            endPoint: null,
            apiFields: null,
            title: 'join Date',
            fieldName: 'joinDate',
            nuqsField: 'start-date',
            value: startDate,
            setValue: setStartDate,
        },
        {
            type: 'time',
            translation: 'employee',
            endPoint: null,
            apiFields: null,
            title: 'end Date',
            fieldName: 'endDate',
            nuqsField: 'end-date',
            value: endDate,
            setValue: setEndDate,
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'job Category',
            fieldName: 'jobCategory',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'job Type',
            fieldName: 'jobType',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'employment Status',
            fieldName: 'employmentStatus',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'gender',
            fieldName: 'gender',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'martial Status',
            fieldName: 'martialStatus',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'employee',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'status',
            fieldName: 'status',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        // Add more objects as needed
    ]

    const handleDelete = () => {
        setFilterData({
            company: [],
            location: [],
            branch: [],
            department: [],
            section: [],
            position: [],
            employeeNo: [],
            employeeName: [],
            joinDate: Date(),
            endDate: Date(),
            jobCategory: [],
            jobType: [],
            employmentStatus: [],
            gender: [],
            martialStatus: [],
            status: [],
        })
        setStartDate(null)
        setEndDate(null)
    }

    return (
        <div className="">
            <Accordion
                value={open}
                onValueChange={setOpen}
                type="single"
                collapsible
                className="w-full duration-1000 border-none"
            >
                <AccordionItem value="open" className="border-none">
                    <AccordionTrigger className="hidden">d</AccordionTrigger>
                    <AccordionContent value="open" className=" border-none">
                        <div className="border-b pb-6">
                            <div className="flex flex-wrap gap-5 ">
                                {dataArray.map((data, index) =>
                                    data.type === 'time' ? (
                                        <DateEmployeeSelect
                                            key={data.nuqsField} // Use a unique key based on your data
                                            translation={data.translation}
                                            nuqsField={data.nuqsField}
                                            title={data.title}
                                            fieldName={data.fieldName}
                                            value={data.value}
                                            setValue={data.setValue}
                                        />
                                    ) : (
                                        <MultiEmployeeSelect
                                            key={data.nuqsField} // Use a unique key based on your data
                                            translation={data.translation}
                                            endPoint={data.endPoint!}
                                            apiFields={data.apiFields!}
                                            title={data.title}
                                            fieldName={data.fieldName}
                                            value={data.value}
                                            setValue={data.setValue}
                                            nuqsField={data.nuqsField}
                                        />
                                    ),
                                )}
                            </div>

                            <ModalConfirmBtns
                                size={isMobile ? 'md' : 'md'}
                                width="w-[100px]"
                                isLoading={false}
                                search={true}
                                editMode={false}
                                language="employee"
                                toggle={handleDelete}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default EmployeeFilter
