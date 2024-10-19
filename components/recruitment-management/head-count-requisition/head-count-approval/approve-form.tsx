import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn, urgency_level_enum } from '@/lib/utils'
import InputField from '@/components/common/form/fields/input-field'
import DropDownField from '@/components/common/form/fields/dropdown-field'
import SwitchField from '@/components/common/form/fields/switch-field'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import Radiofield from '@/components/common/form/fields/radio-field'
import { useEffect } from 'react'
import HeadCountUrgencyBadge from '@/components/common/head-count-urgency-badge'
import HeadCountStatusBadge, {
    head_count_request_approve_status,
} from '@/components/common/head-count-status-badge'
import ArrayBadge from '@/components/common/array-badge'
import { format } from 'date-fns'
import TextAreaField from '@/components/common/form/fields/textarea-field'
import TextAreaFieldWithTitle from '@/components/common/form/fields/text-area-field-with-title'

const fieldHeight = 'h-[40px] md:h-[44px] '
const filedWidth = 'md:w-[50%] w-full'
const formContainer =
    'flex flex-col md:flex-row gap-6 justify-between items-start md:items-center'
const adjustWidth = 'w-full md:w-[calc(100%-13px)]'

const ListItem = ({ title, value }: { title: string; value: string }) => {
    return (
        <li className="flex flex-col w-[33%] gap-1">
            <h3 className="text-[14px] text-zinc-400 font-bold">{title}</h3>
            <p className="text-[16px] text-sideMenuTextColor2">{value}</p>
        </li>
    )
}

const HCApproveForm = ({
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
    const { t } = useTranslation('headCountApproval')
    const isMobile = useMediaQuery('(max-width: 766px)')
    const isMobileHeight = useMediaQuery('(max-height:750px)')
    const FormSchema = yup.object({
        head_count_request_id: yup.number().required(),
        no_of_accepted_position: yup.number().required(),
        reason: yup.string().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: {
            head_count_request_id: editData.head_count_request_id,
        },
    })

    useEffect(() => {}, [])

    const handleOnSave = (e: any) => {
        console.log(e)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSave)}>
                <div className={cn('space-y-4  px-2 pb-3 overflow-auto')}>
                    <div className={formContainer}>
                        <InputField
                            type="number"
                            disabled={detailValue && true}
                            fieldName="no_of_accepted_position"
                            placeholder={t('placeHolder.typeHere')}
                            required={detailValue ? false : true}
                            requiredLabel={true}
                            languageName={'headCountApproval'}
                            fieldHeight={cn(' w-full', fieldHeight)}
                            fieldWidth={'w-[100%] md:w-[50%]'}
                        />
                    </div>
                    <div className={formContainer}>
                        <TextAreaFieldWithTitle
                            title="textareaApprove"
                            fieldName="reason"
                            disabled={detailValue && true}
                            required={false}
                            languageName={'headCountApproval'}
                            fieldHeight={cn(' w-full h-[128px]')}
                            fieldWidth={'w-full'}
                            placeholder={t('placeHolder.typeHere')}
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
                        editMode={false}
                        language="skillSet"
                        toggle={toggle}
                    />
                )}
            </form>
        </Form>
    )
}

export default HCApproveForm
