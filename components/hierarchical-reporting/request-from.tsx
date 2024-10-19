import { FormField } from '@/components/ui/form'
import { ComboBox } from '@/components/ui/with-form/combo-box'
import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import React, { Key, useState } from 'react'
import { Tree } from 'antd'
import useMemorizeCheckTree from './hook/use-memorize-checktree'
import useNestedFilters from './hook/use-nested-filters'
import { RequestFromProps } from '@/types/hierarchical-reporting'

const RequestFrom = ({
    setCheckedKeys,
    checkedKeys,
    disable,
}: RequestFromProps) => {
    const form = useFormContext()

    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([])
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true)

    const onExpand = (expandedKeysValue: React.Key[]) => {
        setExpandedKeys(expandedKeysValue)
        setAutoExpandParent(false)
    }

    const onCheck = (
        checkedKeysValue: React.Key[] | { checked: Key[]; halfChecked: Key[] },
    ) => {
        setCheckedKeys(checkedKeysValue)
    }

    const onSelect = (selectedKeysValue: React.Key[], info: any) => {
        setSelectedKeys(selectedKeysValue)
    }

    const watchCompany = form.watch('company')
    const watchFromLocation = form.watch('from_location')
    const watchFromBranch = form.watch('from_branch')

    const { branchOptions, hierarchicalCheckTree, locationOptions } =
        useNestedFilters({ customQueryType: 'from' })

    const { memoFormattedCheckTree } = useMemorizeCheckTree(
        hierarchicalCheckTree,
        disable,
    )

    return (
        <div className={'border rounded-16 p-4'}>
            <h2 className={'font-medium mb-4'}>Request From</h2>
            <section className={'space-y-4'}>
                <FormField
                    control={form.control}
                    name="from_location"
                    render={({ field }) => (
                        <ComboBox
                            disable={disable}
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
                    name="from_branch"
                    render={({ field }) => (
                        <ComboBox
                            disable={disable}
                            isRequire
                            label={'Branch'}
                            form={form}
                            field={field}
                            options={branchOptions ?? []}
                        />
                    )}
                />

                {watchCompany && watchFromLocation && watchFromBranch ? (
                    <div className={''}>
                        <Label>
                            Position <span className={'text-red-500'}> *</span>
                        </Label>
                        <Tree
                            className="mt-0"
                            checkable
                            onExpand={onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onCheck={onCheck}
                            checkedKeys={checkedKeys}
                            onSelect={onSelect}
                            selectedKeys={selectedKeys}
                            treeData={memoFormattedCheckTree ?? []}
                        />
                    </div>
                ) : null}
            </section>
        </div>
    )
}

export default RequestFrom
