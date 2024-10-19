'use client'

import { Breadcrumbs } from '@/components/common/pagers/breadcrumbs'
import TableFrame from '@/components/common/table/table-frame'
import EmailTemplate from './email-template'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const PreviewPage = () => {
    const router = useRouter()

    const handleCancel = () => {
        router.push('/recruitment/email-template/add-email-template')
    }

    return (
        <section className="w-full p-4 px-6">
            <Breadcrumbs
                segments={[
                    {
                        title: 'Recruitment',
                        href: `/recruitment`,
                    },
                    {
                        // @ts-ignore
                        title: 'Email Template',
                        href: '/email-template',
                    },
                    {
                        // @ts-ignore/home/smilaxglobal/Downloads/Frame(2).png /home/smilaxglobal/Downloads/Frame(1).png /home/smilaxglobal/Downloads/Frame.png
                        title: 'Preview Email Template',
                        href: '/preview-email-template',
                    },
                ]}
            />
            <TableFrame
                isOutline
                isWrite={false}
                subTitle={false}
                modalTrue={() => {}}
                language={'emailTemplate'}
            />
            <EmailTemplate />

            <div className="flex my-5 container mx-auto items-center justify-end">
                <Button onClick={handleCancel} variant={'outline'}>
                    Close
                </Button>
            </div>
        </section>
    )
}

export default PreviewPage
