import { axiosInstance } from "@/utils/AxiosInstance"
import { useMutation } from "@tanstack/react-query"

export const useNewVerificationLinkMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async (email: any) => {
            return await axiosInstance.post('/verification/reverify', email)
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}