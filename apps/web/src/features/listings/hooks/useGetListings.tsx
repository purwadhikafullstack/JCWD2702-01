import {
  useGetListingsQuery,
  useGetListingByIdQuery,
} from '../api/useGetListingsQuery';

export const useGetListings = () => {
  const { data: listings, isSuccess, isError } = useGetListingsQuery();
  console.log(listings?.data);
  return {
    listings: listings?.data.listings,
  };
};

export const useGetListingById = ({ id }: { id: string }) => {
  const { data: listingById, isSuccess, isError } = useGetListingByIdQuery(id);
  console.log(listingById?.data);
  return {
    listingById: listingById?.data,
  };
};
