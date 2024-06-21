import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/AxiosInstance";

export const useSwitchUserRoleMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async (fd: any) => {
            return await axiosInstance.put('/user/role')
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}