import { ColumnDef } from '@tanstack/react-table'
import SelectHeader from '@/components/data-table/select-header'
import SelectCell from '@/components/data-table/select-cell'
import { useTranslation } from 'react-i18next'
import { DeleteConfirm } from '@/components/common/modal/delete-confirm'
import { useBoolean } from 'usehooks-ts'
import { useState } from 'react'
import EmployeeCellAction from '../forms/employee-cellaction'
import EmployeeModal from '../forms/employee-modal'
import FamilyForm from './family-form'
import { cn } from '@/lib/utils'

export type FamilyType = {
    name: string
    relationShip: string
    phoneNo: string
    taxExemption: string
    liveWithParents?: string
}

const modifiedData = [
    {
        id:1,
        name: 'Leo Dokidis',
        relationShip: 'Employee',
        phoneNo: '09265577722',
        dateofBirth: Date.now(),
        nrc: {
            townNumber: 'Employee',
            town: 'Employee',
            type: 'Emp loyee',
            nationalId: 'Employee',
        },
        passportId: '2342323',
        issueDate: Date.now(),
        passportExpirey: Date.now(),
        stayPermit: Date.now(),
        visaValidity: Date.now(),
        occupation: 'kdkdk',
        taxExemption: 'yes',
        transferInsurance: 'yes',
        liveWithParentsLaw: 'no',
    },
    {
        id:2,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        phoneNo: '09265577722',
        dateofBirth: Date.now(),
        townNumber:"8",
        town:"Pakaka",
        type:"Naing",
        nationId:"2232323",
        passportId:"2342323",
        issueDate:Date.now(),
        passportExpirey:Date.now(),
        stayPermit:Date.now(),
        visaValidity:Date.now(),
        occupation:"kdkdk",
        taxExemption: 'Yes',
        transferInsurance:'Yes',
        liveWithParentsLaw: 'Yes',
    },
    {   
        id:3,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        phoneNo: '09265577722',
        dateofBirth: Date.now(),
        townNumber:"8",
        town:"Pakaka",
        type:"Naing",
        nationId:"2232323",
        passportId:"2342323",
        issueDate:Date.now(),
        passportExpirey:Date.now(),
        stayPermit:Date.now(),
        visaValidity:Date.now(),
        occupation:"kdkdk",
        taxExemption: 'Yes',
        transferInsurance:'Yes',
        liveWithParentsLaw: 'Yes',
    },
    {   
        id:4,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        phoneNo: '09265577722',
        dateofBirth: Date.now(),
        townNumber:"8",
        town:"Pakaka",
        type:"Naing",
        nationId:"2232323",
        passportId:"2342323",
        issueDate:Date.now(),
        passportExpirey:Date.now(),
        stayPermit:Date.now(),
        visaValidity:Date.now(),
        occupation:"kdkdk",
        taxExemption: 'Yes',
        transferInsurance:'Yes',
        liveWithParentsLaw: 'Yes',
    },
    {   
        id:5,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        phoneNo: '09265577722',
        dateofBirth: Date.now(),
        townNumber:"8",
        town:"Pakaka",
        type:"Naing",
        nationId:"2232323",
        passportId:"2342323",
        issueDate:Date.now(),
        passportExpirey:Date.now(),
        stayPermit:Date.now(),
        visaValidity:Date.now(),
        occupation:"kdkdk",
        taxExemption: 'Yes',
        transferInsurance:'Yes',
        liveWithParentsLaw: 'Yes',
    },
    {   
        id:6,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        phoneNo: '09265577722',
        dateofBirth: Date.now(),
        townNumber:"8",
        town:"Pakaka",
        type:"Naing",
        nationId:"2232323",
        passportId:"2342323",
        issueDate:Date.now(),
        passportExpirey:Date.now(),
        stayPermit:Date.now(),
        visaValidity:Date.now(),
        occupation:"kdkdk",
        taxExemption: 'Yes',
        transferInsurance:'Yes',
        liveWithParentsLaw: 'Yes',
    },
    {   
        id:7,
        name: 'Leo Dokidis',
        relationShip: 'Brother',
        phoneNo: '09265577722',
        dateofBirth: Date.now(),
        townNumber:"8",
        town:"Pakaka",
        type:"Naing",
        nationId:"2232323",
        passportId:"2342323",
        issueDate:Date.now(),
        passportExpirey:Date.now(),
        stayPermit:Date.now(),
        visaValidity:Date.now(),
        occupation:"kdkdk",
        taxExemption: 'Yes',
        transferInsurance:'Yes',
        liveWithParentsLaw: 'Yes',
    },
];

const headerTypo = 'text-[14px] w-[150px]  font-bold text-[#687588]'

export const columns: ColumnDef<FamilyType>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <section className=" text-start">
                    <p className={cn(headerTypo)}>
                        Name
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'relationShip',
        header: ({ column }) => {
            return (
                <section>
                    <p className={cn(headerTypo)}>
                        Relation Ship
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'phoneNo',
        header: ({ column }) => {
            return (
                <section>
                    <p className={cn(headerTypo)}>
                        Phone No.
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'taxExemption',
        header: ({ column }) => {
            return (
                <section>
                    <p className={cn(headerTypo)}>
                        Tax Exemption
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'liveWithParentsLaw',
        header: ({ column }) => {
            return (
                <section>
                    <p className={cn(headerTypo)}>
                        Live with Parents
                    </p>
                </section>
            )
        },
    },
    {
        accessorKey: 'action',
        header: () => {
            const { t } = useTranslation('familyContact')

            return (
                <div className="h-full w-[100px] px-2 flex items-center justify-center ">
                    <p className="font-bold text-zinc-500 text-center">
                        {t('action')}
                    </p>
                </div>
            )
        },
        cell: ({ row }) => {
            const { t } = useTranslation('familyContact')
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
                        title={`${t(DetailValue ? 'familyDetails' : 'editFamily')}`}
                        modelRatio="w-[100svw] lg:w-[650px]"
                        editMode={false}
                        open={value}
                        toggle={toggle}
                        form={<FamilyForm editMode={value} detailValue={DetailValue} editData={item} toggle={toggle} />}
                    />
                </div>
            )
        },
    },
]
