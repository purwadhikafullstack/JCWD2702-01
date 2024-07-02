import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/AxiosInstance";

export const useSignoutMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async () => {
            return await axiosInstance.put('/signout/')
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}