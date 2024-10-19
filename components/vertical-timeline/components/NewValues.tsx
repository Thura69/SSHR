import React from 'react'
import { parseIfDate } from '@/lib/utils'

const NewValues = ({
    valueAfterKeys,
    valueAfter,
}: {
    valueAfterKeys: any[]
    valueAfter: Record<any, any>
}) => {
    const dateRegex = /date/i
    const isDate = (key: string) => {
        return dateRegex.test(key)
    }

    return (
        <table className="mt-[20px]">
            <tr className="gap-3">
                <th className="text-start text-sm border-b  text-primary-500">
                    Edited
                </th>
            </tr>

            {valueAfterKeys?.map((key: string, i: number) => {
                const value = valueAfter[key]?.toString()
                return (
                    <div className='pb-1' key={key + i} >
                        <tr>
                            <td className="text-sm font-bold">{key}</td>
                        </tr>
                        <tr>
                            {
                                value ?  <td className="text-sm w-[300px]">
                               <p className='min-h-[18px]'>
                                 {isDate(key)
                                    ? parseIfDate(value)
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

export default NewValues
