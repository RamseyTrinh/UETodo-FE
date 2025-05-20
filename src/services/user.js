import http from '@/services/http'
import {USER_API} from '@/constants/api'

export const getCurrentUser = async () => {
    return (await http.get(USER_API.GET_CURRENT_USER)).data
}