'use client'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

const PaginationButton = (props: {
    pageNumber: number
    searchParamName: string
}) => {
    const searchParams = useSearchParams()
    const param = searchParams.get(props.searchParamName)

    return (
        <Button
            variant={
                Number(param) === props.pageNumber ||
                (!param && props.pageNumber === 1)
                    ? 'default'
                    : 'ghost'
            }
            className="w-fit"
            key={props.pageNumber}
        >
            {props.pageNumber}
        </Button>
    )
}

export default PaginationButton
