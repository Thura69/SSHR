import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Form } from '@/components/ui/form'
import InputField from '@/components/common/form/fields/input-field'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { additionalData } from '@/components/setting/code-generator/utils'

import { useMediaQuery } from 'usehooks-ts'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { Button } from '@/components/ui/button'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import useCandidateStore from '@/state/zustand/candidate'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

const LanguageForm = ({
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
    const { t } = useTranslation('language')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const { setLanguage } = useCandidateStore((state) => state)

    const FormSchema = yup.object({
        id: yup.number(),
        language: yup.string().required().trim().max(50),
        speaking: yup.string().required().trim().max(50),
        reading: yup.string().required().trim().max(50),
        writing: yup.string().required().trim().max(50),
        listening: yup.string().required().max(50),
        remarks: yup.date(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })
    const { formState } = form

    const handleOnSave = (e: any) => {
        
        if (isControled) {
            e.id = Date.now()
            setLanguage(e)
        }

        toggle()
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div className="space-y-4 h-[450px] px-2 overflow-auto">
                    <InputField
                        disabled={detailValue && true}
                        fieldName="language"
                        placeholder={t('placeHolder.typeHere')}
                        required={detailValue ? false : true}
                        languageName={'language'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={adjustWidth}
                    />
                    <div className={formContainer}>
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="speaking"
                            placeHolder={t('placeHolder.select')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'language'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="reading"
                            placeHolder={t('placeHolder.select')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'language'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <div className={formContainer}>
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="writing"
                            placeHolder={t('placeHolder.select')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'language'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="listening"
                            placeHolder={t('placeHolder.select')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'language'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            additionalData={additionalData}
                        />
                    </div>
                    <TextAreaField
                        disabled={detailValue && true}
                        fieldName="remarks"
                        required={detailValue ? false : false}
                        languageName={'language'}
                        fieldHeight={cn(' w-full h-[128px]')}
                        fieldWidth={'w-full'}
                        placeholder={t('placeHolder.typeHere')}
                    />
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

export default LanguageForm
