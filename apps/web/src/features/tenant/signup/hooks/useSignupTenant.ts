import { useToast } from "@/components/ui/use-toast";
import { useSignupTenantMutation } from "../api/useSignupTenantMutation";
import { setCookie } from "@/utils/Cookies";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/redux/slice/userSlice";
import { setTenant } from "@/stores/redux/slice/tenantSlice";

export const useSignupTenant = (nextStep: any) => {
    const { toast } = useToast()
    const dispatch = useDispatch()

    const { mutate: mutationSignupTenant } = useSignupTenantMutation({
        onSuccess: (res: any) => {
            setCookie(res.data.data.accesstoken)
            dispatch(
                setUser({
                    uid: res.data.data.user.uid,
                    display_name: res.data.data.user.display_name,
                    rolesId: res.data.data.user.rolesId,
                    image_url: res.data.data.user.image_url
                })
            )
            dispatch(
                setTenant({
                    display_name: res.data.data.tenant.display_name,
                    image_url: res.data.data.tenant.image_url
                })
            )
            toast({
                title: `${res.data.message}`,
                description: "Tenant profile has been created successfully"
            })
            nextStep()
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
        mutationSignupTenant
    }
}