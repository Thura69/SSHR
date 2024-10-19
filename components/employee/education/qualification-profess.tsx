import { useBoolean } from 'usehooks-ts'
import { useTranslation } from 'react-i18next'
import TableFrame from '@/components/common/table/table-frame'
import { DataDndTable } from '../forms/rows-drag-and-drop'
import EmployeeModal from '../forms/employee-modal'
import QualificationForm from './qualiication-form'
import { useState } from 'react'
import useCandidateStore from '@/state/zustand/candidate'
import { DataTable } from '../forms/data-table-employee'
import { UseEducationColumns } from './education-columndef'
import { UseQualificationColumns } from './qualification-columndef'

const modifiedData = [
    {
        id: 1,
        qualification: 'LCCI',
        level: 'Level 2',
        centerName: 'Center Name',
        location: 'Location',
        fromDate: 'From Date',
        toDate: 'To Date',
    },
    {
        id: 2,
        qualification: 'LCCI',
        level: 'Level 2',
        centerName: 'Center Name',
        location: 'Location',
        fromDate: 'From Date',
        toDate: 'To Date',
    },
    {
        id: 3,
        qualification: 'LCCI',
        level: 'Level 2',
        centerName: 'Center Name',
        location: 'Location',
        fromDate: 'From Date',
        toDate: 'To Date',
    },
    {
        id: 4,
        qualification: 'LCCI',
        level: 'Level 2',
        centerName: 'Center Name',
        location: 'Location',
        fromDate: 'From Date',
        toDate: 'To Date',
    },
    {
        id: 5,
        qualification: 'LCCI',
        level: 'Level 2',
        centerName: 'Center Name',
        location: 'Location',
        fromDate: 'From Date',
        toDate: 'To Date',
    },
    {
        id: 6,
        qualification: 'LCCI',
        level: 'Level 2',
        centerName: 'Center Name',
        location: 'Location',
        fromDate: 'From Date',
        toDate: 'To Date',
    },
]

type QualificationTypes = {
    handleSave?: any
    isControled?: boolean
    details?: boolean
}

const QualificationProfess: React.FC<QualificationTypes> = ({
    handleSave,
    isControled,
    details,
}) => {
    const { value, toggle, setTrue } = useBoolean(false)
    const [data, setData] = useState(modifiedData)
    const { t } = useTranslation('qualification')
    const { qualification } = useCandidateStore((state) => state)
    const columns = UseQualificationColumns()

    return (
        <section className="w-full">
            <TableFrame
                isOutline={true}
                isWrite={details ? false : true}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="qualification"
            />
              {details ? (
                <DataTable
                    isSort={true}
                    detail={details}
                    columns={columns}
                    loading={false}
                    setData={setData}
                    data={isControled ? qualification || [] : modifiedData || []}
                />
            ) : (
                <DataDndTable
                className={'with-action-employee-column'}
                columns={columns}
                loading={false}
                setData={setData}
                data={isControled ? qualification || [] : modifiedData || []}
            />
            )}
          
            <EmployeeModal
                title={`${t('add')}`}
                modelRatio="  min-h-[400px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={
                    <QualificationForm
                        isControled={isControled}
                        toggle={toggle}
                    />
                }
            />
        </section>
    )
}

export default QualificationProfess
