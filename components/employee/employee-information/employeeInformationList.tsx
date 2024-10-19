import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import EmployeeHeader from '../employee-header'
import TableFrame from '@/components/common/table/table-frame'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import VerticalSheet from '@/components/vertical-timeline/vertical-sheet'
import EmployeeInformationSheet from './employee-information-sheet'
import EmployeeInformationForm from './employee-information-form'

const EmployeeInformationList = () => {
    const { t } = useTranslation('employeeInformation')
    const isMobile = useMediaQuery('(max-width: 1100px)')

    return (
        <section className="w-full p-4 px-6">
            {/* <Breadcrumbs
                segments={[
                    {
                        title: 'Employee Information',
                        href: `/dashboard`,
                    },
                    {
                        // @ts-ignore
                        title: 'Job',
                        href: '',
                    },
                ]}
            /> */}
            <div className=" flex items-center mt-4 justify-between">
                <EmployeeHeader />
                {isMobile && <EmployeeInformationSheet />}
            </div>
            <div className=" space-y-4 mt-6">
                <TableFrame
                    subTitle={false}
                    modalTrue={() => {}}
                    margin="my-2 lg:mt-0 "
                    language="employeeInformation"
                    isWrite={false}
                />
                <EmployeeInformationForm />
            </div>
        </section>
    )
}

export default EmployeeInformationList
