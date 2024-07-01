import Loading from '@/app/loading';
import { useGetSalesList } from '@/features/tenant/salesReport/hooks/useGetSales';
import { columns2 } from './sections/columns';
import { DataTable } from './sections/data-table';
import { Suspense } from 'react';
import { useGetMyListings } from '@/features/tenant/profile/hooks/useGetMyListings';

export default function SalesReport() {
  const { allSales } = useGetSalesList();
  const { myListings } = useGetMyListings();
  console.log(allSales);

  if (!allSales) return <Loading />;
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <DataTable listings={myListings} columns={columns2} data={allSales} />
      </Suspense>
    </div>
  );
}
