import BaseApi from '@/service/axios'

const url = 'common/code-generators'

export const getAllCodeGenerators = async (query: string) => {
    try {
        const response = await BaseApi.get(`${url}?${query}`)
        return response.data
    } catch (error: any) {}
}

export const createCodeGenerators = async (data: any): Promise<any> => {
    try {
        const payload = {
            serial_no: data.sequence,
            prefix: data.prefix,
            format: data.format,
            generate_new_code: data.generateCode,
            remark: data.remark,
            emp_status: data.employeeStatus,
            type: data.type,
        }

        const response = await BaseApi.post(url, payload)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const deleteCodeGenerators = async (id: number): Promise<any> => {
    try {
        const response = await BaseApi.delete(`${url}/${id}`)
        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}

export const updateCodeGenerators = async (data: any): Promise<any> => {
    const { id } = data
    try {
        const payload: any = {
            serial_no: data.sequence,
            emp_status: data.employeeStatus,
            prefix: data.prefix,
            format: data.format,
            generate_new_code: data.generateCode,
            remark: data.remark,
            type: data.type,
        }

        if (data.Type === 'Employee') {
            payload.Emp_Status = data.employeeStatus
        }

        const response = await BaseApi.patch(`${url}/${id}`, payload)

        return response.data
    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}
