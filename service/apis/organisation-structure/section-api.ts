import BaseApi from '@/service/axios';

const url = '';

export const getAllSection = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`);
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
};


export const createSection = async (data: any): Promise<any> => {
    try {
        const payload = {};
        const response = await BaseApi.post(url, payload)
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
};

export const updateSection = async (data: any): Promise<any> => {
    const { id } = data;
    try {
        const payload = {};

        const response = await BaseApi.patch(`${url}/${id}`, payload);

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
};


export const deleteVaccine = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}