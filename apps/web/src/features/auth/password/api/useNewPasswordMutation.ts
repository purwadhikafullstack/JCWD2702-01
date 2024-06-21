import { axiosInstance } from "@/utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useNewPasswordMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async ({ password, token }: any) => {
            return await axiosInstance.put('/password', { password }, {
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