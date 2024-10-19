import { FormField } from '@/components/ui/form'
import { ComboBox } from '@/components/ui/with-form/combo-box'
import { useFormContext } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Tree } from 'antd'
import React, { Key, useState } from 'react'
import useMemorizeCheckTree from './hook/use-memorize-checktree'
import useNestedFilters from './hook/use-nested-filters'
import { RequestToProps } from '@/types/hierarchical-reporting'

const RequestTo = ({ checkedKeys, setCheckedKeys }: RequestToProps) => {
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

    const onSelect = (selectedKeysValue: React.Key[]) => {
        setSelectedKeys(selectedKeysValue)
    }

    const form = useFormContext()
    const watchCompany = form.watch('company')
    const watchToLocation = form.watch('to_location')
    const watchToBranch = form.watch('to_branch')
    const { branchOptions, hierarchicalCheckTree, locationOptions } =
        useNestedFilters({ customQueryType: 'to' })

    const { memoFormattedCheckTree } = useMemorizeCheckTree(
        hierarchicalCheckTree,
    )

    return (
        <>
            <h2 className={'font-medium mb-4'}>Request To</h2>
            <section className={'space-y-4'}>
                <FormField
                    control={form.control}
                    name="to_location"
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
                    name="to_branch"
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

                {watchCompany && watchToLocation && watchToBranch ? (
                    <div key={selectedKeys.length+''}>
                        <Label>
                            Position <span className={'text-red-500'}> *</span>
                        </Label>
                        <Tree
                            key={selectedKeys.length+''}
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
        </>
    )
}

export default RequestTo
