import { useNewPasswordMutation } from "../api/useNewPasswordMutation";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const useNewPassword = () => {
    const { toast } = useToast()
    const router = useRouter()

    const { mutate: mutationNewPassword } = useNewPasswordMutation({
        onSuccess: (res: any) => {
            toast({
                description: `${res.data.message}`
            })
            router.push('/signin')
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
        mutationNewPassword
    }
}