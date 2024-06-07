import { useSignupUserMutation } from "../api/useSignupUserMutation";
import { useToast } from "@/components/ui/use-toast";

export const useSignupUser = () => {
    const { toast } = useToast()

    const { mutate: mutationSignupUser } = useSignupUserMutation({
        onSuccess: (res: any) => {
            console.log({ SignupRes: res.data.provider })
            if (res.data.provider === 1) {
                toast({
                    title: `${res.data.message}`,
                    description: "We've sent you an email to verfied your account!",
                })
            } else {
                toast({
                    title: `${res.data.message}`,
                })
            }
        },
        onError: (err: any) => {
            console.log({ SignupErr: err })
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `${err.response.data.message}`
            })
        }
    })

    return {
        mutationSignupUser
    }
}