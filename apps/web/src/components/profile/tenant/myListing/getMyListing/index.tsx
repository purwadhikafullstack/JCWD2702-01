import { useGetMyListings } from '@/features/tenant/profile/hooks/useGetMyListings';
import Image from 'next/image';
import { useDeletelisting } from '@/features/listings/hooks/useDeleteListing';
import { useState, useEffect } from 'react';
import { IMyListing, ISelectedListing } from '../type';
import { Button } from '@/components/ui/button';

export default function GetMyListings({ onSelectListing }: ISelectedListing) {
  const { myListings } = useGetMyListings();
  const [listings, setListings] = useState<IMyListing[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListings = listings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(listings.length / itemsPerPage);

  useEffect(() => {
    if (myListings) {
      setListings(myListings);
    }
  }, [myListings]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {currentListings ? (
        currentListings.map((item: any) => (
          <div
            key={item.id}
            className="h-auto w-full bg-transparent shadow-lg rounded-xl"
            onClick={() => onSelectListing(item)}
          >
            <div className="w-full h-44 flex justify-around gap-4 p-3 cursor-pointer">
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
                <div className="text-lg text-pretty font-bold text-black">
                  {item.title}
                </div>
                <div className="text-xs text-pretty">
                  {`${item.city} ${item.country}`}
                </div>
                <div className="text-base font-semibold pt-3 text-black">
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
      <div className="flex justify-center gap-4 mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          variant={'ghost'}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            variant={'ghost'}
            className={currentPage === index + 1 ? ' text-zinc-400' : ''}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
          variant={'ghost'}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
