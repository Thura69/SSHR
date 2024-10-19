import BaseApi from '@/service/axios'
import { DeviceSetUpColumnDefType } from '@/types/setting/device-setup-types'

const url = 'common/device-setups'

export const GetAllDeviceSetUp = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const CreateDeviceSetup = async (data: any) => {
    try {
        const payload = {
            Device_ID:data?.Device_ID,
            AllowMealAllowance: data.AllowMealAllowance,
            BaudRate:data.BaudRate,
            ConnectionType: data.ConnectionType,
            DeviceName: data.DeviceName,
            DeviceNumber: data.DeviceNumber,
            IPAddress: data.IPAddress,
            IsActive: data.IsActive,
            Interval: data.Interval,
            Mode: data.Mode,
            Model: data.Model,
            Password:data.Password,
            PortNumber: data.PortNumber,
        }

        const response = await BaseApi.post(`${url}`, payload)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const GetOneDeviceSetup = async (id: string) => {
    try {
        const response = await BaseApi.get(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const UpdateOneDeviceSetup = async (data: DeviceSetUpColumnDefType) => {
    const { Device_ID } = data

    try {
        const payload = {
            Device_ID:data?.Device_ID,
            AllowMealAllowance: data?.AllowMealAllowance,
            BaudRate:data?.BaudRate,
            ConnectionType: data?.ConnectionType,
            DeviceName: data?.DeviceName,
            DeviceNumber: data?.DeviceNumber,
            IPAddress: data?.IPAddress,
            IsActive: data.IsActive,
            Interval: data.Interval,
            Mode: data.Mode,
            Model: data.Model,
            Password:data?.Password,
            PortNumber: data?.PortNumber,
        }
        const response = await BaseApi.patch(`${url}/${Device_ID}`, payload);
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const DeleteDeviceSetup = async (id: number) => {
    try {
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
