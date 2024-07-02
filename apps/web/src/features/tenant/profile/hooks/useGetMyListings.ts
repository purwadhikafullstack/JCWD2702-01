import { useGetMyListingsQuery } from "../api/useGetMyListingsQuery";

export const useGetMyListings = (page: number) => {
    const { data: myListings, isSuccess, isError } = useGetMyListingsQuery(page)
    return {
        myListings: myListings?.data || []
    }
}