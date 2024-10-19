import PageLoader from '@/components/common/loaders/page-loader'
import { Button } from '@/components/ui/button'
import {
    useGetCopyPublicHolidays,
    useGetCopyPublicHolidaysByFinancial,
} from '@/service/query-hooks/setting/use-publicHoliday'
import useFormStore from '@/state/zustand/form-store'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function CopyFrame({ load }: { load?: boolean }) {
    const { copiedById, isError, isPending } = useGetCopyPublicHolidays()
    const { activeFinancial } = useFormStore()
    const [financialyear, setFinancialYear] = useQueryState(
        'financial_year_id',
        parseAsInteger,
    )
    const [loa, setLoading] = useState(true)
    const [con, setCon] = useQueryState('con', parseAsString.withDefault(''))
    const [page, setPage] = useQueryState('page', parseAsString.withDefault(''))
    const [same, setIsSame] = useState(true)
    const [noFinancial, setNoFinancial] = useState(false)
    const {
        isPending: getOnePending,
        getByFiancial,
        isError: getOneError,
    } = useGetCopyPublicHolidaysByFinancial()

    const {
        t,
        i18n: { language },
    } = useTranslation('publicHoliday')

    const loading = load || loa

    const handleClick = () => {
        setLoading(true)

        setFinancialYear(activeFinancial?.id!)
        setCon('copied')
    }

    useEffect(() => {
        getByFiancial(activeFinancial?.id!, {
            onSuccess: (data) => {
                if (data?.meta.currentPage !== 0) {
                    setPage(data?.meta?.currentPage)
                }
            },
        })
    }, [])

    useEffect(() => {
        getByFiancial(activeFinancial?.id!, {
            onSuccess: (data) => {
                if (data?.meta.currentPage !== 0) {
                    setPage(data?.meta?.currentPage)
                }

                if (data?.meta?.totalCount === 0) {
                    setIsSame(true)
                } else {
                    setIsSame(false)
                }

                setLoading(false)
            },
            onError: (err) => {},
        })
    }, [activeFinancial])

    if (loading)
        return (
            <div className=" text-center  h-[250px] flex flex-col justify-center items-center space-y-5">
                <PageLoader />
            </div>
        )

    return (
        <div className=" text-center  h-[250px] flex flex-col justify-center items-center space-y-5">
            {loading ? <PageLoader /> : <></>}
            {same ? (
                <p>{t('addMorePublicHoliday')}</p>
            ) : (
                <p>{t('noPublicHoliday')}</p>
            )}
            {!same && (
                <Button
                    disabled={loading}
                    onClick={handleClick}
                    className="text-primary-500 rounded-md"
                    variant={'outline'}
                >
                    {loading ? (
                        <PageLoader />
                    ) : language !== 'mm' ? (
                        `Copy ${activeFinancial?.name}  Public Holidays`
                    ) : (
                        `${activeFinancial?.name} ၏ ရုံးပိတ်ရက်များကို ကူးယူမည်`
                    )}
                </Button>
            )}
        </div>
    )
}

export default CopyFrame
