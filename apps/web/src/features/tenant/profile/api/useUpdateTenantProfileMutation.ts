import { axiosInstance } from "@/utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useUpdateTenantMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async (fd: any) => {
            return await axiosInstance.put('/tenant/profile', fd,)
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}