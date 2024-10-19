import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn } from '@/lib/utils'
import InputField from '@/components/common/form/fields/input-field'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import SwitchField from '@/components/common/form/fields/switch-field'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import Radiofield from '@/components/common/form/fields/radio-field'
import { useEffect } from 'react'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const HiringSourceForm = ({
    toggle,
    detailValue,
    editData,
    editMode = false,
}: {
    toggle: any
    detailValue?: boolean
    editData?: any
    editMode?: boolean
}) => {
    const { t } = useTranslation('hiringSource')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const isMobileHeight = useMediaQuery('(max-height:750px)')

    const FormSchema = yup.object({
        id: yup.number(),
        name: yup.string().required(),
        source: yup.string().required(),
        url: yup.string(),
        otherServicesform: yup.string(),
        active: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    useEffect(() => {
        form.setValue('otherServicesform', 'no')
    }, [])

    const handleOnSave = (e: any) => {
        console.log(e)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSave)}>
                <div className={cn('space-y-4  px-2 pb-3 overflow-auto')}>
                    <div className={formContainer}>
                        <InputField
                            disabled={detailValue && true}
                            fieldName="name"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'hiringSource'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                        />
                        <DropDownField
                            disabled={detailValue && true}
                            fieldName="source"
                            required={true}
                            languageName={'hiringSource'}
                            fieldHeight={cn(' w-[100%] ', fieldHeight)}
                            fieldWidth={filedWidth}
                            apiFields={{
                                value: 'Branch_ID',
                                label: 'Branch_Name',
                            }}
                        />
                    </div>
                    <InputField
                        disabled={detailValue && true}
                        fieldName="url"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        requiredLabel={true}
                        languageName={'hiringSource'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={'w-full'}
                    />
                    <div className={formContainer}>
                        <SwitchField
                            disabled={detailValue && true}
                            fieldName="otherServicesform"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'hiringSource'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            flexDirection="flex-row  items-start  justify-start spy"
                        />
                        <SwitchField
                            disabled={detailValue && true}
                            fieldName="active"
                            placeholder={t('placeHolder.typeHere')}
                            required={false}
                            languageName={'hiringSource'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={filedWidth}
                            flexDirection="flex-row  items-start  justify-start spy"
                        />
                    </div>
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
                        language="skillSet"
                        toggle={toggle}
                    />
                )}
            </form>
        </Form>
    )
}

export default HiringSourceForm
