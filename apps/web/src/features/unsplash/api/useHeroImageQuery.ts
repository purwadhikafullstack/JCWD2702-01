import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useGetHeroImageQuery = () => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: ['HeroImage'],
    queryFn: async () => {
      return await axios.get(
        'https://api.unsplash.com/photos/random?orientation=landscape&collections=Lwo2smI0EQk',
        {
          headers: {
            'Accept-Version': 'v1',
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
          },
        },
      );
    },
    staleTime: 3600 * 1000,
  });

  return {
    data,
    isSuccess,
    isError,
  };
};
