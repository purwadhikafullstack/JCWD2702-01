import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/AxiosInstance";

export const useSendResetPasswordLinkMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async ({ email }: { email: string }) => {
            return await axiosInstance.post('/password/reset-password-link', { email })
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}