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
<<<<<<< HEAD
import { useSearchParams } from 'next/navigation';
import { listingsToShow } from './logics/filterListings';
import { format } from 'date-fns';
export default function MyListings() {
  // const filterParams = useSearchParams();
=======

export default function MyListings() {
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
<<<<<<< HEAD
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
=======
  const { mutationDeleteListing } = useDeletelisting();
  const [currentPage, setCurrentPage] = useState(1);
  const { myListings } = useGetMyListings(currentPage);
  const router = useRouter();
  const [listings, setListings] = useState<IMyListing[]>([]);
  console.log('myListing', myListings.myListing);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(myListings.totalData / 4);
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853

  useEffect(() => {
    if (myListings) {
      setListings(myListings);
    }
<<<<<<< HEAD
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

=======
  }, [myListings]);

>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
  const handleDeleteListing = async (listingId: string) => {
    try {
      await mutationDeleteListing(listingId);
      setListings(listings.filter((listing) => listing.id !== listingId));
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

<<<<<<< HEAD
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
=======
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex w-full md:justify-end items-center gap-3">
        <div
          className={`${myListings?.myListing?.length === 0 ? 'hidden' : 'flex gap-3'}`}
        >
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
          <SetNonavailability />
          <SetSeasonalPrice />
        </div>
        <Button
<<<<<<< HEAD
          className="h-7"
=======
          className="text-xs md:text-sm h-7"
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
          onClick={() => router.push('/tenant/new-listing')}
        >
          + New Listing
        </Button>
      </div>
      <div>
<<<<<<< HEAD
        {myListings.length > 0 ? (
          <div>
            {currentListings.map((item: any) => (
              <MyListingCard
=======
        {myListings?.myListing?.length > 0 ? (
          <div>
            {myListings?.myListing?.map((item: any, i: number) => (
              <MyListingCard
                key={i}
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
                item={item}
                handleDeleteListing={handleDeleteListing}
              />
            ))}
<<<<<<< HEAD
            <div
              className={`${listings.length >= 2 ? 'flex justify-center items-end gap-4 mt-4' : 'hidden'}`}
            >
              <Button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
=======
            <div className="flex justify-center items-end gap-4 mt-4">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                onClick={() => paginate(currentPage + 1)}
=======
                onClick={() => setCurrentPage(currentPage + 1)}
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
                variant={'ghost'}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
<<<<<<< HEAD
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
=======
          <div className=" flex flex-col p-8 rounded-lg border mt-5 gap-1 items-center justify-center h-full text-stone-400">
            <span className="font-semibold">No listing found</span>
            <span className="text-sm font-medium">
              You have yet to make a property listing
            </span>
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
          </div>
        )}
      </div>
    </div>
  );
}
