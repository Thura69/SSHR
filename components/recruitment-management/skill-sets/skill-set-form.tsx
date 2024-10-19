import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Form } from '@/components/ui/form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import InputField from '@/components/common/form/fields/input-field'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import SwitchField from '@/components/common/form/fields/switch-field'
import RadiofieldCustom from '@/components/common/form/fields/radio-field-custom'
import { useEffect } from 'react'

const adjustWidth = 'w-full md:w-[calc(50%-9px)]'
const formContainer =
    'flex flex-col md:flex-row gap-3  justify-between items-center'
const fieldHeight = 'h-[40px] md:h-[45px] '
const filedWidth = 'md:w-[50%] w-full'

const SkillSetForm = ({
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
    const { t } = useTranslation('skillSet')
    const isMobile = useMediaQuery('(max-width: 766px)')

    const FormSchema = yup.object({
        id: yup.number(),
        skill: yup.string().required().max(50),
        description: yup.string(),
        skills: yup.boolean(),
        active: yup.boolean(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    useEffect(()=>{
        form.setValue('skills','hard')
    },[])
             



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
                <InputField
                    disabled={detailValue && true}
                    fieldName="skill"
                    placeholder={t('placeholder.typeHere')}
                    required={detailValue ? false : true}
                    languageName={'skillSet'}
                    fieldHeight={cn(' w-full', fieldHeight)}
                    fieldWidth={adjustWidth}
                />
                <TextAreaField
                    disabled={detailValue && true}
                    fieldName="description"
                    required={detailValue ? false : false}
                    languageName={'skillSet'}
                    fieldHeight={cn(' w-full h-[128px]')}
                    fieldWidth={'w-full'}
                    placeholder={t('placeholder.typeHere')}
                />
                <RadiofieldCustom
                    disabled={detailValue && true}
                    languageName="skillSet"
                    fieldName="skills"
                    isLabel={false}
                    values={[
                        { name: 'Hard Skill', value: 'hard' },
                        { name: 'Soft Skill', value: 'soft' },
                    ]}
                />
                <SwitchField
                    disabled={detailValue && true}
                    fieldName="active"
                    placeholder={t('placeHolder.typeHere')}
                    required={false}
                    languageName={'employeeInformation'}
                    fieldHeight={cn(' w-full', fieldHeight)}
                    fieldWidth={filedWidth}
                    flexDirection="flex-col  items-start  justify-between spy"
                />
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

export default SkillSetForm
