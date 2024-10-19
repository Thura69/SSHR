import { useBoolean } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'
import TableFrame from '@/components/common/table/table-frame'
import { DataTable } from '../forms/data-table-employee'
import { columns } from './device-columndef'
import EmployeeModal from '../forms/employee-modal'
import DeviceForm from './device-form'


const Device = ()=>{
    const {} = useBoolean(false)
    const { t } = useTranslation('device')
    const { value, toggle, setTrue } = useBoolean(false)

    const modifiedData = [
        {
            id:1,
            name:"Laptop",
            type:"Mobile",
            "imei/mac":"12345678"
        },
        {
            id:2,
            name:"Laptop",
            type:"Mobile",
            "imei/mac":"12345678"
        },
        {
            id:3,
            name:"Laptop",
            type:"Mobile",
            "imei/mac":"12345678"
        },
        {
            id:4,
            name:"Laptop",
            type:"Mobile",
            "imei/mac":"12345678"
        },
        {
            id:5,
            name:"Laptop",
            type:"Mobile",
            "imei/mac":"12345678"
        },
    ]

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={true!}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="device"
            />
            <DataTable
                className={'with-action-employee-column'}
                columns={columns}
                isSort
                loading={false}
                data={modifiedData || []}
            />
              <EmployeeModal
                title={`${t('addDevice')}`}
                modelRatio="min-h-[345px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<DeviceForm toggle={toggle} />}
            />
        </section>
    )
}

export default Device;