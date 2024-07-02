import { useGetProfileQuery } from "../api/useGetProfileQuery"

export const useGetProfile = () => {
    const { data: profile, isSuccess, isError } = useGetProfileQuery()
    return {
        profile: profile?.data.getUserProfileResult
    }
}