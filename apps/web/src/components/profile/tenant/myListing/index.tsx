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
import { useSearchParams } from 'next/navigation';
import { listingsToShow } from './logics/filterListings';
import { format } from 'date-fns';
export default function MyListings() {
  // const filterParams = useSearchParams();
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  // const [params, setParams] = useState(
  //   new URLSearchParams(Object.fromEntries(filterParams.entries())),
  // );
  const { mutationDeleteListing } = useDeletelisting();
  const { myListings } =
    useGetMyListings();
    // date?.from && date.to
    //   ? `start_date=${format(date.from, 'yyyy-MM-dd')}&end_date=${format(date.to, 'yyyy-MM-dd')}`
    //   : undefined,

  const router = useRouter();
  const [listings, setListings] = useState<IMyListing[]>([]);

  useEffect(() => {
    if (myListings) {
      setListings(myListings);
    }
    // if (date?.from && date.to) {
    //   const filteredListings = listingsToShow(listings, {
    //     start: date.from,
    //     end: date.to,
    //   });
    //   setListings(filteredListings);
    // }
  }, [myListings]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleDeleteListing = async (listingId: string) => {
    try {
      await mutationDeleteListing(listingId);
      setListings(listings.filter((listing) => listing.id !== listingId));
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  // const handleDateAvailabilityFilter = (date: DateRange | undefined) => {
  //   if (date?.from && date.to) {
  //     const currentParams = new URLSearchParams(params);
  //     currentParams.set('start_date', format(date.from, 'yyyy-MM-dd'));
  //     currentParams.set('end_date', format(date.to, 'yyyy-MM-dd'));
  //     window.history.replaceState(null, '', '?' + params.toString());
  //     setParams(currentParams);
  //   }
  // };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListings = listings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(listings.length / itemsPerPage);

  if (!myListings) return <div>Loading...</div>;
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className=" hidden w-full md:flex justify-end items-center gap-3">
        <FilterListing date={date} setDate={setDate} />
        <div className={`${myListings.length === 0 ? 'hidden' : 'flex gap-3'}`}>
          <SetNonavailability />
          <SetSeasonalPrice />
        </div>
        <Button
          className="h-7"
          onClick={() => router.push('/tenant/new-listing')}
        >
          + New Listing
        </Button>
      </div>
      <div>
        {myListings.length > 0 ? (
          <div>
            {currentListings.map((item: any) => (
              <MyListingCard
                item={item}
                handleDeleteListing={handleDeleteListing}
              />
            ))}
            <div
              className={`${listings.length >= 2 ? 'flex justify-center items-end gap-4 mt-4' : 'hidden'}`}
            >
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
        ) : (
          <div className=" flex flex-col gap-1 items-center justify-center h-full text-zinc-500">
            <span className="text-xl font-bold">No listing found</span>
            <span className="text-base">
              You have yet to make a property listing
            </span>
            <span
              className="text-sm border-2 rounded-full px-3 py-1 cursor-pointer"
              onClick={() => router.push('/tenant/new-listing')}
            >
              Create a new listing
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
