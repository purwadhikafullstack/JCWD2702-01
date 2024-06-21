import { axiosInstance } from "@/utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUserMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async (fd: any) => {
            return await axiosInstance.put('/user/profile', fd,)
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}