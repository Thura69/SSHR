import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import * as yup from 'yup'
import DropDownDataField from '@/components/common/form/fields/dropdown-data-field'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { additionalData } from '@/components/setting/code-generator/utils'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Form,
} from '@/components/ui/form'
import { Calendar } from '../ui/calendar'

const EmployeeFilterSheet = () => {
    const FormSchema = yup.object({
        id: yup.number(),
        company: yup.array(),
        location: yup.array(),
        branch: yup.array(),
        department: yup.array(),
        section: yup.array(),
        position: yup.array(),
        employeeName: yup.array(),
    })

    const form = useForm({
        resolver: yupResolver(FormSchema),
    })

    const { t } = useTranslation('career')

    const handleOnSave = (e: any) => {
        console.log('hello')
        console.log(e)
    }

    return (
        <Sheet>
            <SheetTrigger className="" asChild>
                <Button variant={'ghost'}>
                    <Filter className=" h-5 w-5 text-primary-500" />
                </Button>
            </SheetTrigger>
            <SheetContent className="p-0">
                <div className="h-screen relative divide-y overflow-y-auto divide-red-100 ">
                  
                    <Form {...form}>
                        <form
                            className="sm:space-y-[16px]"
                            onSubmit={form.handleSubmit(handleOnSave)}
                        >
                            <DropDownDataField
                                disabled={false}
                                fieldName="company"
                                placeHolder={t('placeHolder.select')}
                                required={false}
                                requiredLabel={true}
                                languageName={'career'}
                                fieldHeight={cn(' w-full')}
                                fieldWidth={''}
                                additionalData={additionalData}
                            />
                            <Calendar/>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default EmployeeFilterSheet
