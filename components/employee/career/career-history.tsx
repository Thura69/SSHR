import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import EmployeeModal from '../forms/employee-modal'
import CareerForm from './career-form'
import QualificationForm from '../education/qualiication-form'
import { DataDndTable } from '../forms/rows-drag-and-drop'
import { useState } from 'react'
import useCandidateStore from '@/state/zustand/candidate'
import { DataTable } from '../forms/data-table-employee'
import { UseCareerColumns } from './career-dnd-columndef'

const modifiedData = [
    {
        id: 1,
        companyName: 'Apple',
        position: 'Position',
        from: '12/08/2024',
        to: '13/08/2024',
    },
    {
        id: 2,
        companyName: 'Google',
        position: 'Position',
        from: '12/08/2024',
        to: '13/08/2024',
    },
    {
        id: 3,
        companyName: 'Orange',
        position: 'Position',
        from: '12/08/2024',
        to: '13/08/2024',
    },
    {
        id: 4,
        companyName: 'Bell',
        position: 'Bell',
        from: '12/08/2024',
        to: '13/08/2024',
    },
    {
        id: 5,
        companyName: 'Kit',
        position: 'Position',
        from: '12/08/2024',
        to: '13/08/2024',
    },
    {
        id: 6,
        companyName: 'Kit',
        position: 'Position',
        from: '12/08/2024',
        to: '13/08/2024',
    },
]

type CareerHistoryType = {
    handleSave?: any
    isControled?: boolean
    details?: boolean
}

const CareerHistory: React.FC<CareerHistoryType> = ({
    handleSave,
    isControled,
    details,
}) => {
    const { value, toggle, setTrue } = useBoolean(false)
    const { t } = useTranslation('career')
    const [data, setData] = useState(modifiedData)
    const { careerHistory } = useCandidateStore((state) => state)
    const columns = UseCareerColumns()

    return (
        <section className="w-ful">
            <TableFrame
                isOutline={true}
                isWrite={details ? false : true}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="career"
            />
            {details ? (
                <DataTable
                    isSort={true}
                    className={' with-action-details-col'}
                    detail={details}
                    columns={columns}
                    loading={false}
                    setData={setData}
                    data={
                        isControled ? careerHistory || [] : modifiedData || []
                    }
                />
            ) : (
                <DataDndTable
                    className={'with-action-employee-column'}
                    columns={columns}
                    loading={false}
                    setData={setData}
                    data={isControled ? careerHistory || [] : data || []}
                />
            )}

            <EmployeeModal
                title={`${t('addCareer')}`}
                modelRatio="  min-h-[400px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={<CareerForm isControled={isControled} toggle={toggle} />}
            />
        </section>
    )
}

export default CareerHistory
