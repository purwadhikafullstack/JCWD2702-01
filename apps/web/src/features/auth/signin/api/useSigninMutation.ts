import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/AxiosInstance";

export const useSigninMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async ({ email, password }: any) => {
            return await axiosInstance.post('/signin',
                {
                    email,
                    password
                }
            )
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}

export const usePersistSigninMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async () => {
            return await axiosInstance.post('/signin/persist');
        },
        onSuccess,
        onError,
    });

    return {
        mutate,
    };
}