import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useCandidateStore from '@/state/zustand/candidate'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '@/components/ui/form'
import InputField from '@/components/common/form/fields/input-field'
import { cn } from '@/lib/utils'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import ModalNextBtns from '@/components/common/modal/modal-next-btns'
import { SelectStatus } from '@/components/common/form/select-status'
import { useRouter } from 'next/navigation'

type JobInformationPageType = {
    detail?: boolean 
}

const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

export const JobInformationForm: React.FC<JobInformationPageType> = ({
    detail,
}) => {
    const { t } = useTranslation('jobOpening')
    const [fileList, setFileList] = useState<any>([])
    const { setStepOne, stepOne } = useCandidateStore((state) => state)
    const router = useRouter()

    const FormSchema = yup.object({
        id: yup.number(),
        codeNo: yup.string().required('').max(50, 'moreThan50'),
        jobTitle: yup.string().required('').max(50, 'moreThan50'),
        vacancyFor: yup.string().required('').max(50, 'moreThan50'),
        jobLocation: yup.string().required('').max(50, 'moreThan50'),
        jobType: yup.string().required('').max(50, 'moreThan50'),
        company: yup.string().required('').max(50, 'moreThan50'),
        location: yup.string().required('').max(50, 'moreThan50'),
        branch: yup.string().required('').max(50, 'moreThan50'),
        department: yup.string().required('').max(50, 'moreThan50'),
        section: yup.string().required('').max(50, 'moreThan50'),
        gender: yup.string().required('').max(50, 'moreThan50'),
        noOfPosition: yup.string().required('').max(50, 'moreThan50'),
        compensation: yup.object({
            from: yup.string().required('').trim().max(50, 'moreThan50'),
            to: yup.string().required('').trim().max(50, 'moreThan50'),
            select: yup.string().required('').trim().max(50, 'moreThan50'),
        }),
        openingPeriod: yup.date().required(),
        targetHiringPeriod: yup.date().required(),
        phoneScreeningStage: yup.date().required(),
        firstInterview: yup.date().required(),
        secondInterview: yup.date().required(),
        finalInterview: yup.date().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: stepOne || {},
    })

    const handleOnSave = (data: any) => {
        setStepOne(data)
    }

    return (
        <section className="">
            <Form {...form}>
                <div className="flex flex-col sm:flex-row   items-start md:items-center gap-4 justify-between">
                    <h3 className=" text:md sm:text-2xl font-bold text-[#1CBCC8]">
                        {t('jobOpeningInfo')}
                    </h3>
                    <SelectStatus placeHolder={t('selectStatus')} />
                </div>
                <form
                    className="space-y-4 mt-[20px]  sm:space-y-10"
                    onSubmit={form.handleSubmit(handleOnSave)}
                >
                    <section className="space-y-[64px]">
                        <section className="space-y-3">
                            <div className={formContainer}>
                                <InputField
                                    fieldName="codeNo"
                                    disabled={detail && true}
                                    required={true}
                                    placeholder={t('placeHolder.typeHere')}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={adjustWidth}
                                />
                            </div>
                            <div className={formContainer}>
                                <DropDownField
                                    fieldName="jobTitle"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    apiFields={{
                                        value: 'branch_id',
                                        label: 'branch_name',
                                    }}
                                />
                                <DropDownField
                                    fieldName="vacancyFor"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
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
                                    fieldName="jobLocation"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    apiFields={{
                                        value: 'branch_id',
                                        label: 'branch_name',
                                    }}
                                />
                                <DropDownField
                                    fieldName="jobType"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
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
                                    fieldName="company"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={adjustWidth}
                                    apiFields={{
                                        value: 'branch_id',
                                        label: 'branch_name',
                                    }}
                                />
                            </div>
                            <div className={formContainer}>
                                <DropDownField
                                    fieldName="location"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    apiFields={{
                                        value: 'branch_id',
                                        label: 'branch_name',
                                    }}
                                />
                                <DropDownField
                                    fieldName="branch"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
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
                                    fieldName="department"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={filedWidth}
                                    apiFields={{
                                        value: 'branch_id',
                                        label: 'branch_name',
                                    }}
                                />
                                <DropDownField
                                    fieldName="section"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
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
                                    fieldName="gender"
                                    disabled={detail && true}
                                    required={true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-full', fieldHeight)}
                                    fieldWidth={adjustWidth}
                                    apiFields={{
                                        value: 'branch_id',
                                        label: 'branch_name',
                                    }}
                                />
                            </div>
                            <div className={cn(formContainer)}>
                                <DatePickerField
                                    fieldName="openingPeriod"
                                    required={true}
                                    disabled={detail && true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <DatePickerField
                                    fieldName="targetHiringPeriod"
                                    required={true}
                                    disabled={detail && true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                        </section>
                        <section className="space-y-3">
                            <h3 className=" text:md sm:text-2xl font-bold text-[#1CBCC8]">
                                {t('screeningStage')}
                            </h3>
                            <div className={formContainer}>
                                <DatePickerField
                                    fieldName="phoneScreeningStage"
                                    required={true}
                                    disabled={detail && true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <DatePickerField
                                    fieldName="firstInterview"
                                    required={true}
                                    disabled={detail && true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                            <div className={formContainer}>
                                <DatePickerField
                                    fieldName="secondInterview"
                                    required={true}
                                    disabled={detail && true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                                <DatePickerField
                                    fieldName="finalInterview"
                                    required={true}
                                    disabled={detail && true}
                                    languageName={'jobOpening'}
                                    fieldHeight={cn(' w-[100%]', fieldHeight)}
                                    fieldWidth={filedWidth}
                                />
                            </div>
                        </section>
                    </section>
                    <ModalNextBtns
                        language="candidates"
                        handleClick={handleOnSave}
                        toggle={() => {
                            router.push('/recruitment/job-opening')
                        }}
                        width="w-[120px] mt-[20px]"
                    />
                </form>
            </Form>
        </section>
    )
}
