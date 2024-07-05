import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { CommentRatings } from '../ui/rating';
import { FacilityBadge } from '../cores/FacilityBadge';
import { toCurrency } from '../cores/ToCurrency';
interface IListingCard {
  imageUrl: string;
  title: string;
  city: string;
  country: string;
  avgRating: number;
  price: number;
  seasonalPrice?: number | undefined;
  facilities?: any[];
  price_indexes?: { room_index: number; price_index: number };
}

export const SearchListingCard = ({
  imageUrl,
  title,
  city,
  country,
  avgRating,
  price,
  seasonalPrice,
  facilities,
  price_indexes,
}: IListingCard) => {
  return (
    <Card className="w-full flex p-3 gap-3 rounded-lg">
      <div className="w-[180px] h-[100px]">
        <Image
          src={imageUrl}
          width={100}
          height={100}
          alt="listing"
          unoptimized
          className="w-full object-cover rounded-lg h-full"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col justify-between">
          <div>
            <div className="font-bold truncate min-w-[250px]">{title}</div>
            <div className="text-xs font-medium">
              <div className="flex mb-1 gap-2 text-stone-600 items-center">
                <MapPin className="w-3 h-3" />
                <span className="ml-[-3px]">
                  {city}, {country}
                </span>
              </div>
              <CommentRatings
                rating={avgRating}
                disabled
                showCurrentRating={false}
                size={15}
              />
            </div>
          </div>
          <div className="flex gap-1">
            {facilities
              ?.slice(0, 4)
              .map((x: any, i: number) => (
<<<<<<< HEAD
                <FacilityBadge text={x.facility.facility} icon={false} />
=======
                <FacilityBadge
                  key={i}
                  text={x.facility.facility}
                  icon={false}
                />
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
              ))}
          </div>
        </div>
        <div>
          {seasonalPrice && price < seasonalPrice ? (
            <div className="font-bold">{toCurrency(seasonalPrice)}</div>
          ) : seasonalPrice && price > seasonalPrice ? (
            <div className="flex flex-col items-end">
              <div className="text-sm line-through">{toCurrency(price)}</div>
              <div className="font-bold text-lg text-green-600">
                {toCurrency(seasonalPrice)}
              </div>
            </div>
          ) : (
            <div className="font-bold">{toCurrency(price)}</div>
          )}
        </div>
      </div>
    </Card>
  );
};
