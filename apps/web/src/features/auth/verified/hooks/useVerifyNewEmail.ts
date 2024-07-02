import { useVerifyNewEmailMutation } from "../api/useVerifyNewEmail";
import { useQueryClient } from '@tanstack/react-query';

export const useVerifyNewEmail = () => {
    const queryClient = useQueryClient()

    const { mutate: mutationVerifyNewEmail } = useVerifyNewEmailMutation({
        onSuccess: (res: any) => {
            window.location.reload
            queryClient.cancelQueries({ queryKey: ['profile'] })
        },
        onError: (err: any) => {
            console.log(err)
        }
    })

    return {
        mutationVerifyNewEmail
    }
}