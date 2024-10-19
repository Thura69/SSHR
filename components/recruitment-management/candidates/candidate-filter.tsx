import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import DateEmployeeSelect from '@/components/common/form/fields/date-employee-select'
import MultiEmployeeSelect from '@/components/common/form/fields/multi-employee-select'
import StarFieldSelect from '@/components/common/form/fields/star-field'

export interface filterDataType {
    codeNo: string[]
    candidateName: string[]
    vacancyCode: string[]
    positionApplied: string[]
    internalExternal: string[]
    screeningStage: string[]
    hiringSources: string[]
    rating: string[]
    status: string[]
}

type DropType = 'drop'
type StarType = 'star'

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
        | 'codeNo'
        | 'candidateName'
        | 'vacancyCode'
        | 'positionApplied'
        | 'internalExternal'
        | 'screeningStage'
        | 'hiringSources'
        | 'rating'
        | 'status'
    value: any
    setValue: (value: any) => void
    nuqsField: string
}

interface TimeObject {
    type: StarType
    translation: string
    endPoint: null
    apiFields: null
    title: string
    fieldName: 'rating'
    value: any
    setValue: (value: any) => void
    nuqsField: string
}

type DataObject = DropObject | TimeObject

const CandidateFilter = ({
    open,
    setOpen,
}: {
    open: string
    setOpen: (value: string) => void
}) => {
    const [filterData, setFilterData] = useState<filterDataType>({
        codeNo: [],
        candidateName: [],
        vacancyCode: [],
        positionApplied: [],
        internalExternal: [],
        screeningStage: [],
        hiringSources: [],
        rating: [],
        status: [],
    })

    const isMobile = useMediaQuery('(max-width: 766px)')

    const dataArray: DataObject[] = [
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'codeNo',
            fieldName: 'codeNo',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company1',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'candidateName',
            fieldName: 'candidateName',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'vacancyCode',
            fieldName: 'vacancyCode',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'positionApplied',
            fieldName: 'positionApplied',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'internalExternal',
            fieldName: 'internalExternal',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'screeningStage',
            fieldName: 'screeningStage',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'hiringSources',
            fieldName: 'hiringSources',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'star',
            translation: 'candidates',
            endPoint: null,
            apiFields: null,
            title: 'rating',
            fieldName: 'rating',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'common/branches/distinct',
            apiFields: { value: 'branch_id', label: 'branch_name' },
            title: 'status',
            fieldName: 'status',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'company2',
        },
    ]

    const handleDelete = () => {
        setFilterData({
            codeNo: [],
            candidateName: [],
            vacancyCode: [],
            positionApplied: [],
            internalExternal: [],
            screeningStage: [],
            hiringSources: [],
            rating: [],
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
                        <div className="border-b pb-6  space-y-10">
                            <div className="flex flex-wrap gap-5 ">
                                {dataArray.map((data, index) =>
                                    data.type === 'star' ? (
                                        <StarFieldSelect
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

export default CandidateFilter
