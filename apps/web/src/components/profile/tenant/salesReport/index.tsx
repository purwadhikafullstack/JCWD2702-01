import Loading from '@/app/loading';
import { useGetSalesList } from '@/features/tenant/salesReport/hooks/useGetSales';
import { columns2 } from './sections/columns';
import { DataTable } from './sections/data-table';
import { Suspense } from 'react';
import { useGetMyListings } from '@/features/tenant/profile/hooks/useGetMyListings';

export default function SalesReport() {
  const { allSales } = useGetSalesList();
  const { myListings } = useGetMyListings();
<<<<<<< HEAD
  console.log(allSales);

  if (!allSales) return <Loading />;
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <DataTable listings={myListings} columns={columns2} data={allSales} />
=======

  if (!allSales && !myListings) return <Loading />;
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <DataTable
          listings={myListings.myListing}
          columns={columns2}
          data={allSales}
        />
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
      </Suspense>
    </div>
  );
}
