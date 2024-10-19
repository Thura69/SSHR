import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import queryString from 'query-string'
import { Menu } from '@/types/menu/menu'
import { format } from 'date-fns'
import node from 'postcss/lib/node'
import { useTransition } from 'react'


export const DATE_FORMAT = 'MM/dd/yyyy'
export const MAX_PAGE_SIZE = 100

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function truncate(str: string, length: number) {
    return str.length > length ? `${str.substring(0, length)}...` : str
}

export const STATUS_LABELS = [
    { value: 'active', label: 'active' },
    { value: 'inactive', label: 'inactive' },
]

export const JOB_LOCATION_TYPES = [
    { value: 'any', label: 'Any' },
    { value: 'onsite', label: 'OnSite' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
]


export const HEADCOUNT_STATUS = [
    { value: 'WaitingApproval', label: 'Waiting Approval' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Denied', label: 'Denied' },
    { value: 'Cancelled', label: 'Cancelled' },
]

export enum urgency_level_enum {
    medium = 'medium',
    high = 'high',
    low = 'low',
    critical = 'critical',
}

export const URGENCY_LEVEL = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },

]

export const ASK_LABELS = [
    { value: 'active', label: 'Yes' },
    { value: 'inactive', label: 'No' },
]

export const InterExter_LABELS = [
    { value: 'active', label: 'Internal' },
    { value: 'inactive', label: 'External' },
]


export function parseMenuToHref(inputText: string) {
    // Convert to lowercase
    let lowerCaseText = inputText.toLowerCase().trim()

    // Replace spaces with hyphens
    let formattedText = lowerCaseText.replace(/\s+/g, '-')

    return formattedText
}

// to get nested menu level
export function getNestedLevel(menu: any, level = 1) {
    if (!menu.children || !menu.children.length) {
        return level
    }

    const childLevels = menu.children.map((child: any) =>
        getNestedLevel(child, level + 1),
    )

    return Math.max(level, ...childLevels)
}


export const queryStringGenerator = (queryObj: Record<string, any>): string => {
    const queryStr = queryString.stringify(queryObj, {
        skipEmptyString: true,
        skipNull: true,
    })
    return queryStr
}

export const getLanguage = () => {
    if (typeof window !== 'undefined') {
        return (
            JSON.parse(localStorage?.getItem('PreferenceStore') as string)
                ?.state?.selectedLanguage || 'en'
        )
    }
    return 'en'
}

export const getMenuName = (item: Menu) => {
    if (item.tbl_menu_language) {
        return item.tbl_menu_language[0].translated
    }

    return item.menu_name
}

export const generateFakeNode = (data: any) => {
    const fakeRootNode = {
        id: 0,
        parentId: null,
        name: '',
    }
    const modifiedData = [...data]
    modifiedData.forEach((d: any, i) => {
        if (d.parentId === null) {
            modifiedData[i] = { ...d, parentId: 0 }
        }
    })

    return [fakeRootNode, ...modifiedData]
}

//format date
export const formatGivenDate = (givenDate: string) => {
    const inputDate = new Date(givenDate)
    const formattedDate = inputDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    })
    return formattedDate
}

export function safeJsonParse(jsonString: string) {
    if (!jsonString) return
    try {
        return JSON.parse(jsonString)
    } catch (error: any) {
        console.error('Error parsing JSON:', error.message)
        return null // or handle the error in a way that suits your application
    }
}

export const parseIfDate = (dateString: string) => {
    // Attempt to parse the input string as a date
    try {
        return format(dateString, DATE_FORMAT)
    } catch (e: any) {
        return dateString
    }
}

export const AuditTrailEventTypes = {
    VIEW: 'VIEW',
    INSERT: 'INSERT',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    IMPORT: 'IMPORT',
    EXPORT: 'EXPORT',
} as const

export const getParseOrgChartNodeData = (data: any) => {
    const getFakeNode = generateFakeNode(data)

    return getFakeNode
}

export function getAuditTrailBorderColor(
    changesType: keyof typeof AuditTrailEventTypes,
) {
    switch (changesType) {
        case AuditTrailEventTypes.VIEW:
            return 'border-green-300'
        case AuditTrailEventTypes.DELETE:
            return 'border-green-300'
        case AuditTrailEventTypes.UPDATE:
            return 'border-yellow-300'
        case AuditTrailEventTypes.INSERT:
            return 'border-blue-300'
        default:
            return 'border-green-300'
    }
}

export const parsedCheckTree: any = (data: any, isDisabled?: boolean) =>
    data?.map((d: any) => ({
        ...d,
        key: 'd_' + d?.Department_ID,
        title: d?.Department_Name,
        disabled: isDisabled,
        children: d?.children?.map((child: any) => ({
            ...child,
            key: 's_' + child?.Section_ID,
            title: child?.Section_Name,
            disabled: isDisabled,
            children: child?.children?.map((grandChild: any) => ({
                ...grandChild,
                disabled: isDisabled,
                key: grandChild?.Position_ID + '',
                title: grandChild?.Position_Name ?? 'No Name',
            })),
        })),
    }))

export const pageParser = (value: string | undefined) => {
    const pageInt = value ? Math.min(parseInt(value, 16), 20) : 15
    return pageInt
}

export const getChangesValues = (
    dirtyFields: any,
    form: any,
    editData: any,
) => {
    const afterValue: any = {}
    const beforeValue: any = {}



    Object.keys(dirtyFields).forEach((key: any) => {

        if (dirtyFields[key as keyof typeof dirtyFields] === true || dirtyFields[key as keyof typeof dirtyFields]?.length) {

            afterValue[key] = form.getValues(key)
            beforeValue[key] = editData[key]
        }



    })

    return { afterValue, beforeValue }
}

export const getChangesFromTwoObjects = (oldData: any, newData: any) => {
    const afterValue: any = {}
    const beforeValue: any = {}

    Object.keys(newData).forEach((key: any) => {
        if (oldData[key] !== newData[key]) {
            afterValue[key] = newData[key]
            beforeValue[key] = oldData[key]
        }
    })

    return { afterValue, beforeValue }
}

//formate date

export function formatDate(dateString: any) {
    // Create a new Date object using the provided string
    var date = new Date(dateString)

    // Extract year, month, and day
    var year = date.getFullYear()
    var month = ('0' + (date.getMonth() + 1)).slice(-2) // Adding 1 because months are zero-based
    var day = ('0' + date.getDate()).slice(-2)

    // Formatted date string in "YYYY-MM-DD" format
    var formattedDate = year + '-' + month + '-' + day

    return formattedDate
}

export const findDiffFields = (
    newObj: Record<string, any>,
    oldObj: Record<string, any>,
) => {
    const keys = Object.keys(newObj)
    const diffBefore: Record<string, any> = {}
    const diffAfter: Record<string, any> = {}
    keys.forEach((key) => {
        if (newObj[key] !== oldObj[key]) {
            diffAfter[key] = newObj[key]
            diffBefore[key] = oldObj[key]
        }
    })

    return { diffAfter, diffBefore }
}

export function capitalizeFirstLetter(
    string: string | undefined,
): string | undefined {
    if (!string) return
    return string.charAt(0).toUpperCase() + string.slice(1)
}

