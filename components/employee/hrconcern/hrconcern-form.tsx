import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '@/components/ui/form'
import * as yup from 'yup'
import InputField from '@/components/common/form/fields/input-field'
import { cn } from '@/lib/utils'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import DatePickerField from '@/components/common/form/fields/datepicker-field'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const HrConcernForm = ({
    toggle,
    editData,
    detailValue,
    editMode = false,
}: {
    toggle: any
    editData?: any
    detailValue?: boolean
    editMode?: boolean
}) => {
    const { t } = useTranslation('hrConcern')
    const isMobile = useMediaQuery('(max-width: 766px)')

    const FormSchema = yup.object({
        id: yup.number(),
        date: yup.string().required().trim().max(50),
        note: yup.string().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    const { formState } = form

    const handleOnSave = (e: any) => {
        console.log('hello')
        console.log(e)
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div className="space-y-4 px-2 overflow-auto">
                    <DatePickerField
                        disabled={detailValue && true}
                        fieldName="date"
                        required={detailValue ? false : true}
                        languageName={'hrConcern'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                    />
                    {/* <InputField
                        disabled={detailValue && true}
                        fieldName="writtenBy"
                        placeholder={t('placeHolder.typeHere')}
                        required={detailValue ? false : true}
                        languageName={'hrConcern'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                    /> */}
                    <TextAreaField
                        disabled={detailValue && true}
                        fieldName="note"
                        required={detailValue ? false : true}
                        languageName={'hrConcern'}
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

export default HrConcernForm
