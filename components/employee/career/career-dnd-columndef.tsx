import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import EmployeeCellAction from '../forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeModal from '../forms/employee-modal'
import CareerForm from './career-form'
import RowDragHandleCell from '@/components/common/form/fields/draggable-column'
import { ColumnDef } from '@tanstack/react-table'
import { usePathname } from 'next/navigation'

type Career = {
    companyName: string
    position: string
    from: string
    to: string
}

const headerTypo = 'text-[14px] w-[120px]  font-bold text-[#687588]'

// Cell Component

export const UseCareerColumns = (): ColumnDef<Career>[] => {
    const pathname = usePathname()
    const isDetailCandidates = pathname.includes('detail-candidates')

    const columns: ColumnDef<Career>[] = [
        {
            accessorKey: 'companyName',
            header: ({ column }) => {
                const { t } = useTranslation('career')
                return (
                    <section className="text-start">
                        <p className={cn(headerTypo)}>{t('companyName')}</p>
                    </section>
                )
            },
            ...(isDetailCandidates
                ? {}
                : {
                      cell: ({ row }) => (
                          <RowDragHandleCell
                              value={row.original.companyName}
                              rowId={row.id}
                          />
                      ),
                  }),
        },
        {
            accessorKey: 'position',
            header: ({ column }) => {
                const { t } = useTranslation('career')
                return (
                    <section className=" text-start">
                        <p className={cn(headerTypo)}>{t('position')}</p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'from',
            header: ({ column }) => {
                const { t } = useTranslation('career')
                return (
                    <section className=" text-start">
                        <p className={cn(headerTypo)}>{t('from')}</p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'to',
            header: ({ column }) => {
                const { t } = useTranslation('career')
                return (
                    <section className=" text-start">
                        <p className={cn(headerTypo)}>{t('to')}</p>
                    </section>
                )
            },
        },
    ]

    if (!isDetailCandidates) {
        columns.push({
            accessorKey: 'action',
            header: ({ column }) => {
                const { t } = useTranslation('device')
                return (
                    <div className="h-full w-[80px] px-2 flex items-center justify-center  ">
                        <p className="font-bold text-zinc-500 text-center">
                            {t('action')}
                        </p>
                    </div>
                )
            },
            cell: ({ row }) => {
                const { t } = useTranslation('career')
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
                const selectedGrandSubMenu = { IsEdit: true, IsDelete: true }
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
                            title={`${t(DetailValue ? 'careerDetails' : 'editCareerDetails')}`}
                            modelRatio="w-[100svw] lg:w-[650px]"
                            editMode={false}
                            open={value}
                            toggle={toggle}
                            form={
                                <CareerForm
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
        })
    }

    return columns
}
