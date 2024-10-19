import BaseApi from "../axios";


export const getAllDropDownApi = async (endpoint: string) => {
    try {
        const response = await BaseApi.get(`${endpoint}`);
        return response.data;
    } catch (error) {
        throw new Error("Error Fetching Drop Down values");
    }
};