import {
  useGetListingsQuery,
  useGetListingByIdQuery,
  useGetListingsCategoryQuery,
  useGetListingsFacilitiesQuery,
  useGetListingsBySearchQuery,
} from '../api/useGetListingsQuery';

export const useGetListings = () => {
  const { data: listings, isSuccess, isError } = useGetListingsQuery();
  return {
    listings: listings?.data.listings,
  };
};

export const useGetListingById = ({ id }: { id: string }) => {
  const { data: listingById, isSuccess, isError } = useGetListingByIdQuery(id);
  return {
    listingById: listingById?.data,
  };
};

export const useGetListingsBySearch = (params: string) => {
  const {
    data: searchResult,
    isSuccess,
    isError,
  } = useGetListingsBySearchQuery(params);
  console.log('nih ape', searchResult?.data);
  return {
    searchResult: searchResult?.data,
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
