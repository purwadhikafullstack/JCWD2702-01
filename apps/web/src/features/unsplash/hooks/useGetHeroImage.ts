import { useGetHeroImageQuery } from '../api/useHeroImageQuery';

export const useGetHeroImage = () => {
  const { data: heroImage, isSuccess, isError } = useGetHeroImageQuery();
  return {
    heroImage: heroImage?.data?.urls?.full,
  };
};
