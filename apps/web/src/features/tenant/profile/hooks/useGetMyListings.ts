import { useGetMyListingsQuery } from "../api/useGetMyListingsQuery";

export const useGetMyListings = () => {
    const { data: myListings, isSuccess, isError } = useGetMyListingsQuery()
    return {
        myListings: myListings?.data.myListing
    }
}