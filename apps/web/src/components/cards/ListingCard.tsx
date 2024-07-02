import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { CommentRatings } from '../ui/rating';
interface IListingCard {
  imageUrl: string;
  title: string;
  city: string;
  country: string;
  avgRating: number;
  price: number;
  seasonalPrice?: number | undefined;
  numOfReviews?: number | undefined;
}

export const ListingCard = ({
  imageUrl,
  title,
  city,
  country,
  avgRating,
  price,
  seasonalPrice,
  numOfReviews,
}: IListingCard) => {
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
      <div className="font-bold mt-2 truncate">{title}</div>
      <div className="text-sm font-medium">
        <div className="flex ml-[-5px] text-stone-600 items-center">
          <MapPin className="p-1" /> {city}, {country}
        </div>
        <div className="flex gap-2">
          <div className="flex ml-[-5px] items-center">
            <CommentRatings
              rating={avgRating}
              disabled={true}
              showCurrentRating={false}
            />
          </div>
          <div>{avgRating.toFixed(1)}</div>
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
