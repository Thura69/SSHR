import BaseApi from './axios'

type ActionFunction<T> = (...args: any[]) => Promise<T>

type ActionsType = {
    getMainMenu: ActionFunction<any>
}

export const API: ActionsType = {
    getMainMenu: (userId: number) =>
        BaseApi.get(`auth/menu`)
            .then((res) => res.data)
            .catch((error) => {
                console.error('Error in getMainMenu:', error)
                throw error
            }),
}
