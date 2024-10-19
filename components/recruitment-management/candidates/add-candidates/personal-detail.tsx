import InputField from '@/components/common/form/fields/input-field'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { additionalData } from '@/components/setting/code-generator/utils'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import Radiofield from '@/components/common/form/fields/radio-field'
import EducationFileTable from '@/components/employee/education/educationfiletable'
import EducationFileUpload from '@/components/employee/education/education-file-upload'
import { useState } from 'react'
import ModalNextBtns from '@/components/common/modal/modal-next-btns'
import { trim } from 'lodash'
import useCandidateStore from '@/state/zustand/candidate'
import RadiofieldCustom from '@/components/common/form/fields/radio-field-custom'
import { useRouter } from 'next/navigation'

type IdentityCardType = 'yes' | 'no'

const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

const PersonalDetailPage = ({
    setSelectedTab,
    detail = false,
}: {
    setSelectedTab: () => void
    detail?: boolean
}) => {
    const { t } = useTranslation('candidates')
    const [fileList, setFileList] = useState<any>([])
    const { setStepOne, stepOne } = useCandidateStore((state) => state)
    const router = useRouter()

    const FormSchema = yup.object({
        id: yup.number(),
        codeNo: yup.string().required('').max(50, 'moreThan50'),
        jobTitle: yup.number().required('').max(50, 'moreThan50'),
        internalApplicant: yup.number().required('').max(50, 'moreThan50'),
        candidateNo: yup.string().required('').max(50, 'moreThan50'),
        candidateName: yup.object({
            firstName: yup.string().required('').trim().max(50, 'moreThan50'),
            middleName: yup.string().required('').trim().max(50, 'moreThan50'),
            lastName: yup.string().required('').trim().max(50, 'moreThan50'),
        }),
        phoneNo: yup.string().required('').trim().max(50, 'moreThan50'),
        email: yup.string().required('').trim().max(50, 'moreThan50'),
        gender: yup.number().required('').max(50, 'moreThan50'),
        martialStatus: yup.number().required('').max(50, 'moreThan50'),
        dateOfBirth: yup.string().required('').trim().max(50, 'moreThan50'),
        nationality: yup.number().max(50, 'moreThan50'),
        race: yup.number().required('').max(50, 'moreThan50'),
        religion: yup.number().required('').max(50, 'moreThan50'),
        identityCard: yup.string(),
        passportIdNumber: yup.number(),
        // .when(
        //     'identityCard',
        //     (identityCard: IdentityCardType[], schema) => {
        //         if (identityCard[0] === 'no') return schema.required('')
        //         return schema
        //     },
        // ),
        issueDate: yup.string(),
        passportExpirtyDate: yup.string(),
        portfolioURL: yup.string(),
        linkedinURL: yup.string(),
        expectedSalary: yup.object({
            from: yup.string().required('').trim().max(50, 'moreThan50'),
            to: yup.string().required('').trim().max(50, 'moreThan50'),
        }),
        nrc: yup.object({
            townNumber: yup.string().required('').trim().max(50, 'moreThan50'),
            town: yup.string().required('').trim().max(50, 'moreThan50'),
            type: yup.string().required('').trim().max(50, 'moreThan50'),
            nationalId: yup.string().required('').trim().max(50, 'moreThan50'),
        }),
        careerObjective: yup.string(),
        address: yup.string().required(''),
        country: yup.string().required(''),
        city: yup.string().required(''),
        townShip: yup.string().required(''),
        zipOrPostal: yup.string().required(''),
        currentAddressRadio: yup.string(),
        permanentAddress: yup.string().required(''),
        permanentCountry: yup.string().required(''),
        permanentCity: yup.string().required(''),
        permanentTownShip: yup.string().required(''),
        permanentZipOrPostal: yup.string().required(''),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: stepOne || {},
    })

    const handleOnSave = (data: any) => {
        setStepOne(data)
        setSelectedTab()
    }

    return (
        <section className="w-full">
            <h3 className="text-[24px] font-bold text-[#1CBCC8]">
                Personal Details
            </h3>
            <Form {...form}>
                <form
                    className="space-y-4 mt-[20px]  sm:space-y-10"
                    onSubmit={form.handleSubmit(handleOnSave)}
                >
                    <section className="space-y-3">
                        <div className={formContainer}>
                            <InputField
                                fieldName="codeNo"
                                disabled={detail && true}
                                required={true}
                                placeholder={t('placeHolder.typeHere')}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                            <DropDownField
                                fieldName="jobTitle"
                                disabled={detail && true}
                                required={true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                apiFields={{
                                    value: 'branch_id',
                                    label: 'branch_name',
                                }}
                            />
                        </div>
                        <div className={formContainer}>
                            <DropDownField
                                fieldName="internalApplicant"
                                disabled={detail && true}
                                required={true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                apiFields={{
                                    value: 'branch_id',
                                    label: 'branch_name',
                                }}
                            />
                            <InputField
                                disabled={detail && true}
                                fieldName="candidateNo"
                                required={true}
                                placeholder={t('placeHolder.typeHere')}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                        </div>
                        <div>
                            <div className="flex flex-col gap-2">
                                <p
                                    className={cn(
                                        'p-0 text-[14px] font-light my-2',
                                        form.formState.errors?.candidateName &&
                                            'text-danger-500',
                                    )}
                                >
                                    {t('candidateName')}{' '}
                                    <span className="ms-1 text-danger-500">
                                        *
                                    </span>
                                </p>
                            </div>
                            <div className={formContainer}>
                                <InputField
                                    fieldName="candidateName.firstName"
                                    disabled={detail && true}
                                    placeholder={t('placeHolder.firstName')}
                                    required={false}
                                    requiredLabel={false}
                                    languageName={'employeeInformation'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <InputField
                                    fieldName="candidateName.middleName"
                                    placeholder={t('placeHolder.middleName')}
                                    disabled={detail && true}
                                    required={false}
                                    requiredLabel={false}
                                    languageName={'employeeInformation'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <InputField
                                    fieldName="candidateName.lastName"
                                    placeholder={t('placeHolder.lastName')}
                                    disabled={detail && true}
                                    required={false}
                                    requiredLabel={false}
                                    languageName={'employeeInformation'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                        </div>
                        <div className={formContainer}>
                            <InputField
                                fieldName="phoneNo"
                                required={true}
                                disabled={detail && true}
                                placeholder={t('placeHolder.typeHere')}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                            <InputField
                                fieldName="email"
                                required={true}
                                disabled={detail && true}
                                placeholder={t('placeHolder.typeHere')}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                        </div>
                        <div className={formContainer}>
                            <DropDownField
                                fieldName="gender"
                                required={true}
                                disabled={detail && true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                apiFields={{
                                    value: 'branch_id',
                                    label: 'branch_name',
                                }}
                            />
                            <DropDownField
                                fieldName="martialStatus"
                                required={true}
                                disabled={detail && true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                apiFields={{
                                    value: 'branch_id',
                                    label: 'branch_name',
                                }}
                            />
                        </div>
                        <div className={formContainer}>
                            <DatePickerField
                                fieldName="dateOfBirth"
                                required={true}
                                disabled={detail && true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-[100%]', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                            <DropDownField
                                fieldName="nationality"
                                required={true}
                                disabled={detail && true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                apiFields={{
                                    value: 'branch_id',
                                    label: 'branch_name',
                                }}
                            />
                        </div>
                        <div className={formContainer}>
                            <DropDownField
                                fieldName="race"
                                required={true}
                                disabled={detail && true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                apiFields={{
                                    value: 'branch_id',
                                    label: 'branch_name',
                                }}
                            />
                            <DropDownField
                                fieldName="religion"
                                required={true}
                                disabled={detail && true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                apiFields={{
                                    value: 'branch_id',
                                    label: 'branch_name',
                                }}
                            />
                        </div>
                        <RadiofieldCustom
                            disabled={detail && true}
                            languageName="candidates"
                            fieldName="identityCard"
                            isLabel={true}
                            values={[
                                { name: 'NRC', value: 'yes' },
                                { name: 'Passport', value: 'no' },
                            ]}
                        />

                        {form.watch('identityCard') === 'yes' ? (
                            <div>
                                <div className="flex flex-col gap-2">
                                    <p
                                        className={cn(
                                            'p-0 text-[14px]  font-md my-1',
                                        )}
                                    >
                                        {t('nrc')}{' '}
                                    </p>
                                </div>
                                <div className={formContainer}>
                                    <DropDownDataField
                                        fieldName="nrc.townNumber"
                                        placeHolder={t('stateNumber')}
                                        disabled={detail && true}
                                        required={false}
                                        requiredLabel={false}
                                        languageName={'familyContact'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                        additionalData={additionalData}
                                    />
                                    <DropDownDataField
                                        fieldName="nrc.town"
                                        placeHolder={t('district')}
                                        disabled={detail && true}
                                        required={false}
                                        requiredLabel={false}
                                        languageName={'familyContact'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                        additionalData={additionalData}
                                    />
                                    <DropDownDataField
                                        fieldName="nrc.type"
                                        placeHolder={t('citizenshipTier')}
                                        disabled={detail && true}
                                        required={false}
                                        requiredLabel={false}
                                        languageName={'familyContact'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                        additionalData={additionalData}
                                    />
                                    <InputField
                                        fieldName="nrc.nationalId"
                                        disabled={detail && true}
                                        placeholder={t('registerNumber')}
                                        required={false}
                                        requiredLabel={false}
                                        languageName={'familyContact'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className={formContainer}>
                                    <InputField
                                        fieldName="passportIdNumber"
                                        disabled={detail && true}
                                        placeholder={t('placeHolder.typeHere')}
                                        required={true}
                                        languageName={'candidates'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                    />
                                    <DatePickerField
                                        fieldName="issueDate"
                                        disabled={detail && true}
                                        required={false}
                                        languageName={'candidates'}
                                        fieldHeight={cn(
                                            ' w-[100%]',
                                            fieldHeight,
                                        )}
                                        fieldWidth={filedWidth}
                                    />
                                    <DatePickerField
                                        fieldName="passportExpirtyDate"
                                        disabled={detail && true}
                                        required={false}
                                        languageName={'candidates'}
                                        fieldHeight={cn(
                                            ' w-[100%]',
                                            fieldHeight,
                                        )}
                                        fieldWidth={filedWidth}
                                    />
                                </div>
                                <div className={formContainer}>
                                    <DatePickerField
                                        fieldName="stayPermit"
                                        disabled={detail && true}
                                        required={false}
                                        languageName={'candidates'}
                                        fieldHeight={cn(
                                            ' w-[100%]',
                                            fieldHeight,
                                        )}
                                        fieldWidth={filedWidth}
                                    />
                                    <DatePickerField
                                        fieldName="visaVailidity"
                                        disabled={detail && true}
                                        required={false}
                                        languageName={'candidates'}
                                        fieldHeight={cn(
                                            ' w-[100%]',
                                            fieldHeight,
                                        )}
                                        fieldWidth={filedWidth}
                                    />
                                </div>
                            </div>
                        )}

                        <div className={formContainer}>
                            <InputField
                                fieldName="portfolioURL"
                                disabled={detail && true}
                                required={false}
                                placeholder={t('placeHolder.typeHere')}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                            <InputField
                                fieldName="linkedinURL"
                                disabled={detail && true}
                                required={false}
                                placeholder={t('placeHolder.typeHere')}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                        </div>
                        <div className={formContainer}>
                            <div className=" w-full md:w-[50%]">
                                <div className="flex flex-col gap-2">
                                    <p
                                        className={cn(
                                            'p-0 text-[14px]  font-md my-1',
                                        )}
                                    >
                                        {t('expectedSalary')}{' '}
                                    </p>
                                </div>
                                <div className={formContainer}>
                                    <InputField
                                        fieldName="expectedSalary.from"
                                        disabled={detail && true}
                                        placeholder={t('from')}
                                        required={false}
                                        requiredLabel={false}
                                        languageName={'candidates'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                    />
                                    <InputField
                                        fieldName="expectedSalary.to"
                                        disabled={detail && true}
                                        placeholder={t('to')}
                                        required={false}
                                        requiredLabel={false}
                                        languageName={'candidates'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                    />
                                </div>
                            </div>
                            <InputField
                                fieldName="careerObjective"
                                disabled={detail && true}
                                required={false}
                                placeholder={t('placeHolder.typeHere')}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                        </div>
                        {detail ? (
                            <EducationFileTable file={[]} />
                        ) : (
                            <EducationFileUpload
                                fileList={fileList}
                                setFileList={setFileList}
                            />
                        )}
                    </section>
                    <section className=" space-y-3">
                        <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
                            {t('currentAddress')}
                        </h2>

                        <TextAreaField
                            fieldName="address"
                            disabled={detail && true}
                            required={true}
                            languageName={'candidates'}
                            fieldHeight={cn(' w-full h-[128px]')}
                            fieldWidth={'w-full'}
                            placeholder={t('placeHolder.typeHere')}
                        />

                        <div className={formContainer}>
                            <DropDownDataField
                                fieldName="country"
                                disabled={detail && true}
                                required={true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                additionalData={additionalData}
                            />
                            <DropDownDataField
                                fieldName="city"
                                disabled={detail && true}
                                required={true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                additionalData={additionalData}
                            />
                        </div>
                        <div className={formContainer}>
                            <DropDownDataField
                                fieldName="townShip"
                                disabled={detail && true}
                                required={true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                                additionalData={additionalData}
                            />
                            <InputField
                                fieldName="zipOrPostal"
                                disabled={detail && true}
                                placeholder={t('placeHolder.typeHere')}
                                required={true}
                                languageName={'candidates'}
                                fieldHeight={cn(' w-full', fieldHeight)}
                                fieldWidth={filedWidth}
                            />
                        </div>
                    </section>
                    <section className=" space-y-3">
                        <h2 className="font-bold  text-primary-500 text:xl sm:text-2xl">
                            {t('permentAddress')}
                        </h2>
                        <Radiofield
                            disabled={detail && true}
                            languageName="candidates"
                            fieldName="currentAddressRadio"
                        />
                        {form.watch('currentAddressRadio') === 'yes' && (
                            <>
                                <TextAreaField
                                    fieldName="permanentAddress"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'candidates'}
                                    fieldHeight={cn(' w-full h-[128px]')}
                                    fieldWidth={'w-full'}
                                    placeholder={t('placeHolder.typeHere')}
                                />

                                <div className={formContainer}>
                                    <DropDownDataField
                                        fieldName="permanentCountry"
                                        disabled={detail && true}
                                        required={true}
                                        languageName={'candidates'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                        additionalData={additionalData}
                                    />
                                    <DropDownDataField
                                        fieldName="permanentCity"
                                        disabled={detail && true}
                                        required={true}
                                        languageName={'candidates'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                        additionalData={additionalData}
                                    />
                                </div>
                                <div className={formContainer}>
                                    <DropDownDataField
                                        fieldName="permanentTownShip"
                                        disabled={detail && true}
                                        required={true}
                                        languageName={'candidates'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                        additionalData={additionalData}
                                    />
                                    <InputField
                                        fieldName="permanentZipOrPostal"
                                        disabled={detail && true}
                                        placeholder={t('placeHolder.typeHere')}
                                        required={true}
                                        languageName={'candidates'}
                                        fieldHeight={cn(' w-full', fieldHeight)}
                                        fieldWidth={filedWidth}
                                    />
                                </div>
                            </>
                        )}
                    </section>
                    <ModalNextBtns
                        language="candidates"
                        handleClick={handleOnSave}
                        toggle={() => {
                            router.push('/recruitment/candidates')
                        }}
                        width="w-[120px] mt-[20px]"
                    />
                </form>
            </Form>
        </section>
    )
}

export default PersonalDetailPage
