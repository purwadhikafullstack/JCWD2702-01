import { useGetHeroImageQuery } from '../api/useHeroImageQuery';

export const useGetHeroImage = () => {
  const { data: heroImage, isSuccess, isError } = useGetHeroImageQuery();
  // if (data)
  return {
    heroImage: heroImage?.data?.urls?.full,
  };
};
