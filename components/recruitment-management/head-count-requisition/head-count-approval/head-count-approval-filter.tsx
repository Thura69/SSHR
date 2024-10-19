import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useEffect, useState } from 'react'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { useMediaQuery } from 'usehooks-ts'
import DataHeadCountSelect from '../head-count-request/data-select'
import MultiHeadCountSelect from '../head-count-request/multi-select'
import MultiHeadCountEnumSelect from '../head-count-request/multi-select-enum'
import {
    HEADCOUNT_STATUS,
    JOB_LOCATION_TYPES,
    URGENCY_LEVEL,
} from '@/lib/utils'

interface HeadCountFilterDataType {
    company_id: string[]
    location_id: string[]
    branch_id: string[]
    department_id: string[]
    section_id: string[]
    position_id: string[]
    job_location: string[]
    job_type_id: string[]
    urgency_level: string[]
    target_onboarding_date: string[]
    status: string[]
    approvals: string[]
    created_by: string[]
    created_at: string[]
}

type DropType = 'drop'
type TimeType = 'time'
type EnumType = 'enum'

interface ApiFields {
    value: string
    label: string
}

interface EnumObject {
    type: EnumType
    translation: string
    endPoint: null
    apiFields: ApiFields
    title: string
    enums: ApiFields[]
    fieldName:
        | 'company_id'
        | 'location_id'
        | 'branch_id'
        | 'department_id'
        | 'section_id'
        | 'position_id'
        | 'job_location'
        | 'job_type_id'
        | 'urgency_level'
        | 'target_onboarding_date'
        | 'status'
        | 'approvals'
        | 'created_by'
        | 'created_at'
    value: any
    setValue: (value: any) => void
    nuqsField: string
}

interface DropObject {
    type: DropType
    translation: string
    endPoint: string
    apiFields: ApiFields
    title: string
    fieldName:
        | 'company_id'
        | 'location_id'
        | 'branch_id'
        | 'department_id'
        | 'section_id'
        | 'position_id'
        | 'job_location'
        | 'job_type_id'
        | 'urgency_level'
        | 'target_onboarding_date'
        | 'status'
        | 'approvals'
        | 'created_by'
        | 'created_at'
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
        | 'company_id'
        | 'location_id'
        | 'branch_id'
        | 'department_id'
        | 'section_id'
        | 'position_id'
        | 'job_location'
        | 'job_type_id'
        | 'urgency_level'
        | 'target_onboarding_date'
        | 'status'
        | 'approvals'
        | 'created_by'
        | 'created_at'
    value: any
    setValue: (value: any) => void
    nuqsField: string
}

type DataObject = DropObject | TimeObject | EnumObject

const HeadCountApprovalFilter = ({
    open,
    setOpen,
}: {
    open: string
    setOpen: (value: string) => void
}) => {
    const [startDate, setStartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)
    const [filterData, setFilterData] = useState<HeadCountFilterDataType>({
        company_id: [],
        location_id: [],
        branch_id: [],
        department_id: [],
        section_id: [],
        position_id: [],
        job_location: [],
        job_type_id: [],
        urgency_level: [],
        target_onboarding_date: [],
        status: [],
        approvals: [],
        created_by: [],
        created_at: [],
    })
    const isMobile = useMediaQuery('(max-width: 766px)')
    const dataArray: DataObject[] = [
        {
            type: 'drop',
            translation: 'headCountApproval',
            endPoint: 'main/company/distinct',
            apiFields: { value: 'Company_ID', label: 'Company_Name' },
            title: 'company_id',
            fieldName: 'company_id',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company1',
        },
        {
            type: 'drop',
            translation: 'headCountApproval',
            endPoint: 'main/locations/distinct',
            apiFields: { value: 'Location_ID', label: 'Location_Name' },
            title: 'location_id',
            fieldName: 'location_id',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'headCountApproval',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'branch_id',
            fieldName: 'branch_id',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'headCountApproval',
            endPoint: 'main/departments/distinct',
            apiFields: { value: 'Department_ID', label: 'Department_Name' },
            title: 'department_id',
            fieldName: 'department_id',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'headCountApproval',
            endPoint: 'main/section/distinct',
            apiFields: { value: 'Section_ID', label: 'Section_Name' },
            title: 'section_id',
            fieldName: 'section_id',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'headCountApproval',
            endPoint: 'main/positions/distinct',
            apiFields: { value: 'Position_ID', label: 'Position_Name' },
            title: 'position_id',
            fieldName: 'position_id',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'enum',
            translation: 'headCountApproval',
            endPoint: null,
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'job_location',
            fieldName: 'job_location',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
            enums: JOB_LOCATION_TYPES,
        },
        {
            type: 'drop',
            translation: 'headCountApproval',
            endPoint: 'main/job-types',
            apiFields: { value: 'JobType_ID', label: 'JobType_Name' },
            title: 'job_type_id',
            fieldName: 'job_type_id',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'enum',
            translation: 'headCountApproval',
            endPoint: null,
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'urgency_level',
            fieldName: 'urgency_level',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
            enums: URGENCY_LEVEL,
        },
        {
            type: 'time',
            translation: 'headCountApproval',
            endPoint: null,
            apiFields: null,
            title: 'target_onboarding_date',
            fieldName: 'target_onboarding_date',
            nuqsField: 'start-date',
            value: startDate,
            setValue: setStartDate,
        },
        {
            type: 'enum',
            translation: 'headCountApproval',
            endPoint: null,
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'status',
            fieldName: 'status',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'status',
            enums: HEADCOUNT_STATUS,
        },
        {
            type: 'drop',
            translation: 'headCountApproval',
            endPoint: 'main/job-types',
            apiFields: { value: 'JobType_ID', label: 'JobType_Name' },
            title: 'approvals',
            fieldName: 'approvals',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'headCountApproval',
            endPoint: 'main/job-types',
            apiFields: { value: 'JobType_ID', label: 'JobType_Name' },
            title: 'created_by',
            fieldName: 'created_by',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'time',
            translation: 'headCountApproval',
            endPoint: null,
            apiFields: null,
            title: 'created_at',
            fieldName: 'created_at',
            nuqsField: 'start-date',
            value: startDate,
            setValue: setStartDate,
        },
    ]
    useEffect(() => {
        console.log(filterData)
    }, [filterData])

    const handleDelete = () => {
        setFilterData({
            company_id: [],
            location_id: [],
            branch_id: [],
            department_id: [],
            section_id: [],
            position_id: [],
            job_location: [],
            job_type_id: [],
            urgency_level: [],
            target_onboarding_date: [],
            status: [],
            approvals: [],
            created_by: [],
            created_at: [],
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
                                        <DataHeadCountSelect
                                            key={data.nuqsField} // Use a unique key based on your data
                                            translation={data.translation}
                                            nuqsField={data.nuqsField}
                                            title={data.title}
                                            fieldName={data.fieldName}
                                            value={data.value}
                                            setValue={data.setValue}
                                        />
                                    ) : data.type === 'drop' ? (
                                        <MultiHeadCountSelect
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
                                    ) : (
                                        <MultiHeadCountEnumSelect
                                            key={data.nuqsField} // Use a unique key based on your data
                                            translation={data.translation}
                                            endPoint={data.endPoint!}
                                            apiFields={data.apiFields!}
                                            title={data.title}
                                            fieldName={data.fieldName}
                                            value={data.value}
                                            setValue={data.setValue}
                                            nuqsField={data.nuqsField}
                                            enums={data.enums}
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

export default HeadCountApprovalFilter
