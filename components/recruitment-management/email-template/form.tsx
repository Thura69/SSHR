import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '@/components/ui/form'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import { cn } from '@/lib/utils'
import InputField from '@/components/common/form/fields/input-field'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import QuillEditorField from '@/components/common/form/fields/quill-editor'
import EmailEditor from '@/components/common/form/email-quill'
import EmailEditorTest from '@/components/common/form/email-quill-test'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

const EmailTemplateForm = () => {
    const { t } = useTranslation('emailTemplate')
    const isMobile = useMediaQuery('(max-width:766px)')

    const FormSchema = yup.object({
        id: yup.number(), 
        templateType: yup.string().required().max(50),
        templateName: yup.string().required(),
        emailSubject: yup.string().required(),
        placeHolder:yup.string().required(),
        emailMessage: yup.string().required(),
        status: yup.boolean(),
    })

    const detailValue = false

    const form = useForm({
        resolver: yupResolver(FormSchema),
    })

    const handleOnSave = (e: any) => {
        console.log(e)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
                className="space-y-6"
            >
                <div className={formContainer}>
                    <DropDownField
                        // disabled={detailValue && true}
                        fieldName="templateType"
                        required={true}
                        languageName={'emailTemplate'}
                        fieldHeight={cn(' w-[100%] ', fieldHeight)}
                        fieldWidth={filedWidth}
                        apiFields={{
                            value: 'Branch_ID',
                            label: 'Branch_Name',
                        }}
                    />
                    <InputField
                        // disabled={detailValue && true}
                        fieldName="templateName"
                        placeholder={t('placeHolder.typeHere')}
                        required={true}
                        // required={detailValue ? false : true}
                        requiredLabel={true}
                        languageName={'emailTemplate'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                    />
                </div>
                <InputField
                    // disabled={detailValue && true}
                    fieldName="emailSubject"
                    placeholder={t('placeHolder.typeHere')}
                    required={true}
                    requiredLabel={true}
                    languageName={'emailTemplate'}
                    fieldHeight={cn(' w-full', fieldHeight)}
                    fieldWidth={adjustWidth}
                />
              

               <div className='h-[500px]' >
               <EmailEditorTest fieldName='emailMessage' required languageName='emailTemplate'/>
               </div>

                {detailValue ? (
                    <div className="w-full  flex  justify-end">
                        <Button
                            type="button"
                            onClick={() => {}}
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
                        editMode={false}
                        language="skillSet"
                        toggle={() => {}}
                    />
                )}
            </form>
        </Form>
    )
}

export default EmailTemplateForm
