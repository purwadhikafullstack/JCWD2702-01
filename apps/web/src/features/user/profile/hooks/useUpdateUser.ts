import { useUpdateUserMutation } from "../api/useUpdateUserProfileMutation"
import { useDispatch } from "react-redux"
import { setUser } from "@/stores/redux/slice/userSlice";
import { useToast } from "@/components/ui/use-toast";
import { setCookie } from "@/utils/Cookies";

export const useUpdateUserProfile = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()

    const { mutate: mutationUpdateUserProfile } = useUpdateUserMutation({
        onSuccess: (res: any) => {
            setCookie(res.data.data.accesstoken)
            dispatch(
                setUser({
                    uid: res.data.data.uid,
                    display_name: res.data.data.display_name,
                    rolesId: res.data.data.rolesId,
                    image_url: res.data.data.image_url
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
        mutationUpdateUserProfile
    }
}