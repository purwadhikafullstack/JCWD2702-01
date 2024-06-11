import { axiosInstance } from "@/utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useVerifiedAccountMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async ({ fd, token }: any) => {
            return await axiosInstance.put('/verification', fd, {
                headers: {
                    accesstoken: token
                }
            })
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}