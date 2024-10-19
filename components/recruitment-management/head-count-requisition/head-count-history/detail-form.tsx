import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn, urgency_level_enum } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import { useEffect } from 'react'
import HeadCountUrgencyBadge from '@/components/common/head-count-urgency-badge'
import HeadCountStatusBadge, {
    head_count_request_approve_status,
} from '@/components/common/head-count-status-badge'
import ArrayBadge from '@/components/common/array-badge'
import { format } from 'date-fns'

const formContainer =
    'flex flex-col md:flex-row gap-4  justify-between items-start  md:items-center '
import {
    ApprovalList,
    TblHeadCountRequest,
} from '../head-count-request/types/head-count-request-types'

const ListItem = ({ title, value }: { title: string; value: string }) => {
    return (
        <li className="flex flex-col w-[33%] gap-1 pt-0 md:pt-2">
            <h3 className="text-[14px] text-zinc-400 font-bold text-nowrap">
                {title}
            </h3>
            <p className="text-[16px] text-sideMenuTextColor2 text-nowrap">
                {value}
            </p>
        </li>
    )
}

const ListApprovers = ({ approvers }: { approvers: ApprovalList[] }) => {
    return (
        <div className="w-[580px]">
            {approvers.map((approver) => {
                const status =
                    approver.status as head_count_request_approve_status
                const color =
                    status === head_count_request_approve_status.Accepted
                        ? 'text-success-400'
                        : status === head_count_request_approve_status.Cancelled
                          ? 'text-danger-999'
                          : undefined

                const reason =
                    status === head_count_request_approve_status.Accepted
                        ? approver.approve_reason
                        : status === head_count_request_approve_status.Cancelled
                          ? approver.deny_reason
                          : undefined
                return (
                    <div className="flex flex-row justify-start gap-2 flex-1 p-2 ">
                        <p className={`border-1 w-[20%] ${color}`}>
                            {approver.approver_name}
                        </p>
                        <p className="border-1 w-[30%] text-center text-secondaryTextColor">
                            {approver.no_of_accepeted_position}
                        </p>
                        <p className="flex-shrink-0 border-1 w-[50%] text-secondaryTextColor">
                            {reason}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

const HCHistoryDetailForm = ({
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

    const FormSchema = yup.object({
        id: yup.number(),
        status: yup.string().required(),
        urgency_level: yup.string().required(),
        tbl_position: yup.object().shape({
            position_id: yup.number().required('').integer('').positive(''),
            position_name: yup.string().required(''),
        }),
        tbl_job_type: yup.object().shape({
            job_type_id: yup.number().required('').integer('').positive(''),
            job_type_name: yup.string().required(''),
        }),
        tbl_company: yup.object().shape({
            Company_ID: yup.number().required('').integer('').positive(''),
            Company_Name: yup.string().required(''),
        }),
        tbl_location: yup.object().shape({
            Location_ID: yup.number().required('').integer('').positive(''),
            Location_Name: yup.string().required(''),
        }),
        tbl_department: yup.object().shape({
            Department_ID: yup.number().required('').integer('').positive(''),
            Department_Name: yup.string().required(''),
        }),
        tbl_section: yup.object().shape({
            Section_ID: yup.number().required('').integer('').positive(''),
            Section_Name: yup.string().required(''),
        }),
        tbl_branch: yup.object().shape({
            Branch_ID: yup.number().required('').integer('').positive(''),
            Branch_Name: yup.string().required(''),
        }),
        job_location: yup.string().required(),
        no_of_position: yup.number().required(),
        target_onboarding_date: yup.date().required(),
        created_at: yup.date().required(),
        approvers: yup.array().required(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
        defaultValues: editData,
    })
    const handleOnSave = (e: any) => {
        console.log(e)
    }

    return (
        <>
            <div
                className={cn(
                    'space-y-4 h-[550px]  px-2 pb-1 md:pb-3 overflow-scroll ',
                )}
            >
                <div className="flex flex-row justify-start items-center gap-2">
                    <div className="flex-shrink-0">
                        <HeadCountStatusBadge
                            value={
                                form.getValues(
                                    'status',
                                ) as head_count_request_approve_status
                            }
                            rounded={true}
                        />
                    </div>
                    <div className="flex-shrink-0">
                        <HeadCountUrgencyBadge
                            value={
                                form.getValues(
                                    'urgency_level',
                                ) as urgency_level_enum
                            }
                            rounded={true}
                        />
                    </div>
                </div>
                <div className={formContainer}>
                    <ListItem
                        title={t('position_id')}
                        value={
                            form.getValues(
                                'tbl_position.position_name',
                            ) as string
                        }
                    />
                    <ListItem
                        title={t('job_location')}
                        value={form.getValues('job_location') as string}
                    />
                    <ListItem
                        title={t('job_type_id')}
                        value={
                            form.getValues(
                                'tbl_job_type.job_type_name',
                            ) as string
                        }
                    />
                </div>
                <div className=" p-6 rounded-8 bg-[#F7FAFF]">
                    <ul className="flex justify-start flex-col md:flex-row gap-4 ">
                        <ListItem
                            title={t('company_id')}
                            value={
                                form.getValues(
                                    'tbl_company.Company_Name',
                                ) as string
                            }
                        />
                        <ListItem
                            title={t('location_id')}
                            value={
                                form.getValues(
                                    'tbl_location.Location_Name',
                                ) as string
                            }
                        />
                        <ListItem
                            title={t('branch_id')}
                            value={
                                form.getValues(
                                    'tbl_branch.Branch_Name',
                                ) as string
                            }
                        />
                    </ul>
                    <ul className="flex justify-start flex-col md:flex-row gap-4 ">
                        <ListItem
                            title={t('department_id')}
                            value={
                                form.getValues(
                                    'tbl_department.Department_Name',
                                ) as string
                            }
                        />
                        <ListItem
                            title={t('section_id')}
                            value={
                                form.getValues(
                                    'tbl_section.Section_Name',
                                ) as string
                            }
                        />
                    </ul>
                </div>
                <div className={formContainer}>
                    <ListItem
                        title={t('no_of_position')}
                        value={form.getValues('no_of_position') as string}
                    />
                    <ListItem
                        title={t('target_onboarding_date')}
                        value={format(
                            form.getValues('target_onboarding_date') as Date,
                            'dd\\MM\\yyyy',
                        )}
                    />
                    <ListItem title="Requester" value={'Kyaw Zaw Lwin'} />
                </div>
                <div className="flex flex-col md:flex-row justify-start items-start gap-4 ">
                    <ListItem
                        title={t('created_at')}
                        value={format(
                            form.getValues('target_onboarding_date') as Date,
                            'dd\\MM\\yyyy-hh:mm a',
                        )}
                    />
                    <div className="flex flex-col gap-1">
                        <h3 className="text-[14px] text-zinc-400 font-bold">
                            {t('skill_set_id')}
                        </h3>
                        <ArrayBadge
                            wrap={false}
                            data={
                                form.getValues(
                                    'additional_hard_skill_set',
                                ) as string[]
                            }
                        />
                    </div>
                </div>
                <div className={' overflow-auto'}>
                    <div className="flex flex-row w-[580px] justify-start bg-primary-50 gap-2  p-2 text-secondaryTextColor font-weight:700">
                        <p className="border-1 w-[20%] flex items-center  ">
                            {t('approvers')}
                        </p>
                        <p className="border-1 w-[30%] text-center">
                            {t('no_of_accepted_position')}
                        </p>
                        <p className="flex-shrink-0 border-1 w-[50%]">
                            {t('reason')}
                        </p>
                    </div>
                    <ListApprovers
                        approvers={
                            form.getValues('approvers') as ApprovalList[]
                        }
                    />
                </div>
                <div className={formContainer}>
                    <ListItem
                        title={t('reason')}
                        value={form.getValues('reason') as string}
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
        </>
    )
}

export default HCHistoryDetailForm
