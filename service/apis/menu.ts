import BaseApi from '@/service/axios'

const getParentMenuUrl = 'main/menu/parent'
const getChildMenuUrl = 'main/menu/child'
const getGrandChildMenuUrl = 'main/menu/grand-child'

export const getParentMenuApi = async () => {
    try {
        const response = await BaseApi.get(getParentMenuUrl)
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching parent menus',
        )
    }
}

export const getChildMenuApi = async (parentMenuId: string) => {
    try {
        const response = await BaseApi.get(
            `${getChildMenuUrl}?parent_menu_id=${parentMenuId}`,
        )
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching child menus',
        )
    }
}

export const getGrandChildMenuApi = async (childMenuId: string) => {
    try {
        const response = await BaseApi.get(
            `${getGrandChildMenuUrl}?children_menu_id=${childMenuId}`,
        )
        return response.data
    } catch (e: any) {
        throw new Error(
            e?.response?.data?.message ?? 'Error at fetching grand-child menus',
        )
    }
}
