import React from 'react'
import { parseIfDate } from '@/lib/utils'

const OldValues = ({
    valueBeforeKeys,
    valueBeforeData,
}: {
    valueBeforeKeys: any[]
    valueBeforeData: Record<any, any>
}) => {
    const dateRegex = /date/i
    const isDate = (key: string) => {
        return dateRegex.test(key)
    }

    return (
        <table className="mt-[20px]">
            <tr className="gap-3">
                <th className="text-start text-sm border-b  text-primary-500">
                    Old
                </th>
            </tr>
            {valueBeforeKeys?.map((key: string, i: number) => {
                const value = valueBeforeData[key]?.toString()
                return (
                    <div className='pb-1' key={key + i}>
                        <tr>
                            <td className="text-sm font-bold">{key}</td>
                        </tr>
                        <tr>
                            {
                                value ?  <td className="text-sm text-gray-400 line-through max-w-[300px]">
                                <p className='min-h-[18px]'>
                                    {isDate(key)
                                        ?  <p className='min-h-[18px]'>{parseIfDate(value)}</p>
                                        : value}
                                </p>
                                </td> : '-'
                            }
                        </tr>
                    </div>
                )
            })}
        </table>
    )
}

export default OldValues
