import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/utils/AxiosInstance';

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

export const useGetListingsCategoryQuery = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['Categories'],
    queryFn: async () => {
      return axiosInstance.get('/listings/categories');
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};

export const useGetListingsFacilitiesQuery = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['Facilities'],
    queryFn: async () => {
      return axiosInstance.get('/listings/facilities');
    },
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
