import { useMutation } from "@tanstack/react-query";
import { getUpdateEmailCookie } from "@/utils/Cookies";
import axios from "axios";

export const useVerifyNewEmailMutation = ({ onSuccess, onError }: any) => {
    const { mutate } = useMutation({
        mutationFn: async () => {
            const updCookie = await getUpdateEmailCookie()
            const token = updCookie?.value
            if (!token) {
                throw new Error("No token found");
            }
            return await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}verification/new-email-verify`, {}, {
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