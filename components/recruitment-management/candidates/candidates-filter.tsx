import MultiEmployeeSelect from '@/components/common/form/fields/multi-employee-select'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import StartrRatingSelect from '@/components/common/form/fields/start-field'

export interface filterDataType {
    codeNo: string[]
    candidateName: string[]
    vacancyCode: string[]
    positionApplied: string[]
    screeningStage: string[]
    internalExternal: string[]
    hiringSources: string[]
    rating: string
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
        | 'screeningStage'
        | 'internalExternal'
        | 'hiringSources'
        | 'status'
    value: any
    setValue: (value: any) => void
    nuqsField: string
}

interface StarObject {
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

type DataObject = DropObject | StarObject

const CandidatesFilter = ({
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
        rating: '',
        status: [],
    })
    const isMobile = useMediaQuery('(max-width: 766px)')

    const dataArray: DataObject[] = [
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'codeNo',
            fieldName: 'codeNo',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'codeNo',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'candidateName',
            fieldName: 'candidateName',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'candidateName',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'vacancyCode',
            fieldName: 'vacancyCode',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'vacancyCode',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'positionApplied',
            fieldName: 'positionApplied',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'positionApplied',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'internalExternal',
            fieldName: 'internalExternal',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'internalExternal',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'hiringSources',
            fieldName: 'hiringSources',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'hiringSources',
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
            nuqsField: 'rating',
        },
        {
            type: 'drop',
            translation: 'candidates',
            endPoint: 'main/branches/distinct',
            apiFields: { value: 'Branch_ID', label: 'Branch_Name' },
            title: 'status',
            fieldName: 'status',
            value: filterData,
            setValue: setFilterData,
            nuqsField: 'status',
        },
    ]

    const handleDelete = () => {
        setFilterData({
            codeNo: [],
            candidateName: [],
            vacancyCode: [],
            positionApplied: [],
            screeningStage: [],
            internalExternal: [],
            hiringSources: [],
            rating: '',
            status: [],
        })
    }

    return (
        <div>
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
                                    data.type === 'star' ? (
                                        // <DateEmployeeSelect
                                        //     key={data.nuqsField} // Use a unique key based on your data
                                        //     translation={data.translation}
                                        //     nuqsField={data.nuqsField}
                                        //     title={data.title}
                                        //     fieldName={data.fieldName}
                                        //     value={data.value}
                                        //     setValue={data.setValue}
                                        // />
                                        <StartrRatingSelect
                                            fieldName={data.fieldName}
                                            translation={data.translation}
                                            title={data.title}
                                            nuqsField={data.nuqsField}
                                            value={data.value}
                                            setValue={data.setValue}
                                        />
                                    ) : (
                                        <MultiEmployeeSelect
                                            key={data.nuqsField}
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

export default CandidatesFilter
