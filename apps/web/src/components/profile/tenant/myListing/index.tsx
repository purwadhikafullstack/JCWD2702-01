import { useGetMyListings } from '@/features/tenant/profile/hooks/useGetMyListings';
import { useDeletelisting } from '@/features/listings/hooks/useDeleteListing';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IMyListing } from './type';
import SetSeasonalPrice from './setSeasonalPrice';
import SetNonavailability from './setNonavailability';
import { MyListingCard } from '@/components/cards/MyListingCard';
import FilterListing from './filterListing';
import { DateRange } from 'react-day-picker';

export default function MyListings() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const { mutationDeleteListing } = useDeletelisting();
  const [currentPage, setCurrentPage] = useState(1);
  const { myListings } = useGetMyListings(currentPage);
  const router = useRouter();
  const [listings, setListings] = useState<IMyListing[]>([]);
  console.log('myListing', myListings.myListing);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(myListings.totalData / 4);

  useEffect(() => {
    if (myListings) {
      setListings(myListings);
    }
  }, [myListings]);

  const handleDeleteListing = async (listingId: string) => {
    try {
      await mutationDeleteListing(listingId);
      setListings(listings.filter((listing) => listing.id !== listingId));
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex w-full md:justify-end items-center gap-3">
        <div
          className={`${myListings?.myListing?.length === 0 ? 'hidden' : 'flex gap-3'}`}
        >
          <SetNonavailability />
          <SetSeasonalPrice />
        </div>
        <Button
          className="text-xs md:text-sm h-7"
          onClick={() => router.push('/tenant/new-listing')}
        >
          + New Listing
        </Button>
      </div>
      <div>
        {myListings?.myListing?.length > 0 ? (
          <div>
            {myListings?.myListing?.map((item: any, i: number) => (
              <MyListingCard
                key={i}
                item={item}
                handleDeleteListing={handleDeleteListing}
              />
            ))}
            <div className="flex justify-center items-end gap-4 mt-4">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
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
                onClick={() => setCurrentPage(currentPage + 1)}
                variant={'ghost'}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col p-8 rounded-lg border mt-5 gap-1 items-center justify-center h-full text-stone-400">
            <span className="font-semibold">No listing found</span>
            <span className="text-sm font-medium">
              You have yet to make a property listing
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
