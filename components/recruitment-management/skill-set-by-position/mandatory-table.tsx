import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { Checkbox } from '@/components/ui/checkbox'
import { COLORS } from '@/constants'
import { TrashIcon } from '@/components/common/icons'
import { useState } from 'react'

const headerTypo = 'text-[12px] md:text-[14px] font-bold text-[#687588]'

type dataType = {
    id: number
    name: string
    type: 'hard' | 'soft'
    mandatory: boolean
}

interface MandatoryTableProps {
    data: dataType[]
    detail: boolean
    handleDeleteMandatory: any
}

const MandatoryTable: React.FC<MandatoryTableProps> = ({
    data,
    detail,
    handleDeleteMandatory,
}) => {
    const { t } = useTranslation('skillSetByPosition')

    const hasHardSkills = data.some((e) => e.type === 'hard')
    const hasSoftSkills = data.some((e) => e.type === 'soft')

    return (
        <table className="w-full text-[14px] text-[#8A8A8E]">
            <TableHeader className="bg-[#EEFDFD] sticky   h-[51px]   top-0 z-10">
                <TableRow>
                    <TableHead className={cn(headerTypo, ' w-[200px]')}>
                        {t('skillSets')}
                    </TableHead>
                    <TableHead
                        className={cn(headerTypo, '', 'text-center pl-3')}
                    >
                        {t('mandatory')}
                    </TableHead>
                    {!detail && (
                        <TableHead
                            className={cn(headerTypo, '', 'text-center')}
                        >
                            {t('actions')}
                        </TableHead>
                    )}
                </TableRow>
            </TableHeader>
            <div></div>
            <TableBody>
               {
                data.length === 0 &&  <TableRow className='border-none h-[80px]'>
                <TableCell
                    colSpan={3}
                    className="text-center text-[#52525B] bordr-none text-[15px]  bg-white"
                >
                    {t('noResultFound')}
                </TableCell>
            </TableRow>
               }
                <p
                    className={cn(
                        'text-textBlue  col-span-2 px-4 mt-4 mb-2   font-[500]',
                        !hasHardSkills && 'hidden',
                        detail && 'text-[#8A8A8E]',
                    )}
                >
                    Hard Skills
                </p>

                {data.map((e) => {
                    if (e.type === 'hard') {
                        console.log(e.mandatory)
                        return (
                            <>
                                <TableRow className="p-0 ">
                                    <TableCell
                                        className={cn(
                                            'h-[50px] text-sideMenuTextColor2  text-[13px] md:text-[14px] py-0 w-[200px] text-left',
                                            detail && 'text-[#8A8A8E]',
                                        )}
                                    >
                                        {e.name}
                                    </TableCell>
                                    <TableCell className="py-0  relative text-center">
                                        <Checkbox
                                            defaultChecked={
                                                e.mandatory ? true : false
                                            }
                                            disabled={detail ? true : false}
                                            className="top-[30%] border-[1.5px] disabled:opacity-100 disabled:data-[state=checked]:border-[#737373] disabled:data-[state=checked]:bg-[#737373] rounded absolute"
                                            id="terms"
                                        />
                                    </TableCell>
                                    {!detail && (
                                        <TableCell className="py-0 h-[50px]  flex justify-center items-center">
                                            <div
                                                onClick={() =>
                                                    handleDeleteMandatory(e)
                                                }
                                                className="flex  cursor-pointer  w-[30px] h-[30px] justify-center items-center rounded-md bg-[#FFE3E1]"
                                            >
                                                <TrashIcon
                                                    className="w-[23px] h-[25px]"
                                                    fill={COLORS.danger[500]}
                                                />
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </>
                        )
                    }
                    return null
                })}
                <p
                    className={cn(
                        'text-textBlue px-4 mt-4 mb-2 font-[500]',
                        !hasSoftSkills && 'hidden',
                        detail && 'text-[#8A8A8E]',
                    )}
                >
                    Soft Skills
                </p>
                {data.map((e) => {
                    if (e.type === 'soft') {
                        return (
                            <>
                                <TableRow className="p-0">
                                    <TableCell
                                        className={cn(
                                            'h-[50px] text-sideMenuTextColor2  text-[13px] md:text-[14px] py-0 w-[200px] text-left',
                                            detail && 'text-[#8A8A8E]',
                                        )}
                                    >
                                        {e.name}
                                    </TableCell>
                                    <TableCell className="py-0  relative text-center">
                                        <Checkbox
                                            disabled={detail ? true : false}
                                            defaultChecked={
                                                e.mandatory ? true : false
                                            }
                                            className="top-[30%] border-[1.5px] disabled:opacity-100 disabled:data-[state=checked]:border-[#737373] disabled:data-[state=checked]:bg-[#737373] rounded absolute"
                                            id="terms"
                                        />
                                    </TableCell>
                                    {!detail && (
                                        <TableCell className="py-0 h-[50px]  flex justify-center items-center">
                                            <div
                                                onClick={() =>
                                                    handleDeleteMandatory(e)
                                                }
                                                className="flex  cursor-pointer  w-[30px] h-[30px] justify-center items-center rounded-md bg-[#FFE3E1]"
                                            >
                                                <TrashIcon
                                                    className="w-[23px] h-[25px]"
                                                    fill={COLORS.danger[500]}
                                                />
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </>
                        )
                    }
                    return null
                })}
            </TableBody>
        </table>
    )
}

export default MandatoryTable
