import RowDragHandleCell from '@/components/common/form/fields/draggable-column'
import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import EmployeeCellAction from '../forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeModal from '../forms/employee-modal'
import CareerForm from '../career/career-form'
import RefereesForm from './referees-form'

type Referees = {
    name: string
    position: string
    companyName: string
    phoneNo: string
    email: string
}

const headerTypo = 'text-[14px] w-[120px]  font-bold text-[#687588]'

export const UseRefereesColumns = (): ColumnDef<Referees>[] => {
    const pathname = usePathname()
    const isDetailCandidates = pathname.includes('detail-candidates')

    const columns: ColumnDef<Referees>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => {
                const { t } = useTranslation('referees')

                return (
                    <section className="text-start">
                        <p className={cn(headerTypo)}>{t('name')}</p>
                    </section>
                )
            },
            ...(isDetailCandidates
                ? {}
                : {
                      cell: ({ row }) => (
                          <RowDragHandleCell
                              value={row.original.name}
                              rowId={row.id}
                          />
                      ),
                  }),
        },
        {
            accessorKey: 'position',
            header: ({ column }) => {
                const { t } = useTranslation('referees')
                return (
                    <section className=" text-start">
                        <p className={cn(headerTypo)}>{t('position')}</p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'companyName',
            header: ({ column }) => {
                const { t } = useTranslation('referees')
                return (
                    <section className=" text-start">
                        <p className={cn(headerTypo)}>{t('companyName')}</p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'phoneNo',
            header: ({ column }) => {
                const { t } = useTranslation('referees')
                return (
                    <section className=" text-start">
                        <p className={cn(headerTypo)}>{t('phoneNo')}</p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'email',
            header: ({ column }) => {
                const { t } = useTranslation('referees')
                return (
                    <section className=" text-start">
                        <p className={cn(headerTypo)}>{t('email')}</p>
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
                const { t } = useTranslation('referees')
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
                            title={`${t(DetailValue ? 'refereesDetails' : 'editRefereesDetails')}`}
                            modelRatio="w-[100svw] lg:w-[650px]"
                            editMode={false}
                            open={value}
                            toggle={toggle}
                            form={
                                <RefereesForm
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
