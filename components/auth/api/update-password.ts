import BaseApi, { setAPIToken } from '@/service/axios'
import { UpdatePasswordInterface } from '@/types/auth'

export const UpdatePassword = async (
    data: UpdatePasswordInterface,
): Promise<any> => {
    setAPIToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImNvbXBhbnlfaWQiOjEsInRlbmFudF9pZCI6MSwiaWF0IjoxNzA2Njg1NTAzfQ.iEOFbs4OyN2BlPikMTjSG1tv4bIqUbBlPGHK1ymHo00',
    )
    const response = await BaseApi.post('main/auth/reset', data)
    return response.data
}
