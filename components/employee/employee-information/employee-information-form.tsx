import { Pen } from 'lucide-react'
import EmployeeInformationPhotCheck from './employee-information-photo'
import { useBoolean, useMediaQuery } from 'usehooks-ts'
import { useState } from 'react'
import EmployeeInformationUpoad from './employee-information-uploadimg'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'
import { MultiSelectDrop } from '@/components/common/form/multi-select-drop'
import { additionalData } from '@/components/setting/code-generator/utils'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { cn } from '@/lib/utils'
import Datepicker from '@/components/ui/datepicker'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import EmployeeInformationDrop from './employee-information-dropdown'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import InputField from '@/components/common/form/fields/input-field'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import SwitchField from '@/components/common/form/fields/switch-field'
import Radiofield from '@/components/common/form/fields/radio-field'
import DEFAULTEMPLOYEE from '@/public/Rectangle 42000.png';

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

const EmployeeInformationForm = () => {
    const { value, setFalse, setTrue } = useBoolean(false)
    const [selectedImage, setSelectedImage] = useState(DEFAULTEMPLOYEE)
    const [popoverOpen, setPopoverOpen] = useState(false)

    const { t } = useTranslation('employeeInformation')
    const isMobile = useMediaQuery('(max-width: 766px)')

    type resighationType = 'yes' | 'no'

    const FormSchema = yup.object({
        id: yup.number(),
        employeeName: yup.object({
            firstName: yup.string().required('').trim().max(50, 'moreThan50'),
            middleName: yup.string().required('').trim().max(50, 'moreThan50'),
            lastName: yup.string().required('').trim().max(50, 'moreThan50'),
        }),
        employeeStatus: yup.string().required('').trim().max(50, 'moreThan50'),
        employeeNumber: yup
            .number()
            .min(0, t('positiveError'))
            .integer(t('integerError'))
            .required('Required')
            .typeError('required'),
        staffId: yup.number(),
        company: yup.string().required('').trim().max(50, 'moreThan50'),
        location: yup.string().required('').trim().max(50, 'moreThan50'),
        branch: yup.string().required('').trim().max(50, 'moreThan50'),
        department: yup.string().required('').trim().max(50, 'moreThan50'),
        section: yup.string().required('').trim().max(50, 'moreThan50'),
        position: yup.string().required('').trim().max(50, 'moreThan50'),
        jobGrade: yup.string().trim().max(50, 'moreThan50'),
        subGrade: yup.string().trim().max(50, 'moreThan50'),
        jobType: yup.string().trim().max(50, 'moreThan50'),
        jobCategory: yup.string().trim().max(50, 'moreThan50'),
        joinDate: yup.date().required(),
        positionStartDate: yup.date().required(),
        probationEndDate: yup.date(),
        sourceOfHire: yup.string().max(50, 'moreThan50'),
        remark: yup.string().max(50, 'moreThan50'),
        blackList: yup.boolean().required(),
        active: yup.boolean().required(),
        resignation: yup.string().required(),
        lastWorkingDate: yup
            .date()
            .when('resignation', (resighation: resighationType[], schema) => {
                console.log({ resighation })
                if (resighation[0] === 'yes') return schema.required('')

                return schema
            }),
        resignReason: yup
            .string()
            .when('resignation', (resighation: resighationType[], schema) => {
                if (resighation[0] === 'yes') return schema.required('')

                return schema
            }),
        reasonForLeaving: yup
            .string()
            .when('resignation', (resighation: resighationType[], schema) => {
                if (resighation[0] === 'yes') return schema.required('')

                return schema
            }),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            id: 0,
            employeeName: {
                firstName: undefined,
                middleName: undefined,
                lastName: undefined,
            },
            employeeStatus: undefined,
            employeeNumber: undefined,
            staffId: undefined,
            blackList: false,
            active: true,
            resignation: 'yes',
        },
    })

    const { formState } = form

    const handleOnSave = (data: any) => {
        console.log(data)
    }

    function handleChange(e: any) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]

            const reader = new FileReader()
            reader.onload = (event: any) => {
                setSelectedImage(event?.target.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="mt-5">
            <EmployeeInformationPhotCheck
                img={selectedImage}
                open={value}
                setOpen={setFalse}
            />
            <EmployeeInformationUpoad
                setTrue={setTrue}
                selectedImage={selectedImage}
                handleChange={handleChange}
            />

            <Form {...form}>
                <form
                    className="space-y-4 mt-[20px]"
                    onSubmit={form.handleSubmit(handleOnSave)}
                >
                    <div>
                        <div className="flex flex-col gap-2">
                            <p
                                className={cn(
                                    'p-0 text-[14px] font-light my-2',
                                    form.formState.errors?.employeeName &&
                                        'text-danger-500',
                                )}
                            >
                                {t('employeeName')}{' '}
                                <span className="ms-1 text-danger-500">*</span>
                            </p>
                        </div>
                        <div className={formContainer}>
                            <InputField
                                fieldName="employeeName.firstName"
                                placeholder={t('placeHolder.firstName')}
                                required={false}
                                requiredLabel={false}
                                languageName={'employeeInformation'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                            <InputField
                                fieldName="employeeName.middleName"
                                placeholder={t('placeHolder.middleName')}
                                required={false}
                                requiredLabel={false}
                                languageName={'employeeInformation'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                            <InputField
                                fieldName="employeeName.lastName"
                                placeholder={t('placeHolder.lastName')}
                                required={false}
                                requiredLabel={false}
                                languageName={'employeeInformation'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                        </div>
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            fieldName="employeeStatus"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            fieldName="employeeNumber"
                            placeholder={t('placeHolder.typeHere')}
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="staffId"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            fieldName="company"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            fieldName="location"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            fieldName="branch"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            fieldName="department"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            fieldName="section"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            fieldName="position"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            fieldName="jobGrade"
                            required={false}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            fieldName="subGrade"
                            required={false}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            fieldName="jobType"
                            required={false}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            fieldName="jobCategory"
                            required={false}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DatePickerField
                            fieldName="joinDate"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-[100%]', fieldHeight)}
                            fieldWidth={adjustWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <DatePickerField
                            fieldName="positionStartDate"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-[100%]', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DatePickerField
                            fieldName="probationEndDate"
                            required={false}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-[100%]', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <div className={formContainer}>
                        <InputField
                            fieldName="sourceOfHire"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            fieldName="remark"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <SwitchField
                        fieldName="blackList"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        languageName={'employeeInformation'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                        flexDirection="flex-row  items-center justify-between spy"
                    />
                    <SwitchField
                        fieldName="active"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        languageName={'employeeInformation'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                        flexDirection="flex-row  items-center  justify-between spy"
                    />
                    <Radiofield
                        languageName="employeeInformation"
                        fieldName="resignation"
                    />

                    <div className={formContainer}>
                        <DatePickerField
                            fieldName="lastWorkingDate"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-[100%]', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DropDownDataField
                            fieldName="resignReason"
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <InputField
                            fieldName="reasonForLeaving"
                            placeholder={t('placeHolder.typeHere')}
                            required={true}
                            languageName={'employeeInformation'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <ModalConfirmBtns
                        size={isMobile ? 'md' : 'lg'}
                        width="w-[150px] mt-[20px]"
                        isLoading={false}
                        editMode={true}
                        language="financialYear"
                        toggle={() => {}}
                    />
                </form>
            </Form>
        </div>
    )
}

export default EmployeeInformationForm
