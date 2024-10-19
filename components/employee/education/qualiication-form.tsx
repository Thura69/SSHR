import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import InputField from '@/components/common/form/fields/input-field'
import { cn } from '@/lib/utils'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import { useState } from 'react'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import EducationFileTable from './educationfiletable'
import { Button } from '@/components/ui/button'
import EducationFileUpload from './education-file-upload'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import useCandidateStore from '@/state/zustand/candidate'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

const QualificationForm = ({
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
    const { setQualification } = useCandidateStore((state) => state)


    const FormSchema = yup.object({
        id: yup.number(),
        qualification: yup.string().required().max(50),
        level: yup.string().required().max(50),
        centerName: yup.string().required().max(50),
        location: yup.string().required().max(50),
        instituteStartDate: yup.string().required().max(50),
        instituteEndDate: yup.string().required().max(50),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    const { formState } = form

    const handleOnSave = (e: any) => {
        if (isControled) {
            e.id = Date.now()
            setQualification(e)
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
                        fieldName="qualification"
                        placeholder={t('placeHolder.typeHere')}
                        required={detailValue ? false : true}
                        requiredLabel={true}
                        languageName={'qualification'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={adjustWidth}
                    />
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="level"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'qualification'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <InputField
                            disabled={detailValue && true}
                            fieldName="centerName"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            languageName={'qualification'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <InputField
                        disabled={detailValue && true}
                        fieldName="location"
                        placeholder={t('placeHolder.typeHere')}
                        required={detailValue ? false : true}
                        requiredLabel={true}
                        languageName={'qualification'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={adjustWidth}
                    />
                    <div className={formContainer}>
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="instituteStartDate"
                            required={detailValue ? false : true}
                            languageName={'qualification'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="instituteEndDate"
                            required={detailValue ? false : true}
                            languageName={'qualification'}
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

export default QualificationForm
