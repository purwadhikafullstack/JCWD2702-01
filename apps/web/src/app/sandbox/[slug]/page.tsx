'use client';
import { useGetListingById } from '@/features/listings/hooks/useGetListings';
import Loading from '@/app/loading';
import HotelPage from '@/components/product_detail/HotelPage';
import PropertyPage from '@/components/product_detail/PropertyPage';
export default function Page({ params }: any) {
  const { slug } = params;
  let id = slug.split('-');
  id = id[id.length - 1];

  const { listingById } = useGetListingById({ id });

  if (!listingById) return <Loading />;

  const { sample, imageCollection } = listingById;
  
  return <HotelPage data={sample} imageCollection={imageCollection} />;
}
