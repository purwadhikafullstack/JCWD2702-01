import { useUpdateUserMutation } from "../api/useUpdateUserProfileMutation"
import { useDispatch } from "react-redux"
import { setUser } from "@/stores/redux/slice/userSlice";
import { useToast } from "@/components/ui/use-toast";
<<<<<<< HEAD
import { setCookie } from "@/utils/Cookies";
=======
import { setCookie, setUpdateEmailCookie } from "@/utils/Cookies";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout } from "@/features/auth/signin/hooks/useSignin";
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853

export const useUpdateUserProfile = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()
<<<<<<< HEAD

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
=======
    const queryClient = useQueryClient()
    const { mutationSignout } = useLogout()
    const handleLogout = () => {
        mutationSignout();
    };

    const { mutate: mutationUpdateUserProfile } = useUpdateUserMutation({
        onSuccess: (res: any, variables: any) => {
            const formData = JSON.parse(variables.get('data'))
            if (formData.email) {
                setUpdateEmailCookie(res.data.data.accesstoken)
                handleLogout()
                toast({
                    description: `${res.data.message}`,
                });
            } else {
                console.log(res);
                setCookie(res.data.data.accesstoken);
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                dispatch(
                    setUser({
                        uid: res.data.data.uid,
                        display_name: res.data.data.display_name,
                        rolesId: res.data.data.rolesId,
                        image_url: res.data.data.image_url,
                    })
                );
                toast({
                    description: `${res.data.message}`,
                });
            }
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
        mutationUpdateUserProfile
    }
}