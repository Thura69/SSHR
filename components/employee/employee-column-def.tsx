import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import SelectCell from '../data-table/select-cell'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import EmployeeCellAction from './forms/employee-cellaction'
import { DeleteConfirm } from '../common/modal/delete-confirm'
import EmployeeModal from './forms/employee-modal'
import CareerForm from './career/career-form'
import { useRef, useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import EmployeeCard from './employee-card'
import { useRouter, usePathname } from 'next/navigation'
import { useMediaQuery } from 'usehooks-ts'
import Portal from '../common/portal'
import { StaticImageData } from 'next/image'
import Image from 'next/image'

export type Employee = {
    photo: StaticImageData
    employeeNo: string
    name: string
    position: string
    joinDate: string
    status: string
    phone: string
    martialStatus: string
    gender: string
}

const headerTypo = 'text-[14px] w-[120px]  font-bold text-[#687588]'

export const columns: ColumnDef<Employee>[] = [
    {
        accessorKey: 'photo',
        header: ({ column }) => {
            const { t } = useTranslation('employee')
            const { value, toggle, setTrue } = useBoolean(false)

            return (
                <section className="text-start ">
                    <p className={cn(headerTypo, 'w-[90px]')}>{t('photo')}</p>
                </section>
            )
        },
        cell: ({ row }) => {
            const isMobile = useMediaQuery('(max-width: 1100px)')
            const absoluteRef = useRef<HTMLDivElement>(null)

            const handleMouseEnter = () => {
                const absoluteElement = absoluteRef.current
                const parentRect =
                    absoluteElement?.parentElement?.getBoundingClientRect()
                const viewportWidth = window.innerWidth
                const viewportHeight = window.innerHeight

                if (absoluteElement && parentRect) {
                    absoluteElement.style.position = 'fixed'
                    absoluteElement.style.display = 'flex'

                    // Ensure the element is within the viewport
                    let top = parentRect.top
                    let left = parentRect.left + 60

                    if (top + absoluteElement.clientHeight > viewportHeight) {
                        top = viewportHeight - absoluteElement.clientHeight
                    }
                    if (left + absoluteElement.clientWidth > viewportWidth) {
                        left = viewportWidth - absoluteElement.clientWidth
                    }
                    if (top < 0) top = 0
                    if (left < 0) left = 0

                    absoluteElement.style.top = `${top}px`
                    absoluteElement.style.left = `${left}px`
                }
              
            }

            const handleMouseLeave = () => {
                const absoluteElement = absoluteRef.current
                if (absoluteElement) {
                    absoluteElement.style.position = 'absolute'
                    absoluteElement.style.display = 'none'

                    absoluteElement.style.top = '20px'
                    absoluteElement.style.left = '20px'
                }
               
            }

            return (
                <div>
                    <div className="" onMouseLeave={handleMouseLeave}>
                        <Image
                            onMouseEnter={handleMouseEnter}
                            src={row.original.photo}
                            alt="logo"
                            className="w-[43px] h-[43px] rounded-full hover:scale-105 duration-300 "
                        />

                        {!isMobile && (
                            <div ref={absoluteRef} className="hidden  z-50 ">
                                <EmployeeCard />
                            </div>
                        )}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: 'employeeNo',
        header: ({ column }) => {
            const { t } = useTranslation('employee')
            return (
                <section className="text-start">
                    <p className={cn(headerTypo)}>{t('employeeNo')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            const { t } = useTranslation('employee')
            return (
                <section className="text-start">
                    <p className={cn(headerTypo)}>{t('name')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'joinDate',
        header: ({ column }) => {
            const { t } = useTranslation('employee')
            return (
                <section className="text-start">
                    <p className={cn(headerTypo)}>{t('joinDate')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'jobType',
        header: ({ column }) => {
            const { t } = useTranslation('employee')
            return (
                <section className="text-start">
                    <p className={cn(headerTypo)}>{t('jobType')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            const { t } = useTranslation('employee')
            return (
                <section className="text-start">
                    <p className={cn(headerTypo)}>{t('status')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'martialStatus',
        header: ({ column }) => {
            const { t } = useTranslation('employee')
            return (
                <section className="text-start">
                    <p className={cn(headerTypo)}>{t('martialStatus')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => {
            const { t } = useTranslation('employee')
            return (
                <section className="text-start">
                    <p className={cn(headerTypo)}>{t('phone')}</p>
                </section>
            )
        },
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => {
            const { t } = useTranslation('employee')
            return (
                <section className="text-start">
                    <p className={cn(headerTypo)}>{t('gender')}</p>
                </section>
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
            const { t } = useTranslation('employee')
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
            const router = useRouter()

            const handleEdit = (row: any) => {
                const rowData = row.original
                router.push(`/employee/${rowData.id}/employee-details`)
                // setItem(rowData)
                // toggle()
                // DetailFalse()
            }

            const handleDetail = (row: any) => {
                const rowData = row.original

                router.push(`/employee/${rowData.id}/employee-details`)

                // setItem(rowData)
                // toggle()
                // DetailTrue()
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
    },
]
