import Paging from '@/components/common/pagers/pagination-v4'
import SkillMainTable from '@/components/employee/skill/skill-maintable'
import SkillSetMainPage from '@/components/recruitment-management/skill-sets/skill-set-main'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'

const Page = () => {
    return (
        <div>
            <SkillSetMainPage />
            <Paging currentPage={1} perPage={10} totalCount={30} />
        </div>
    )
}

export default Page
