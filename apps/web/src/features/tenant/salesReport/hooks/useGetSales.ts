import { useGetSalesQuery } from '../api/useSalesQuery';

export const useGetSalesList = () => {
  const { data: allSales, isSuccess, isError } = useGetSalesQuery();
  return {
    allSales: allSales?.data.data || [],
  };
};
