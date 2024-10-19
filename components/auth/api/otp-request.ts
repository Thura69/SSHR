import BaseApi, { setAPIToken } from '@/service/axios'
import { ForgetPasswordInterface } from '@/types/auth'

export const postForgetPassword = async (
    data: ForgetPasswordInterface,
): Promise<any> => {

  


    setAPIToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImNvbXBhbnlfaWQiOjEsInRlbmFudF9pZCI6MSwiaWF0IjoxNzA2Njg1NTAzfQ.iEOFbs4OyN2BlPikMTjSG1tv4bIqUbBlPGHK1ymHo00',
    )
    const response = await BaseApi.post('/auth/forget-password', data)

    console.log("******")
    console.log("This is response",response);
    console.log("******")

    return response.data
}
