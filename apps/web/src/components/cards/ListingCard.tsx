import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

interface IListingCard {
  imageUrl: string;
  title: string;
  city: string;
  country: string;
  avgRating: number;
  price: number;
  seasonalPrice?: number | undefined;
}

export const ListingCard = ({
  imageUrl,
  title,
  city,
  country,
  avgRating,
  price,
  seasonalPrice,
}: IListingCard) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 ms-1 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>,
      );
    }
    return stars;
  };

  return (
    <Card className="w-[100%] p-3 rounded-lg">
      <Image
        src={imageUrl}
        width={100}
        height={100}
        alt="listing"
        unoptimized
        className="w-full object-cover rounded-lg h-[150px]"
      />
      <div className="font-bold mt-2">{title}</div>
      <div className="text-sm font-medium">
        <div className="flex ml-[-5px] text-stone-600 items-center">
          <MapPin className="p-1" /> {city}, {country}
        </div>
        <div className="flex gap-3">
          <div className="flex ml-[-5px] items-center">
            {renderStars(avgRating)}
          </div>
          <div>({avgRating})</div>
        </div>
      </div>
      <div className="mt-2">
        {seasonalPrice && price < seasonalPrice ? (
          <div className="font-bold">
            {seasonalPrice.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </div>
        ) : seasonalPrice && price > seasonalPrice ? (
          <div className="flex gap-2">
            <div className="text-sm line-through">
              {price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </div>
            <div className="font-bold text-rose-600">
              {seasonalPrice.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </div>
          </div>
        ) : (
          <div className="font-bold">
            {price.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </div>
        )}
      </div>
    </Card>
  );
};
