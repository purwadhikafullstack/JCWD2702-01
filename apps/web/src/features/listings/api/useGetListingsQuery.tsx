import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useGetListingsQuery = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['AllListings'],
    queryFn: async () => {
      return await axios.get('http://localhost:8000/listings/');
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};

export const useGetListingByIdQuery = (id: string) => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['Listing'],
    queryFn: async () => {
      return await axios.get(`http://localhost:8000/listings/id/${id}`);
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
