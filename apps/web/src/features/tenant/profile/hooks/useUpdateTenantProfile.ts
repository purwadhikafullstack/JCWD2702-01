import { useUpdateTenantMutation } from "../api/useUpdateTenantProfileMutation";
import { useDispatch } from "react-redux"
import { setTenant } from "@/stores/redux/slice/tenantSlice";
import { useToast } from "@/components/ui/use-toast";
<<<<<<< HEAD
=======
import { useQueryClient } from "@tanstack/react-query";
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853

export const useUpdateTenantProfile = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()
<<<<<<< HEAD

    const { mutate: mutationUpdateTenantProfile } = useUpdateTenantMutation({
        onSuccess: (res: any) => {
=======
    const queryClient = useQueryClient()

    const { mutate: mutationUpdateTenantProfile } = useUpdateTenantMutation({
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
            dispatch(
                setTenant({
                    display_name: res.data.data.tenant.display_name,
                    image_url: res.data.data.tenant.image_url
                })
            )
<<<<<<< HEAD
=======
            toast({
                description: `${res.data.message}`
            })
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
