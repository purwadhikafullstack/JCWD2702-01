import { DeleteListing } from '../profile/tenant/myListing/deleteListing';
import Image from 'next/image';
import { UpdateListing } from '../profile/tenant/myListing/updateListing';
import { MapPin } from 'lucide-react';
import { toCurrency } from '../cores/ToCurrency';
export const MyListingCard = ({ item, handleDeleteListing }: any) => {
  console.log(item);
  item.listing_images[0].image_url &&
    console.log(item.listing_images[0].image_url, 'ADA');

  return (
    <div
      key={item.id}
      className="h-auto mb-3 w-full bg-transparent shadow-sm border rounded-xl"
    >
      <div className="w-full h-44 flex justify-around gap-4 p-3">
        <div className="flex-1 rounded-xl relative">
          <Image
            src={item.listing_images[0].image_url.replace('api//', 'api/')}
            fill={true}
            alt="picture"
            className="rounded-xl"
            layout={'fill'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex-initial w-60 grow flex flex-col gap-1">
          <div className="text-lg text-pretty font-bold">{item.title}</div>
          <div className="flex items-center text-xs gap-1 text-pretty">
            <MapPin className="h-3 w-3 text-stone-400" />
            {`${item.city}, ${item.country}`}
          </div>
          <div className="text-base font-semibold">
            {toCurrency(item.room_types[0].price)} / night
          </div>
          <div className="flex items-end gap-1 text-xs h-full">
            {item.listing_facilities ? (
              <>
                {item.listing_facilities.slice(0, 3).map((facilities: any) => (
                  <div
                    key={facilities.facility.id}
                    className="bg-zinc-100 rounded-xl px-3"
                  >
                    {facilities.facility.facility}
                  </div>
                ))}
                {item.listing_facilities.length > 3 && (
                  <div className="bg-zinc-100 rounded-xl px-3">
                    {`+${item.listing_facilities.length - 3}`}
                  </div>
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="flex items-start">
          <UpdateListing item={item} />
          <DeleteListing
            handleDeleteListing={handleDeleteListing}
            item={item}
          />
        </div>
      </div>
    </div>
  );
};
