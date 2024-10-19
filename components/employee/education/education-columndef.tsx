import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import EmployeeCellAction from '../forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeModal from '../forms/employee-modal'
import CareerForm from '../career/career-form'
import { useState } from 'react'
import EducationForm from './education-form'
import { ICONS } from './education-icons'
import { COLORS } from '@/constants'
import RowDragHandleCell from '@/components/common/form/fields/draggable-column'
import { usePathname } from 'next/navigation'

export type EducationType = {
    instituteName: string
    degree: string
    speciaisation: string
    gpa: string
}

export const UseEducationColumns = (): ColumnDef<EducationType>[] => {
    const pathname = usePathname()
    const isDetailCandidates = pathname.includes('detail-candidates')
    const { t } = useTranslation('education')

    const columns: ColumnDef<EducationType>[] = [
        {
            accessorKey: 'instituteName',
            header: ({ column }) => (
                <section className="text-start ">
                    <p className="text-[14px]  w-[120px]  font-bold text-[#687588]">
                        {t('instituteName')}
                    </p>
                </section>
            ),
            ...(isDetailCandidates
                ? {}
                : {
                      cell: ({ row }) => (
                          <RowDragHandleCell
                              value={row.original.instituteName}
                              rowId={row.id}
                          />
                      ),
                  }),
        },
        {
            accessorKey: 'degree',
            header: ({ column }) => {
                const { t } = useTranslation('education')
                return (
                    <section>
                        <p className="text-[14px] w-[120px] font-bold text-[#687588]">
                            {t('degree')}
                        </p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'speciaisation',
            header: ({ column }) => {
                const { t } = useTranslation('education')
                return (
                    <section>
                        <p className="text-[14px] w-[120px] font-bold text-[#687588]">
                            {t('speciaisation')}
                        </p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'gpa',
            header: ({ column }) => {
                const { t } = useTranslation('education')
                return (
                    <section>
                        <p className="text-[14px] w-[120px] font-bold text-[#687588]">
                            {t('gpa')}
                        </p>
                    </section>
                )
            },
        },
    ]

    if (!isDetailCandidates) {
        columns.push(
            {
                accessorKey: 'speciaisation',
                header: ({ column }) => {
                    const { t } = useTranslation('education')
                    return (
                        <section>
                            <p className="text-[14px] w-[120px] font-bold text-[#687588]">
                                {t('downLoadFile')}
                            </p>
                        </section>
                    )
                },
                cell: ({ row }) => {
                    return (
                        <div className="pl-10">
                            {' '}
                            {ICONS.donwload({
                                className: 'text-primary-500',
                                fill: COLORS.primary[500],
                            })}
                        </div>
                    )
                },
            },
            {
                accessorKey: 'action',
                header: ({ column }) => {
                    const { t } = useTranslation('device')
                    return (
                        <div className="h-full w-[100px] px-2 flex items-center justify-center ">
                            <p className="font-bold text-zinc-500 text-center">
                                {t('action')}
                            </p>
                        </div>
                    )
                },
                cell: ({ row }) => {
                    const { t } = useTranslation('education')
                    const [item, setItem] = useState([])
                    const { value, toggle, setTrue } = useBoolean(false)
                    const {
                        value: DetailValue,
                        setFalse: DetailFalse,
                        setTrue: DetailTrue,
                    } = useBoolean(false)
                    const {
                        value: dValue,
                        toggle: dToggle,
                        setTrue: dSetTrue,
                    } = useBoolean(false)

                    const handleEdit = (row: any) => {
                        const rowData = row.original
                        setItem(rowData)
                        toggle()
                        DetailFalse()
                    }
                    const handleDetail = (row: any) => {
                        const rowData = row.original
                        setItem(rowData)
                        toggle()
                        DetailTrue()
                    }
                    const handleDelete = () => {}
                    const selectedGrandSubMenu = {
                        IsEdit: true,
                        IsDelete: true,
                    }
                    return (
                        <div className={'flex items-center justify-center '}>
                            <EmployeeCellAction
                                handleDetail={handleDetail}
                                language="financialYear"
                                selectedGrandSubMenu={selectedGrandSubMenu}
                                setSingleCodeGenerator={setItem}
                                handleDelete={() => dToggle()}
                                handleEdit={handleEdit}
                                row={row}
                            />
                            <DeleteConfirm
                                message={t('deleteText')}
                                title={t('deleteTitle')}
                                isLoading={false}
                                toggle={dToggle}
                                open={dValue}
                                fun={handleDelete}
                            />
                            <EmployeeModal
                                title={`${t(DetailValue ? 'educationDetail' : 'editEducation')}`}
                                modelRatio="w-[100svw] lg:w-[650px]"
                                editMode={false}
                                open={value}
                                toggle={toggle}
                                form={
                                    <EducationForm
                                        editMode={value}
                                        detailValue={DetailValue}
                                        editData={item}
                                        toggle={toggle}
                                    />
                                }
                            />
                        </div>
                    )
                },
            },
        )
    }

    return columns
}
