import { useSendResetPasswordLinkMutation } from "../api/useSendResetPasswordLinkMutation";
import { useToast } from "@/components/ui/use-toast";

export const useSendResetPasswordLink = () => {
    const { toast } = useToast()

    const { mutate: mutationSendResetPasswordLink } = useSendResetPasswordLinkMutation({
        onSuccess: (res: any) => {
            toast({
                title: `${res.data.message}`,
            })
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `${err.response.data.message}`
            })
        }
    })

    return {
        mutationSendResetPasswordLink
    }
}