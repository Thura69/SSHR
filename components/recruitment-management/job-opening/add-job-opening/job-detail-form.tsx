import useCandidateStore from '@/state/zustand/candidate'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { Form } from '@/components/ui/form'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import { cn } from '@/lib/utils'
import ModalNextBtns from '@/components/common/modal/modal-next-btns'
import InputField from '@/components/common/form/fields/input-field'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import { SelectStatus } from '@/components/common/form/select-status'
import { useRouter } from 'next/navigation'

type JobDetailFormType = {
    detail?: boolean
}

const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

export const JobDetailForm: React.FC<JobDetailFormType> = ({ detail }) => {
    const { t } = useTranslation('jobOpening')
    const { setStepOne, stepOne } = useCandidateStore((state) => state)
    const router = useRouter()

    const FormSchema = yup.object({
        id: yup.number(),
        jobDescription: yup.string().required(),
        jobSpecification: yup.string().required(),
        benefits: yup.string().required(),
        softSkills: yup.string().required(),
        hardSkills: yup.string().required(),
        minimumExperience: yup.string().required(),
        workExperience: yup.string().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: stepOne || {},
    })

    useEffect(() => {
        form.setValue(
            'jobDescription',
            'Lorem ipsum dolor sit amet consectetur. Feugiat laoreet diam tellus enim id morbi. Aliquet consequat pretium nibh nec convallis ante accumsan ullamcorper. Tempus elementum duis massa ac platea sit quis. Enim magna habitant amet aliquet adipiscing imperdiet.',
        )
        form.setValue(
            'jobSpecification',
            'Lorem ipsum dolor sit amet consectetur. Feugiat laoreet diam tellus enim id morbi. Aliquet consequat pretium nibh nec convallis ante accumsan ullamcorper. Tempus elementum duis massa ac platea sit quis. Enim magna habitant amet aliquet adipiscing imperdiet.',
        )
        form.setValue(
            'benefits',
            'Lorem ipsum dolor sit amet consectetur. Feugiat laoreet diam tellus enim id morbi. Aliquet consequat pretium nibh nec convallis ante accumsan ullamcorper. Tempus elementum duis massa ac platea sit quis. Enim magna habitant amet aliquet adipiscing imperdiet.',
        )
    }, [])

    const handleOnSave = (data: any) => {
        console.log(data)
    }

    return (
        <section className="w-full">
            <Form {...form}>
                <div className="flex flex-col sm:flex-row   items-start md:items-center gap-4 justify-between">
                    <h3 className=" text:md sm:text-2xl font-bold text-[#1CBCC8]">
                        {t('jobDetailInfo')}
                    </h3>
                    <SelectStatus placeHolder={t('selectStatus')} />
                </div>
                <form
                    className="space-y-4 mt-[20px]  sm:space-y-10"
                    onSubmit={form.handleSubmit(handleOnSave)}
                >
                    <section className="space-y-3">
                        <TextAreaField
                            fieldName="jobDescription"
                            disabled={true}
                            required={true}
                            placeholder={t('placeHolder.typeHere')}
                            languageName={'jobOpening'}
                            fieldHeight={cn(' w-full h-[128px]')}
                            fieldWidth={'w-full'}
                        />
                        <TextAreaField
                            fieldName="jobSpecification"
                            disabled={true}
                            required={true}
                            placeholder={t('placeHolder.typeHere')}
                            languageName={'jobOpening'}
                            fieldHeight={cn(' w-full h-[128px]')}
                            fieldWidth={'w-full'}
                        />
                        <TextAreaField
                            fieldName="benefits"
                            disabled={true}
                            required={true}
                            placeholder={t('placeHolder.typeHere')}
                            languageName={'jobOpening'}
                            fieldHeight={cn(' w-full h-[128px]')}
                            fieldWidth={'w-full'}
                        />
                        <div className={formContainer}>
                            <DropDownField
                                fieldName="softSkills"
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
                                fieldName="hardSkills"
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
                                fieldName="minimumExperience"
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
                                fieldName="workExperience"
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
