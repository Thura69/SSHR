import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import EmployeeCellAction from '../forms/employee-cellaction'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import EmployeeModal from '../forms/employee-modal'
import LanguageForm from './language-form'
import RowDragHandleCell from '@/components/common/form/fields/draggable-column'
import { usePathname } from 'next/navigation'

export type LanguageType = {
    language: string
    speaking: string
    reading: string
    writing: string
    listening: string
}

export const UseLanguageColumns = (): ColumnDef<LanguageType>[] => {
    const pathname = usePathname()
    const isDetailCandidates = pathname.includes('detail-candidates')
    const { t } = useTranslation('education')

    const columns: ColumnDef<LanguageType>[] = [
        {
            accessorKey: 'language',
            header: ({ column }) => {
                const { t } = useTranslation('language')
                return (
                    <section className=" text-start">
                        <p className="text-[14px] w-[120px]  font-bold text-[#687588]">
                            {t('language')}
                        </p>
                    </section>
                )
            },
            ...(isDetailCandidates
                ? {}
                : {
                      cell: ({ row }) => (
                          <RowDragHandleCell
                              value={row.original.language}
                              rowId={row.id}
                          />
                      ),
                  }),
        },
        {
            accessorKey: 'speaking',
            header: ({ column }) => {
                const { t } = useTranslation('language')
                return (
                    <section>
                        <p className="text-[14px] w-[120px] font-bold text-[#687588]">
                            {t('speaking')}
                        </p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'reading',
            header: ({ column }) => {
                const { t } = useTranslation('language')
                return (
                    <section>
                        <p className="text-[14px] w-[120px] font-bold text-[#687588]">
                            {t('reading')}
                        </p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'writing',
            header: ({ column }) => {
                const { t } = useTranslation('language')
                return (
                    <section>
                        <p className="text-[14px] w-[120px] font-bold text-[#687588]">
                            {t('writing')}
                        </p>
                    </section>
                )
            },
        },
        {
            accessorKey: 'listening',
            header: ({ column }) => {
                const { t } = useTranslation('language')
                return (
                    <section>
                        <p className="text-[14px] w-[120px] font-bold text-[#687588]">
                            {t('listening')}
                        </p>
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
                    <div className="h-full w-[100px] px-2 flex items-center justify-center ">
                        <p className="font-bold text-zinc-500 text-center">
                            {t('action')}
                        </p>
                    </div>
                )
            },
            cell: ({ row }) => {
                const { t } = useTranslation('language')
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
                            title={`${t(DetailValue ? 'languageDetails' : 'editLanguage')}`}
                            modelRatio="w-[100svw] lg:w-[650px]"
                            editMode={false}
                            open={value}
                            toggle={toggle}
                            form={
                                <LanguageForm
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
