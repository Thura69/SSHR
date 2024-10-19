import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    cn,
    JOB_LOCATION_TYPES,
    URGENCY_LEVEL,
    urgency_level_enum,
} from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { PlusIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import {
    HeadCount_Request_Create_Payload,
    HeadCountDataTable,
} from '../types/head-count-request-types'
import { Textarea } from '@/components/ui/textarea'
import InputField from '@/components/common/form/fields/input-field'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { useMediaQuery } from 'usehooks-ts'
import { useRouter } from 'next/navigation'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'

const HeadCountRequestSchema = yup.object().shape({
    position_id: yup.number().required(''),
    no_of_position: yup.number().required(''),
    department_id: yup.number().required(''),
    branch_id: yup.number().required(''),
    location_id: yup.number().required(''),
    company_id: yup.number().required(''),
    job_location: yup.string().required(''),
    job_type_id: yup.number().required(''),
    additional_skill_set: yup.array().of(yup.string()).optional(),
    urgency_level: yup.string().required(''),
    target_onboarding_date: yup.string().required(''),
    reason: yup.string().required(''),
    section_id: yup.number().required(''),
})

const addExampleData: HeadCountDataTable = {
    position_id: 3,
    position_name: 'Data Scientist',
    no_of_position: 3,
    department_id: 103,
    department_name: 'Data',
    branch_id: 203,
    branch_name: 'East Branch',
    location_id: 303,
    location_name: 'Boston',
    company_id: 403,
    company_name: 'DataWorks',
    job_location: 'Boston Office',
    job_type_id: 503,
    job_type_name: 'Part-time',
    additional_skill_set: ['Python', 'Machine Learning', 'Agile'],
    urgency_level: 'low',
    target_onboarding_date: '2024-11-01',
    reason: 'Data Analysis',
    section_id: 603,
    section_name: 'Analytics',
}

const showExampleData: HeadCountDataTable = {
    position_id: 3,
    position_name: 'Data Scientist',
    no_of_position: 3,
    department_id: 103,
    department_name: 'Data',
    branch_id: 203,
    branch_name: 'East Branch',
    location_id: 303,
    location_name: 'Boston',
    company_id: 403,
    company_name: 'DataWorks',
    job_location: 'Boston Office',
    job_type_id: 503,
    job_type_name: 'Part-time',
    additional_skill_set: ['Python', 'Machine Learning', 'Agile'],
    urgency_level: 'low',
    target_onboarding_date: '2024-11-01',
    reason: 'Data Analysis',
    section_id: 603,
    section_name: 'Analytics',
}

interface AddHeadCountRequestFormProps {
    setData: React.Dispatch<React.SetStateAction<HeadCountDataTable[]>>
    isDetail: boolean
    isEdit: boolean
    isDelete: boolean
}
const AddHeadCountRequestForm = ({
    setData,
    editData,
    editMode = false,
    isAddForm = false,
    detailValue = false,
}: {
    setData: React.Dispatch<React.SetStateAction<HeadCountDataTable[]>>
    editData?: any
    editMode?: boolean
    isAddForm?: boolean
    detailValue?: boolean
}) => {
    const router = useRouter()

    const handleDetailButton = () => {
        router.push('/recruitment/head-count-requisition/head-count-request')
    }
    const { t } = useTranslation('headCountRequest')
    const form = useForm({
        resolver: yupResolver(HeadCountRequestSchema),
        defaultValues: editData,
    })
    const fieldHeight = 'h-[40px] md:h-[44px] '
    const isMobile = useMediaQuery('(max-width: 766px)')
    const onSubmitHandler: SubmitHandler<HeadCount_Request_Create_Payload> = (
        data,
    ) => {
        setData((prevData) => [...prevData, addExampleData])
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <div className="md:flex gap-6">
                        <div className="flex-1 pb-6">
                            <DropDownField
                                disabled={detailValue && true}
                                fieldName="position_id"
                                required={detailValue ? false : true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-[100%] ', fieldHeight)}
                                fieldWidth={''}
                                apiFields={{
                                    value: 'position_id',
                                    label: 'position_name',
                                }}
                            />
                        </div>
                        <div className="flex-1 pb-6">
                            <InputField
                                disabled={detailValue && true}
                                fieldName="no_of_position"
                                placeholder={t('placeHolder.typeHere')}
                                required={detailValue ? false : true}
                                requiredLabel={true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={''}
                            />
                        </div>
                    </div>
                    <div className="md:flex gap-6">
                        <div className="flex-1 pb-6">
                            <DropDownField
                                disabled={detailValue && true}
                                fieldName="company_id"
                                required={detailValue ? false : true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-[100%] ', fieldHeight)}
                                fieldWidth={''}
                                apiFields={{
                                    value: 'company_id',
                                    label: 'company_name',
                                }}
                            />
                        </div>
                        <div className="flex-1 py-1"></div>
                    </div>
                    <div className="md:flex gap-6">
                        <div className="flex-1 pb-6">
                            <DropDownField
                                disabled={detailValue && true}
                                fieldName="location_id"
                                required={detailValue ? false : true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-[100%] ', fieldHeight)}
                                fieldWidth={''}
                                apiFields={{
                                    value: 'location_id',
                                    label: 'location_name',
                                }}
                            />
                        </div>
                        <div className="flex-1 pb-6">
                            <DropDownField
                                disabled={detailValue && true}
                                fieldName="branch_id"
                                required={detailValue ? false : true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-[100%] ', fieldHeight)}
                                fieldWidth={''}
                                apiFields={{
                                    value: 'branch_id',
                                    label: 'branch_name',
                                }}
                            />
                        </div>
                    </div>
                    <div className="md:flex gap-6">
                        <div className="flex-1 pb-6">
                            <DropDownField
                                disabled={detailValue && true}
                                fieldName="department_id"
                                required={detailValue ? false : true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-[100%] ', fieldHeight)}
                                fieldWidth={''}
                                apiFields={{
                                    value: 'department_id',
                                    label: 'department_name',
                                }}
                            />
                        </div>
                        <div className="flex-1 pb-6">
                            <DropDownField
                                disabled={detailValue && true}
                                required={detailValue ? false : true}
                                fieldName="section_id"
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-[100%] ', fieldHeight)}
                                fieldWidth={''}
                                apiFields={{
                                    value: 'section_id',
                                    label: 'section_name',
                                }}
                            />
                        </div>
                    </div>
                    <div className="md:flex gap-6">
                        <div className="flex-1 pb-6">
                            <DropDownDataField
                                fieldName="job_location"
                                disabled={detailValue && true}
                                required={detailValue ? false : true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={''}
                                additionalData={JOB_LOCATION_TYPES}
                            />
                        </div>
                        <div className="flex-1 pb-6">
                            <DropDownField
                                disabled={detailValue && true}
                                required={detailValue ? false : true}
                                fieldName="job_type_id"
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-[100%] ', fieldHeight)}
                                fieldWidth={''}
                                apiFields={{
                                    value: 'job_type_id',
                                    label: 'job_type_name',
                                }}
                            />
                        </div>
                    </div>
                    <div className="md:flex gap-6">
                        <div className="flex-1 pb-6">
                            <DropDownField
                                disabled={detailValue && true}
                                fieldName="skill_set_id"
                                required={false}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-[100%] ', fieldHeight)}
                                fieldWidth={''}
                                apiFields={{
                                    value: 'skill_set_id',
                                    label: 'skill_set_name',
                                }}
                            />
                        </div>
                        <div className="flex-1 pb-6">
                            <DropDownDataField
                                fieldName="urgency_level"
                                disabled={detailValue && true}
                                required={detailValue ? false : true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={''}
                                additionalData={URGENCY_LEVEL}
                            />
                        </div>
                    </div>
                    <div className="md:flex gap-6">
                        <div className="flex-1 pb-6">
                            <DatePickerField
                                fieldName="target_onboarding_date"
                                disabled={detailValue && true}
                                required={detailValue ? false : true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-[100%]', fieldHeight)}
                                fieldWidth={''}
                            />
                        </div>
                        <div className="flex-1 py-1"></div>
                    </div>
                    <div className="md:flex gap-6">
                        <div className="flex-1 pb-6">
                            <TextAreaField
                                fieldName="reason"
                                disabled={detailValue && true}
                                required={detailValue ? false : true}
                                languageName={'headCountRequest'}
                                fieldHeight={cn(' w-full h-[128px]')}
                                fieldWidth={'w-full'}
                                placeholder={t('placeHolder.typeHere')}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pb-6">
                        {isAddForm ? (
                            <Button
                                variant="primary"
                                type="submit"
                                className={cn(
                                    'font-normal rounded-[12px]  hover:text-white gap-2 text-sm border-primary-500 bg-white border duration-500 text-primary-500 hover:bg-primary-500',
                                )}
                                // onClick={modalTrue}
                            >
                                <PlusIcon className="size-4" />
                                <span className="hidden text-[16px] sm:inline-block">
                                    {t('add_to_request_table')}
                                </span>
                            </Button>
                        ) : detailValue ? (
                            <div className="w-full  flex  justify-end">
                                <Button
                                    type="button"
                                    onClick={handleDetailButton}
                                    size={isMobile ? 'md' : 'md'}
                                    variant="outline"
                                    disabled={false}
                                    className={cn(
                                        ` w-[100px] ${false && 'opacity-50'}`,
                                        'w-[100px] rounded-md',
                                    )}
                                >
                                    {t('close')}
                                </Button>
                            </div>
                        ) : (
                            <ModalConfirmBtns
                                size={isMobile ? 'md' : 'md'}
                                width="w-[100px] rounded-md"
                                isLoading={false}
                                editMode={editMode}
                                language="skillSet"
                                toggle={() => {
                                    router.push(
                                        '/recruitment/head-count-requisition/head-count-request',
                                    )
                                }}
                            />
                        )}
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default AddHeadCountRequestForm
