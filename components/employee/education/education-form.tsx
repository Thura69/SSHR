import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import InputField from '@/components/common/form/fields/input-field'
import * as yup from 'yup'
import { cn } from '@/lib/utils'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { Button } from '@/components/ui/button'
import { additionalData } from '@/components/setting/code-generator/utils'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import EducationFileUpload from './education-file-upload'
import { useState } from 'react'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import EducationFileTable from './educationfiletable'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import useCandidateStore from '@/state/zustand/candidate'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

const EducationForm = ({
    toggle,
    editData,
    detailValue,
    isControled = false,
    editMode = false,
}: {
    toggle: any
    editData?: any
    detailValue?: boolean
    isControled?: boolean
    editMode?: boolean
}) => {
    const { t } = useTranslation('career')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const [fileList, setFileList] = useState<any>([])
    const { setEducation } = useCandidateStore((state) => state)

    const FormSchema = yup.object({
        id: yup.number(),
        instituteName: yup.string().required().trim().max(50),
        degree: yup.string().required().trim().max(50),
        speciaisation: yup.string().required().trim().max(50),
        gpa: yup.string().trim().max(50),
        instituteStartDate: yup.date().required(),
        instituteEndDate: yup.date().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    const { formState } = form

    const handleOnSave = (e: any) => {
        if (isControled) {
            e.id = Date.now()
            setEducation(e)
        }

        toggle()
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div className="space-y-4 h-[400px] px-2 overflow-auto">
                    <InputField
                        disabled={detailValue && true}
                        fieldName="instituteName"
                        placeholder={t('placeHolder.typeHere')}
                        required={detailValue ? false : true}
                        languageName={'education'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={adjustWidth}
                    />
                    <div className={formContainer}>
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="degree"
                            placeHolder={t('placeHolder.select')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'education'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                        <InputField
                            disabled={detailValue && true}
                            fieldName="speciaisation"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'education'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <InputField
                        disabled={detailValue && true}
                        fieldName="gpa"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        languageName={'education'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={adjustWidth}
                    />
                    <div className={formContainer}>
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="instituteStartDate"
                            required={detailValue ? false : true}
                            languageName={'education'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="instituteEndDate"
                            required={detailValue ? false : true}
                            languageName={'education'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    {detailValue ? (
                        <EducationFileTable file={[]} />
                    ) : (
                        <EducationFileUpload
                            fileList={fileList}
                            setFileList={setFileList}
                        />
                    )}
                    {Object.keys(formState.errors).length !== 0 && (
                        <FieldRequiredErrors title={t('requiredFields')} />
                    )}
                </div>
                {detailValue ? (
                    <div className="w-full  flex  justify-end">
                        <Button
                            type="button"
                            onClick={toggle}
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
                        language="financialYear"
                        toggle={toggle}
                    />
                )}
            </form>
        </Form>
    )
}

export default EducationForm
