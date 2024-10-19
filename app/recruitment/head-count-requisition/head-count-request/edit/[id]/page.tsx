// pages/recruitment/head-count-requisition/head-count-request/edit/[id].tsx
import HCREditMainPage from '@/components/recruitment-management/head-count-requisition/head-count-request/head-count-request-edit/main-page';


const Page = ({
    params: { id },
}: {
    params: { id: string }
}) => {
    return <HCREditMainPage id={id} />;
};

export default Page;
