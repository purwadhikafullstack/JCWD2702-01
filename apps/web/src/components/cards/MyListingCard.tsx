import { DeleteListing } from '../profile/tenant/myListing/deleteListing';
import Image from 'next/image';
import { UpdateListing } from '../profile/tenant/myListing/updateListing';

export const MyListingCard = ({ item, handleDeleteListing }: any) => {
  return (
    <div
      key={item.id}
      className="h-auto w-full bg-transparent shadow-lg rounded-xl"
    >
      <div className="w-full h-44 flex justify-around gap-4 p-3">
        <div className="flex-1 rounded-xl relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${item.listing_images[0].image_url}`}
            fill={true}
            alt="picture"
            className="rounded-xl"
            layout={'fill'}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="flex-initial w-60 grow flex flex-col gap-1">
          <div className="text-lg text-pretty font-bold">{item.title}</div>
          <div className="text-xs text-pretty">
            {`${item.city} ${item.country}`}
          </div>
          <div className="text-base font-semibold pt-3">
            {item.room_types[0].price.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}{' '}
            / night
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
        <div className="flex-none flex justify-around gap-2">
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
