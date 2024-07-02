import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';
import axios from 'axios';
import { getCookie, getUpdateEmailCookie } from '@/utils/Cookies';

export const useGetProfileQuery = () => {
    const { data, isSuccess, isError } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const cookie = await getCookie()
            const updCookie = await getUpdateEmailCookie()
            const token = cookie?.value || updCookie?.value
            if (!token) {
                throw new Error("No token found");
            }
            return await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}user/`, {
                headers: {
                    accesstoken: token
                }
            })
        }
    })

    return {
        data,
        isSuccess,
        isError,
    };
}