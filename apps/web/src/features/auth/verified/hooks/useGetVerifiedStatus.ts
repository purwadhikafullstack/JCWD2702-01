import { useGetVerifiedStatusQuery } from "../api/useGetVerifiedStatusQuery";

export const useGetVerifiedStatus = (token: string) => {
    const verifiedStatusQuery = useGetVerifiedStatusQuery(token);
    console.log(verifiedStatusQuery);

    return {
        dataVerifiedStatus: verifiedStatusQuery.data,
        isLoading: verifiedStatusQuery.isLoading,
        error: verifiedStatusQuery.error
    };
}