// pages/recruitment/head-count-requisition/head-count-request/edit/[id].tsx
import HCRDetailMainPage from '@/components/recruitment-management/head-count-requisition/head-count-request/head-count-request-detail/main-page';


const Page = ({
    params: { id },
}: {
    params: { id: string }
}) => {
    return <HCRDetailMainPage id={id} />;
};

export default Page;


HCRDetailMainPage