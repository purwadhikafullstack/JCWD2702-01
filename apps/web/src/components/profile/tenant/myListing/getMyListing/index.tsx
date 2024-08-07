import { useGetMyListings } from '@/features/tenant/profile/hooks/useGetMyListings';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IMyListing, ISelectedListing } from '../type';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function GetMyListings({ onSelectListing }: ISelectedListing) {
  const [currentPage, setCurrentPage] = useState(1);
  const { myListings } = useGetMyListings(currentPage);

  const totalPages = Math.ceil((myListings?.totalData ?? 0) / 4);

  const handleBack = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {myListings ? (
          myListings?.myListing?.map((item: any) => (
            <div
              key={item.id}
              className="h-auto w-full bg-transparent shadow-lg rounded-xl"
              onClick={() => onSelectListing(item)}
            >
              <div className="w-full h-44 flex flex-col sm:flex-row justify-around gap-4 p-3 cursor-pointer">
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
                <div className="flex-initial w-full sm:w-60 grow flex flex-col gap-1">
                  <div className="text-pretty font-bold text-black">
                    {item.title}
                  </div>
                  <div className="text-xs text-pretty">
                    {`${item.city}, ${item.country}`}
                  </div>
                  <div className="text-sm font-semibold pt-3 text-black">
                    {item.room_types[0].price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}{' '}
                    / night
                  </div>
                  <div className="flex items-end gap-1 text-xs h-full">
                    {item.listing_facilities ? (
                      <>
                        {item.listing_facilities
                          .slice(0, 3)
                          .map((facilities: any) => (
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
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={handleBack}
          variant={'ghost'}
        >
          Previous
        </Button>
        <Button
          disabled={currentPage === totalPages}
          onClick={handleNext}
          variant={'ghost'}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
