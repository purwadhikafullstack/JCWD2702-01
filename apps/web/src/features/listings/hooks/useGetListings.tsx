import {
  useGetListingsQuery,
  useGetListingByIdQuery,
  useGetListingsCategoryQuery,
  useGetListingsFacilitiesQuery,
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

export const useGetListingsCategory = () => {
  const {
    data: categories,
    isSuccess,
    isError,
  } = useGetListingsCategoryQuery();
  return {
    categories: categories?.data.data,
  };
};

export const useGetListingsFacilities = () => {
  const {
    data: facilities,
    isSuccess,
    isError,
  } = useGetListingsFacilitiesQuery();
  return {
    facilities: facilities?.data.data,
  };
};
