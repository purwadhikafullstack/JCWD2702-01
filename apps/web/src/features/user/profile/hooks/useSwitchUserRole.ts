import { useSwitchUserRoleMutation } from "../api/useSwitchUserRoleMutation";
import { useDispatch } from "react-redux"
import { setUser } from "@/stores/redux/slice/userSlice";
import { setTenant } from "@/stores/redux/slice/tenantSlice";
import { setCookie } from "@/utils/Cookies";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useSwitchUserRole = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const queryClient = useQueryClient()

    const { mutate: mutationSwitchUserRole } = useSwitchUserRoleMutation({
        onSuccess: (res: any) => {
            setCookie(res.data.data.accesstoken)
            queryClient.invalidateQueries({ queryKey: ['profile'] })
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
        },
        onError: (err: any) => {
            console.log(err)
            router.push('/be-a-tenant')
        }
    })

    return {
        mutationSwitchUserRole
    }
}
