import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import * as yup from 'yup'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import { cn } from '@/lib/utils'
import { additionalData } from '@/components/setting/code-generator/utils'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import FieldRequiredErrors from '@/components/common/form/fields-required.errors'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import RadioRankfield from '@/components/common/form/fields/radiorank-filed'
import { useEffect } from 'react'
import useCandidateStore from '@/state/zustand/candidate'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6  justify-between items-center'
const adjustWidth = 'w-full md:w-[calc(50%-13px)]'

const SkillForm = ({
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
    const { t } = useTranslation('skill')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const { setSkillProfess } = useCandidateStore((state) => state)

    const FormSchema = yup.object({
        id: yup.number(),
        skill: yup.string().required().max(50),
        rank: yup.string().max(50),
        remark: yup.string(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })

    useEffect(()=>{
        form.setValue('rank','1')
    },[])

    const { formState } = form

    const handleOnSave = (e: any) => {
        if (isControled) {
            e.id = Date.now()
            setSkillProfess(e)
        }

        toggle()
    }

    return (
        <Form {...form}>
            <form
                className="sm:space-y-[16px]"
                onSubmit={form.handleSubmit(handleOnSave)}
            >
                <div className="space-y-4  px-2 overflow-auto">
                    <div className="space-y-4 px-2 overflow-auto">
                        <DropDownDataField
                            disabled={detailValue && true}
                            fieldName="skill"
                            placeHolder={t('placeHolder.select')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'skill'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={adjustWidth}
                            additionalData={additionalData}
                        />
                        <RadioRankfield
                            disabled={detailValue && true}
                            languageName="skill"
                            fieldName="rank"
                        />
                        <TextAreaField
                            disabled={detailValue && true}
                            fieldName="remark"
                            required={false}
                            languageName={'skill'}
                            fieldHeight={cn(' w-full h-[128px]')}
                            fieldWidth={'w-full'}
                            placeholder={t('placeHolder.typeHere')}
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

export default SkillForm
