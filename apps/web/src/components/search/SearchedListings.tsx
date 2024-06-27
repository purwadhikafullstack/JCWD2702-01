import { axiosInstance } from '@/utils/AxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SearchListingCard } from '../cards/SearchLisingCard';
export default function SearchedListings() {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(Object.fromEntries(searchParams.entries())),
  );

  const {data, isLoading, error} = useQuery({
    queryKey: ['Search', queryParams],
    queryFn: async () => {
      return await axiosInstance.get(`/listings/search?${queryParams}`);
    },
  })
  
  return <div>ABC</div>;
}
