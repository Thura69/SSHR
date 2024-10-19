import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'usehooks-ts'
import { Form } from '@/components/ui/form'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import InternalForm from './internal-form'
import { Button } from '@/components/ui/button'
import ModalConfirmBtns from '@/components/common/modal/modal-confirm-btns'
import ExternalForm from './external-form'

const activeTab =
    'data-[state=active]:bg-primary-500 w-full p-3  rounded-lg data-[state=active]:text-white'

const HiringForm = ({
    toggle,
    detailValue,
    editData,
    editMode = false,
}: {
    toggle: any
    detailValue?: boolean
    editData?: any
    editMode?: boolean
}) => {
    const isMobile = useMediaQuery('(max-width: 766px)')
    const { t } = useTranslation('screenStaging')

    return (
        <InternalForm
            toggle={toggle}
            detailValue={detailValue}
            editData={editData}
            editMode={editMode}
        />
    )
}

export default HiringForm
