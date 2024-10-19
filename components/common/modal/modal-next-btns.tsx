import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import Loader from '@/components/common/loaders/loader'
import { ModalNextBtnsProps } from '@/types/common'

const ModalNextBtns = ({
    language,
    handleClick,
    toggle,
    width = 'w-[100px]',
}: ModalNextBtnsProps) => {
    const { t } = useTranslation(language)

    return (
        <div className="w-full  flex py-2 mt-2  justify-center sm:justify-end gap-2">
            <Button
                onClick={() => handleClick}
                type="submit"
                variant="primary"
                size={'lg'}
                className={cn(` font-normal h-[50px]   p-0 md:text-[16px] text-[14px] `, width)}
            >
                {t('next')}
            </Button>
         
            <Button
                type="button"
                onClick={toggle}
                variant="outline"
                className={cn(` font-normal h-[50px]  p-0 md:text-[16px] text-[14px] `, width)}
            >
                {t('cancel')}
            </Button>
        </div>
    )
}

export default ModalNextBtns
