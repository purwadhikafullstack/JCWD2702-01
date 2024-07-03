'use client';
import { useGetListingById } from '@/features/listings/hooks/useGetListings';
import Loading from '@/app/loading';
import { useSearchParams } from 'next/navigation';
import PropertyPage from '@/components/product_detail/PropertyPage';
export default function Page({ params }: any) {
  const { slug } = params;
  let id = slug.split('-');
  id = id[id.length - 1];

  const queryParams = useSearchParams();
  const { listingById } = useGetListingById({ id });

  if (!listingById) return <Loading />;

  const { sample, imageCollection } = listingById;

  return (
    <PropertyPage
      startDate={queryParams.get('start_date') || ''}
      endDate={queryParams.get('end_date') || ''}
      adults={queryParams.get('adults') || ''}
      kids={queryParams.get('children') || ''}
      data={sample}
      imageCollection={imageCollection}
    />
  );
}
