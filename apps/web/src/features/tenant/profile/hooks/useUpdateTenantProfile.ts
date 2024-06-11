import { useUpdateTenantMutation } from "../api/useUpdateTenantProfileMutation";
import { useDispatch } from "react-redux"
import { setTenant } from "@/stores/redux/slice/tenantSlice";
import { useToast } from "@/components/ui/use-toast";

export const useUpdateTenantProfile = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const { mutate: mutationUpdateTenantProfile } = useUpdateTenantMutation({
        onSuccess: (res: any) => {
            dispatch(
                setTenant({
                    display_name: res.data.data.tenant.display_name,
                    image_url: res.data.data.tenant.image_url
                })
            )
        },
        onError: (err: any) => {
            toast({
                variant: "destructive",
                description: `${err.response.data.message}`
            })
        }
    })

    return {
        mutationUpdateTenantProfile
    }
}
