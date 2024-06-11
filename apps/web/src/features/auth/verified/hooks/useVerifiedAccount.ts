import { useVerifiedAccountMutation } from "../api/useVerifiedAccountMutation";
import { useToast } from "@/components/ui/use-toast";

export const useVerifiedAccount = () => {
    const { toast } = useToast()

    const { mutate: mutationVerifiedAccount } = useVerifiedAccountMutation({
        onSuccess: (res: any) => {
            window.location.reload()
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
        mutationVerifiedAccount
    }
}