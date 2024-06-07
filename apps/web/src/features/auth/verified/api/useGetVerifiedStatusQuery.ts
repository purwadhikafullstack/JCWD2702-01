import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/AxiosInstance";

export const useGetVerifiedStatusQuery = (token: string) => {
    return useQuery({
        queryKey: ['status', token],
        queryFn: async () => {
            const response = await axiosInstance.get('/verification/status', {
                headers: {
                    accesstoken: token
                }
            });
            return response.data;
        },
        // enabled: !!token
    });
}
