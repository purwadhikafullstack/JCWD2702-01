import { useGetMyListingsQuery } from "../api/useGetMyListingsQuery";

export const useGetMyListings = () => {
    const { data: myListings, isSuccess, isError } = useGetMyListingsQuery()
    console.log({ myListings: myListings?.data.myListing })
    return {
        myListings: myListings?.data.myListing
    }
}