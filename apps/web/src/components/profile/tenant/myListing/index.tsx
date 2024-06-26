import { useGetMyListings } from '@/features/tenant/profile/hooks/useGetMyListings';
import { useDeletelisting } from '@/features/listings/hooks/useDeleteListing';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IMyListing } from './type';
import SetSeasonalPrice from './setSeasonalPrice';
import SetNonavailability from './setNonavailability';
import { MyListingCard } from '@/components/cards/MyListingCard';

export default function MyListings() {
  const { mutationDeleteListing } = useDeletelisting();
  const { myListings } = useGetMyListings();
  const router = useRouter();
  const [listings, setListings] = useState<IMyListing[]>([]);

  useEffect(() => {
    if (myListings) {
      setListings(myListings);
    }
  }, [myListings]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handleDeleteListing = async (listingId: string) => {
    try {
      await mutationDeleteListing(listingId);
      setListings(listings.filter((listing) => listing.id !== listingId));
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListings = listings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(listings.length / itemsPerPage);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className=" hidden w-full md:flex justify-end items-center gap-3">
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
