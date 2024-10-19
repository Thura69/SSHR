import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { DataTable } from '../forms/data-table-employee'
import EmployeeModal from '../forms/employee-modal'
import LanguageForm from './language-form'
import { useState } from 'react'
import { DataDndTable } from '../forms/rows-drag-and-drop'
import useCandidateStore from '@/state/zustand/candidate'
import { UseLanguageColumns } from './language-columndef'

const modifiedData = [
    {
        id: 1,
        language: 'English',
        speaking: 'Native',
        reading: 'Tongue',
        writing: 'Fluent',
        listening: 'Conversational',
    },
    {
        id: 2,
        language: 'English',
        speaking: 'Native',
        reading: 'Tongue',
        writing: 'Fluent',
        listening: 'Conversational',
    },
    {
        id: 3,
        language: 'English',
        speaking: 'Native',
        reading: 'Tongue',
        writing: 'Fluent',
        listening: 'Conversational',
    },
    {
        id: 4,
        language: 'English',
        speaking: 'Native',
        reading: 'Tongue',
        writing: 'Fluent',
        listening: 'Conversational',
    },
    {
        id: 5,
        language: 'English',
        speaking: 'Native',
        reading: 'Tongue',
        writing: 'Fluent',
        listening: 'Conversational',
    },
]

type LanguageProfessType = {
    handleSave?: any
    isControled?: boolean
    details?: boolean
}

const LanguageProfess: React.FC<LanguageProfessType> = ({
    handleSave,
    isControled,
    details = false,
}) => {
    const { value, toggle, setTrue } = useBoolean(false)
    const [data, setData] = useState(modifiedData)
    const { t } = useTranslation('language')
    const { language } = useCandidateStore((state) => state)
    const columns = UseLanguageColumns()

    return (
        <section className="w-full">
            <TableFrame
                isOutline
                isWrite={details ? false : true}
                subTitle={false}
                modalTrue={() => setTrue()}
                language="language"
            />
            {details ? (
                <DataTable
                    isSort={true}
                    detail={details}
                    // className={'with-action-employee-column'}
                    columns={columns}
                    loading={false}
                    setData={setData}
                    data={isControled ? language || [] : modifiedData || []}
                />
            ) : (
                <DataDndTable
                    className={'with-action-employee-column'}
                    columns={columns}
                    loading={false}
                    setData={setData}
                    data={isControled ? language || [] : modifiedData || []}
                />
            )}

            <EmployeeModal
                title={`${t('addLanguage')}`}
                modelRatio="w-[100svw] lg:w-[650px]"
                editMode={false}
                open={value}
                toggle={toggle}
                form={
                    <LanguageForm isControled={isControled} toggle={toggle} />
                }
            />
        </section>
    )
}

export default LanguageProfess
