'use client';
import { useGetHeroImage } from '@/features/unsplash/hooks/useGetHeroImage';
import Image from 'next/image';
import SearchBar from '@/components/cores/searchbar/SearchBar';
import { ExploreCity } from './sections/ExploreSection';
import { FeaturedRooms } from './sections/FeaturedSection';
import { WhyRoomer } from './sections/WhySection';
import { Newsletter } from './sections/NewsletterSection';
import { BestDeals } from './sections/PromoSection';
import Loading from '@/app/loading';
export default function LandingPage() {
  const { heroImage } = useGetHeroImage();

  const listing_images = [
    { image_url: '/1b8ba868-7501-4649-87d3-15db8b5348f2.webp' },
  ];
  const seasonal_price = [
    { id: 1, price: 620000 },
    { id: 1, price: 300000 },
  ];

  const rooms = [
    { id: 1, price: 560000, seasonal_price: seasonal_price[0].price },
    { id: 1, price: 560000, seasonal_price: seasonal_price[1].price },
  ];

  const listings = [
    {
      title: 'Accommodation Name',
      city: 'Jakarta',
      country: 'Indonesia',
      avg_rating: 4.8,
      roomId: 0,
      listing_images: listing_images[0].image_url,
    },
    {
      title: 'Accommodation Name',
      city: 'Sydney',
      country: 'Australia',
      avg_rating: 4.8,
      roomId: 1,
      listing_images: listing_images[0].image_url,
    },
    {
      title: 'Accommodation Name',
      city: 'Makassar',
      country: 'Indonesia',
      avg_rating: 4.8,
      roomId: 1,
      listing_images: listing_images[0].image_url,
    },
    {
      title: 'Accommodation Name',
      city: 'Bandung',
      country: 'Indonesia',
      avg_rating: 4.8,
      roomId: 0,
      listing_images: listing_images[0].image_url,
    },
    {
      title: 'Accommodation Name',
      city: 'Phuket',
      country: 'Thailand',
      avg_rating: 4.5,
      roomId: 0,
      listing_images: listing_images[0].image_url,
    },
    {
      title: 'Accommodation Name',
      city: 'Bali',
      country: 'Indonesia',
      avg_rating: 4.7,
      roomId: 1,
      listing_images: listing_images[0].image_url,
    },
    {
      title: 'Accommodation Name',
      city: 'Tokyo',
      country: 'Japan',
      avg_rating: 4.6,
      roomId: 0,
      listing_images: listing_images[0].image_url,
    },
  ];

  if (!heroImage) return <Loading />;
  return (
    <div>
      <div className="w-full overflow-hidden">
        <div className="absolute z-[5] flex flex-col gap-12 items-center justify-center inset-0 h-[85vh] md:h-[70vh]">
          <div className="drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)] font-bold w-[60%] text-3xl w-[50%] lg:w-full text-center text-white">
            Find the accommodation of your next adventure
          </div>
          <SearchBar></SearchBar>
        </div>
        <Image
          src={heroImage}
          width={100}
          height={100}
          alt="Hero Image"
          unoptimized
          priority
          className="w-screen h-[85vh] md:h-[70vh] z-0 object-cover brightness-90 lg:object-center"
        />
      </div>
      <div
        id="bigCard"
        className="relative w-full mt-[-35px] bg-white py-16 z-10 rounded-[30px]"
      >
        <div className="w-[80vw] mx-auto ">
          <ExploreCity></ExploreCity>
          <FeaturedRooms listings={listings} rooms={rooms}></FeaturedRooms>
          <BestDeals></BestDeals>
          <WhyRoomer></WhyRoomer>
        </div>
      </div>
      <Newsletter></Newsletter>
    </div>
  );
}
