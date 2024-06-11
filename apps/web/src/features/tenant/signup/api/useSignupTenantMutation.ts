import { axiosInstance } from "@/utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useSignupTenantMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async (fd: any) => {
            return await axiosInstance.post('/tenant/onboarding', fd,)
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}