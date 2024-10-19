import { Form } from '@/components/ui/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { cn } from '@/lib/utils'
import { additionalData } from '@/components/setting/code-generator/utils'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import DatePickerField from '@/components/common/form/fields/datepicker-field'
import { Button } from '@/components/ui/button'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'

const adjustWidth = 'w-full md:w-[calc(50%-9px)]'
const formContainer =
    'flex flex-col md:flex-row gap-3  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[45px] '
const filedWidth = 'md:w-[50%] w-full'

const JobHistoryForm = ({
    toggle,
    detailValue,
    editData,
    editMode = false,
}: {
    toggle: any
    editData?: any
    detailValue?: boolean
    editMode?: boolean
}) => {
    const { t } = useTranslation('jobHistoryJobs')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const isMobileHeight = useMediaQuery('(max-width: 766px)')

    const FormSchema = yup.object({
        id: yup.number(),
        position: yup.string().required(),
        salary: yup.string().required(),
        positionStartDate: yup.date().required(),
        positionEndDate: yup.date().required(),
        company: yup.string().required(),
        location: yup.string().required(),
        branch: yup.string().required(),
        department: yup.string().required(),
        section: yup.string().required(),
        jobGrade: yup.string(),
        typeOfAppointment: yup.string().required(),
        employmentStatus: yup.string().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    const { formState } = form

    const handleOnSave = (e: any) => {
        console.log(e)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
                className="sm:space-y-4"
            >
                <div className="space-y-4 h-[400px] px-2 overflow-auto">
                    <div className={formContainer}>
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="position"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="salary"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="positionStartDate"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-[100%]', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DatePickerField
                            disabled={detailValue && true}
                            fieldName="positionEndDate"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-[100%]', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                    </div>
                    <DropDownDataField
                        disabled={detailValue && true}
                        fieldName="company"
                        required={detailValue ? false : true}
                        languageName={'jobHistoryJobs'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={adjustWidth}
                        additionalData={additionalData}
                    />
                    <div className={formContainer}>
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="location"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="branch"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="department"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="section"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <DropDownDataField
                        disabled={detailValue && true}
                        fieldName="jobGrade"
                        required={false}
                        languageName={'jobHistoryJobs'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={adjustWidth}
                        additionalData={additionalData}
                    />
                    <div className={formContainer}>
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="typeOfAppointment"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="employmentStatus"
                            required={detailValue ? false : true}
                            languageName={'jobHistoryJobs'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                    </div>
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

export default JobHistoryForm
