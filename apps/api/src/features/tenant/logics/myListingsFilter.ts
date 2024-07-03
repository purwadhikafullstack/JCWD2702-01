import { listingsToShow } from '@/features/sample/logics/listingsToShow';
export const myListingsFilter = (
  listings: any[],
  start_date: string,
  end_date: string,
) => {
  const date = {
    start: new Date(start_date),
    end: new Date(end_date),
  };
  const filtered = listingsToShow(listings, date);
};
