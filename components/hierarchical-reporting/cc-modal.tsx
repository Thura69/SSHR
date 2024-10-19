import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { ComboBox } from '@/components/ui/with-form/combo-box'
import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Tree } from 'antd'
import React, { Key, useEffect, useState } from 'react'

import { useGetJobGrade } from '@/service/query-hooks/use-hierarchical-report'
import _ from 'lodash'
import hierarchicalReportStore from '@/state/zustand/hierarchical-report'
import { ScrollArea } from '../ui/scroll-area'
import useMemorizeCheckTree from './hook/use-memorize-checktree'
import useNestedFilters from './hook/use-nested-filters'
import useToast from '@/hooks/use-toast'
import { CCModelProps } from '@/types/common'

const CcModal = ({ setShowCCModel, showCCModel }: CCModelProps) => {
    const form = useFormContext()

    const initialCheckedKeys = hierarchicalReportStore(
        (state) => state.ccEmployees.treeKeys,
    )

    const [checkedKeys, setCheckedKeys] = useState<any>(initialCheckedKeys)

    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

    const onExpand = (expandedKeysValue: React.Key[]) => {
        setExpandedKeys(expandedKeysValue)
        setAutoExpandParent(false)
    }

    useEffect(() => {
        setCheckedKeys(initialCheckedKeys)
    }, [initialCheckedKeys])

    const onCheck = (
        checkedKeysValue: React.Key[] | { checked: Key[]; halfChecked: Key[] },
    ) => {
        setCheckedKeys(checkedKeysValue)
    }

    const onSelect = (selectedKeysValue: React.Key[]) => {
        setSelectedKeys(selectedKeysValue)
    }

    const watchCompany = form.watch('company')
    const watchCCLocation = form.watch('cc_location')
    const watchCCBranch = form.watch('cc_branch')

    const { data: jobGrades } = useGetJobGrade()

    const { branchOptions, hierarchicalCheckTree, locationOptions } =
        useNestedFilters({ customQueryType: 'cc' })

    const ccLocationId = hierarchicalReportStore((state) => state.ccLocationId)
    const ccBranchId = hierarchicalReportStore((state) => state.ccBranchId)
    const ccJobGrade = hierarchicalReportStore((state) => state.ccJobGrade)

    const saveCCEmployees = hierarchicalReportStore(
        (state) => state.saveCCEmployees,
    )

    const { memoFormattedCheckTree, formattedCheckTree } = useMemorizeCheckTree(
        hierarchicalCheckTree,
    )

    const { showNotification } = useToast()

    const handleCCSave = () => {
        const cc_employee_full_data: any[] = []
        const cc_employee_ids = [...checkedKeys]
        const cc_location = form.getValues('cc_location')
        const cc_branch = form.getValues('cc_branch')
        const cc_jobgrade = form.getValues('cc_jobgrade')

        if (!cc_location || !cc_branch) {
            form.setError('cc_location', { type: 'required' })
            form.setError('cc_branch', { type: 'required' })
            return
        }
        if (!cc_location) {
            form.setError('cc_location', { type: 'required' })
            return
        }

        if (!cc_branch) {
            form.setError('cc_branch', { type: 'required' })
            return
        }

        if (!cc_employee_ids || cc_employee_ids.length === 0) {
            showNotification({ message: 'select CC employees', type: 'danger' })
            return
        }

        const formattedCCEmployee_flattenToDepartments = _.flatten(
            formattedCheckTree?.map(
                (departments: any) => departments?.children,
            ),
        )

        const formattedCCEmployee_flattenToEmployee = _.flatten(
            formattedCCEmployee_flattenToDepartments?.map(
                (sections: any) => sections?.children,
            ),
        )

        cc_employee_ids &&
            formattedCCEmployee_flattenToEmployee.forEach((emp: any) => {
                cc_employee_ids.forEach((selectedEmp: string) => {
                    if (selectedEmp === emp.key) {
                        cc_employee_full_data.push(emp)
                    }
                })
            })

        const treeKeys = new Set<string>()

        cc_employee_full_data.map((data: any) => {
            // if (data.Section_ID) {
            //     treeKeys.add('s_' + data.Section_ID)
            // }
            // if (data.Department_ID) {
            //     treeKeys.add('d_' + data.Department_ID)
            // }
            treeKeys.add(data.key)
        })

        const treeKeysArray = Array.from(treeKeys)

        saveCCEmployees({
            ccEmployees: {
                treeKeys: treeKeysArray,
                list: cc_employee_full_data,
            },
            ccBranchId: cc_branch,
            ccLocationId: cc_location,
            ccJobGrade: cc_jobgrade,
        })

        setShowCCModel(false)
    }

    const handleModelToggle = () => {
        setShowCCModel((prev) => !prev)
    }

    // @ts-ignore
    return (
        <Dialog open={showCCModel} onOpenChange={handleModelToggle}>
            <DialogContent className="sm:max-w-[425px] px-0">
                <ScrollArea className="max-h-[80vh] px-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle>CC Email</DialogTitle>
                    </DialogHeader>
                    <div className="">
                        <Form {...form}>
                            <form>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="cc_location"
                                        defaultValue={
                                            ccLocationId
                                                ? +ccLocationId
                                                : undefined
                                        }
                                        render={({ field }) => (
                                            <ComboBox
                                                isRequire
                                                label={'Location'}
                                                form={form}
                                                field={field}
                                                options={locationOptions ?? []}
                                            />
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cc_branch"
                                        defaultValue={
                                            ccBranchId ? +ccBranchId : undefined
                                        }
                                        render={({ field }) => (
                                            <ComboBox
                                                isRequire
                                                label={'Branch'}
                                                form={form}
                                                field={field}
                                                options={branchOptions ?? []}
                                            />
                                        )}
                                    />
                                    {watchCompany &&
                                    watchCCBranch &&
                                    watchCCLocation ? (
                                        <div>
                                            <Label>
                                                Employee{' '}
                                                <span
                                                    className={'text-red-500'}
                                                >
                                                    {' '}
                                                    *
                                                </span>
                                            </Label>
                                            <Tree
                                                key={
                                                    checkedKeys
                                                        ? checkedKeys?.length +
                                                          ''
                                                        : '0'
                                                }
                                                className="mt-0"
                                                checkable
                                                onExpand={onExpand}
                                                expandedKeys={expandedKeys}
                                                autoExpandParent={
                                                    autoExpandParent
                                                }
                                                onCheck={onCheck}
                                                checkedKeys={checkedKeys}
                                                onSelect={onSelect}
                                                selectedKeys={selectedKeys}
                                                treeData={
                                                    memoFormattedCheckTree
                                                }
                                            />
                                        </div>
                                    ) : null}

                                    <FormField
                                        control={form.control}
                                        name="cc_jobgrade"
                                        defaultValue={ccJobGrade}
                                        render={({ field }) => (
                                            <ComboBox
                                                label={'Job Grade'}
                                                form={form}
                                                field={field}
                                                options={jobGrades ?? []}
                                            />
                                        )}
                                    />
                                </div>
                            </form>
                        </Form>
                    </div>

                    <div className="flex justify-end gap-3 mt-4 mb-2">
                        <Button
                            onClick={handleCCSave}
                            className="w-[80px] max-w-[100px]"
                            variant="primary"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={handleModelToggle}
                            className="w-[80px] max-w-[100px]"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default CcModal
