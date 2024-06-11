import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/AxiosInstance";
import { ISignupUser } from "../type";

export const useSignupUserMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async ({ uid, email, display_name, is_verified, image_url }: ISignupUser) => {
            return await axiosInstance.post('/signup/user', {
                uid, email, display_name, is_verified, image_url
            })
        },
        onSuccess,
        onError
    })

    return {
        mutate
    }
}