import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form } from '@/components/ui/form'
import InputField from '@/components/common/form/fields/input-field'
import { t } from 'i18next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useMediaQuery } from 'usehooks-ts'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import { useTranslation } from 'react-i18next'
import Radiofield from '@/components/common/form/fields/radio-field'
import SwitchField from '@/components/common/form/fields/switch-field'
import ColorPickerfield from '@/components/common/form/fields/color-picker-field'
import { ColorPicker } from 'antd'

const adjustWidth = 'w-full md:w-[calc(50%-9px)]'
const formContainer =
    'flex flex-col md:flex-row gap-3  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[45px] '
const filedWidth = 'md:w-[50%] w-full'

const ScreenForm = ({
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
    const isMobile = useMediaQuery('(max-width: 766px)')
    const { t } = useTranslation('screenStaging')

    const FormSchema = yup.object({
        id: yup.number(),
        name: yup.string().required().max(50),
        color: yup.string(),
        description: yup.string(),
        isWritten: yup.string(),
        active: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    useEffect(() => {
        form.setValue('isWritten', 'no')
        form.setValue('color', '#1CBCC8')
    }, [])

    const { formState } = form

    const handleOnSave = (e: any) => {
        console.log(e)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleOnSave)}
                className="space-y-4"
            >
                <div className="space-y-4 h-[400px] px-2 overflow-auto">
                    <InputField
                        disabled={detailValue && true}
                        fieldName="name"
                        placeholder={t('placeholder.typeHere')}
                        required={detailValue ? false : true}
                        languageName={'screenStaging'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={adjustWidth}
                    />
                    <TextAreaField
                        disabled={detailValue && true}
                        fieldName="description"
                        required={detailValue ? false : false}
                        languageName={'screenStaging'}
                        fieldHeight={cn(' w-full h-[128px]')}
                        fieldWidth={'w-full'}
                        placeholder={t('placeholder.typeHere')}
                    />
                    <Radiofield
                        disabled={detailValue && true}
                        languageName="screenStaging"
                        fieldName="isWritten"
                    />
                    <ColorPickerfield
                        disabled={detailValue && true}
                        fieldName="color"
                        languageName="screenStaging"
                        fieldWidth={filedWidth}
                    />
                    <SwitchField
                        disabled={detailValue && true}
                        fieldName="active"
                        placeholder={t('placeHolder.typeHere')}
                        required={false}
                        languageName={'screenStaging'}
                        fieldHeight={cn(' w-full', fieldHeight)}
                        fieldWidth={filedWidth}
                        flexDirection="flex-row  items-start  justify-start gap-[20px] spy"
                    />
                </div>
                {Object.keys(formState.errors).length !== 0 && (
                    <FieldRequiredErrors title={t('requiredFields')} />
                )}
                {detailValue ? (
                    <div className="w-full  flex  justify-end">
                        <Button
                            type="button"
                            onClick={toggle}
                            size={isMobile ? 'md' : 'md'}
                            variant="outline"
                            disabled={false}
                            className={cn('w-[100px] rounded-md')}
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

export default ScreenForm
