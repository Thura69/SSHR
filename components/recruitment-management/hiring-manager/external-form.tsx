import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import { Form } from '@/components/ui/form'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import InputField from '@/components/common/form/fields/input-field'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import SwitchField from '@/components/common/form/fields/switch-field'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const ExternalForm = ({
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
    const isMobileHeight = useMediaQuery('(max-height:750px)')

    const { t } = useTranslation('hiringManager')
    const isMobile = useMediaQuery('(max-width: 766px)')

    const handleOnSave = (e: any) => []

    const FormSchema = yup.object({
        id: yup.number(),
        fullName: yup.string().required(),
        phone: yup.string(),
        email: yup.string(),
        position: yup.string(),
        hiringSource: yup.string(),
        assignTo: yup.string().required(),
        active: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                  <div
                    className={cn(
                        'space-y-4 h-[300px] px-2 overflow-auto',
                        isMobileHeight && 'h-[400px]',
                    )}
                >
                <div className={formContainer}>
                    <InputField
                        disabled={detailValue && true}
                        fieldName="fullName"
                        placeholder={t('placeHolder.typeHere')}
                        required={detailValue ? false : true}
                        requiredLabel={true}
                        languageName={'hiringManager'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                    />
                    <InputField
                        disabled={detailValue && true}
                        fieldName="phone"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        requiredLabel={true}
                        languageName={'hiringManager'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                    />
                </div>
                <div className={formContainer}>
                    <InputField
                        disabled={detailValue && true}
                        fieldName="email"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        requiredLabel={true}
                        languageName={'hiringManager'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                    />
                    <InputField
                        disabled={detailValue && true}
                        fieldName="position"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        requiredLabel={true}
                        languageName={'hiringManager'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                    />
                </div>
                <div className={formContainer}>
                    <DropDownField
                        disabled={detailValue && true}
                        fieldName="hiringSource"
                        required={false}
                        languageName={'hiringManager'}
                        fieldHeight={cn(' w-[100%] ', fieldHeight)}
                        fieldWidth={filedWidth}
                        apiFields={{
                            value: 'Branch_ID',
                            label: 'Branch_Name',
                        }}
                    />
                    <DropDownField
                        disabled={detailValue && true}
                        fieldName="assignTo"
                        required={true}
                        languageName={'hiringManager'}
                        fieldHeight={cn(' w-[100%] ', fieldHeight)}
                        fieldWidth={filedWidth}
                        apiFields={{
                            value: 'Branch_ID',
                            label: 'Branch_Name',
                        }}
                    />
                </div>
                <SwitchField
                    disabled={detailValue && true}
                    fieldName="active"
                    placeholder={t('placeHolder.typeHere')}
                    required={false}
                    languageName={'employeeInformation'}
                    fieldHeight={cn(' w-full', fieldHeight)}
                    fieldWidth={filedWidth}
                    flexDirection="flex-row  items-start  justify-start spy"
                />
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

export default ExternalForm
