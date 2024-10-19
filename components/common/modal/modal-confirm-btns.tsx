import { Button } from '@/components/ui/button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Loader from '@/components/common/loaders/loader'
import { ModalControlBtnsProps } from '@/types/common'
import { cn } from '@/lib/utils'

const ModalConfirmBtns = ({
    isLoading,
    editMode,
    language,
    toggle,
    search = false,
    setSameCheck,
    size = "md",
    width = 'w-[100px]'
}: ModalControlBtnsProps) => {

    const { t } = useTranslation(language);
    
    return (
        <div className="w-full flex py-2 mt-2  justify-center sm:justify-end gap-2">
            <Button
                onClick={() => setSameCheck && setSameCheck(false)}
                type="submit"
                size={size}
                variant="primary"
                className={cn(`${isLoading && 'opacity-50'} font-normal `,width)}
                disabled={isLoading}
            >
            {isLoading ? <Loader /> : search ? t('search') : editMode ? t('update') : t('save')}

            </Button>
            <Button
                type='button'
                onClick={toggle}
                size={size}
                variant="outline"
                disabled={isLoading}
                className={cn(` w-[100px] ${isLoading && 'opacity-50'}`,width)}
            >
              {
                search ? t('reset'):t('cancel')
              }
            </Button>
        </div>
    )
}

export default ModalConfirmBtns
