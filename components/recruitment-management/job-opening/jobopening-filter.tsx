import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { useMediaQuery } from 'usehooks-ts'
import DateEmployeeSelect from '@/components/common/form/fields/date-employee-select'
import MultiEmployeeSelect from '@/components/common/form/fields/multi-employee-select'

type JobOpeningType = {
    open: string
    setOpen: (value: string) => void
}

export interface filterDataType {
    company: string[]
    location: string[]
    branch: string[]
    department: string[]
    section: string[]
    codeNo: string[]
    jobTitle: string[]
    vacancyFor: string[]
    jobLocation: string[]
    jobType: string[]
    hiringSource: string[]
    hiringManager: string[]
    startDate: string
    endDate: string
    targetHiringFromDate: string
    targetHiringToDate: string
    status: string[]
}

const JobOpeningFilter: React.FC<JobOpeningType> = ({ open, setOpen }) => {
    const [filterData, setFilterData] = useState<filterDataType>({
        company: [],
        location: [],
        branch: [],
        department: [],
        section: [],
        codeNo: [],
        jobTitle: [],
        vacancyFor: [],
        jobLocation: [],
        jobType: [],
        hiringSource: [],
        hiringManager: [],
        startDate: Date(),
        endDate: Date(),
        targetHiringFromDate: Date(),
        targetHiringToDate: Date(),
        status: [],
    })

    const [startDate, setStartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)
    const [hiringFrom, setHiringFrom] = useState<any>(null)
    const [hiringTo, setHiringTo] = useState<any>(null)

    const isMobile = useMediaQuery('(max-width: 766px)')

    const dataArray: any[] = [
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'company',
            fieldName: 'company',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'location',
            fieldName: 'location',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'location',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'branch',
            fieldName: 'branch',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'branch',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'department',
            fieldName: 'department',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'department',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'section',
            fieldName: 'section',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'section',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'codeNo',
            fieldName: 'codeNo',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'codeNo',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'jobTitle',
            fieldName: 'jobTitle',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'jobTitle',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'vacancyFor',
            fieldName: 'vacancyFor',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'vacancyFor',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'jobLocation',
            fieldName: 'jobLocation',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'jobLocation',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'jobType',
            fieldName: 'jobType',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'jobType',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'hiringSource',
            fieldName: 'hiringSource',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'hiringSource',
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'hiringManager',
            fieldName: 'hiringManager',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'hiringManager',
        },
        {
            type: 'time',
            translation: 'jobOpening',
            endPoint: null,
            apiFields: null,
            title: 'startDate',
            fieldName: 'startDate',
            nuqsField: 'start-date',
            value: startDate,
            setValue: setStartDate,
        },
        {
            type: 'time',
            translation: 'jobOpening',
            endPoint: null,
            apiFields: null,
            title: 'endDate',
            fieldName: 'endDate',
            nuqsField: 'end-date',
            value: endDate,
            setValue: setEndDate,
        },
        {
            type: 'time',
            translation: 'jobOpening',
            endPoint: null,
            apiFields: null,
            title: 'endDate',
            fieldName: 'endDate',
            nuqsField: 'end-date',
            value: endDate,
            setValue: setEndDate,
        },
        {
            type: 'time',
            translation: 'jobOpening',
            endPoint: null,
            apiFields: null,
            title: 'targetHiringFrom',
            fieldName: 'targetHiringFrom',
            nuqsField: 'hiring-from',
            value: endDate,
            setValue: setEndDate,
        },
        {
            type: 'time',
            translation: 'jobOpening',
            endPoint: null,
            apiFields: null,
            title: 'targetHiringTo',
            fieldName: 'targetHiringTo',
            nuqsField: 'hiring-to',
            value: endDate,
            setValue: setEndDate,
        },
        {
            type: 'drop',
            translation: 'jobOpening',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_name', label: 'branch_id' },
            title: 'status',
            fieldName: 'status',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'status',
        },
    ]

    const handleDelete = () => {
        setFilterData({
            company: [],
            location: [],
            branch: [],
            department: [],
            section: [],
            codeNo: [],
            jobTitle: [],
            vacancyFor: [],
            jobLocation: [],
            jobType: [],
            hiringSource: [],
            hiringManager: [],
            startDate: Date(),
            endDate: Date(),
            targetHiringFromDate: Date(),
            targetHiringToDate: Date(),
            status: [],
        })
    }

    return (
        <div className=" my-5">
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

export default JobOpeningFilter
