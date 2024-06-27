import { areIntervalsOverlapping } from 'date-fns';
import { nearToFar } from './haversine';

export function listingsToShow(
  allListings: any[],
  date: { start: Date; end: Date },
) {
  let toShow: any[] = [];
  for (let listing of allListings) {
    const available_rooms = [];
    for (let x of listing.room_types) {
      let isBookOverlap;
      let isNonavOverlap;
      const bookCheck = [];
      if (!x.nonavailability.length) {
        isNonavOverlap = false;
      } else {
        for (let nonav of x.nonavailability) {
          const nonavRange = {
            start: new Date(nonav.start_date),
            end: new Date(nonav.end_date),
          };
          isNonavOverlap = areIntervalsOverlapping(date, nonavRange);
        }
      }

      if (!x.bookings.length) {
        isBookOverlap = false;
      } else {
        for (let book of x.bookings) {
          const bookRange = {
            start: new Date(book.start_date),
            end: new Date(book.end_date),
          };

          if (book.status.id < 4) {
            const bookOverlap = areIntervalsOverlapping(date, bookRange);
            if (bookOverlap) {
              bookCheck.push(bookOverlap);
            }
          }
        }
        isBookOverlap = x.stock - bookCheck.length > 0 ? false : true;
      }
      if (!isNonavOverlap && !isBookOverlap) {
        available_rooms.push(true);
      } else {
        available_rooms.push(false);
      }
    }
    if (available_rooms.includes(true)) toShow.push(listing);
  }

  for (let listing of toShow) {
    for (let room of listing.room_types) {
      for (let seasonal_price of room.seasonal_prices) {
        const seasonal_priceRange = {
          start: new Date(seasonal_price.start_date),
          end: new Date(seasonal_price.end_date),
        };
        const hasSeasonalPrice = areIntervalsOverlapping(
          date,
          seasonal_priceRange,
        );
        if (hasSeasonalPrice) {
          const price_indexes = {
            room_index: listing.room_types.indexOf(room),
            price_index: room.seasonal_prices.indexOf(seasonal_price),
          };
          listing.price_indexes = price_indexes;
        }
      }
    }
  }
  return toShow;
}

export const listingsFilterAndSort = (
  sortBy: string | undefined,
  sort: string | undefined,
  category: string | undefined,
  point: { lat: number; lng: number },
  input: any[],
) => {
  let data;
  data = nearToFar(point, input);

  if (sortBy && sortBy === 'price') {
    if (sort === 'asc') {
      data = data.sort(
        (a: any, b: any) =>
          (a.price_indexes
            ? Number(
                a.room_types[a.price_indexes.room_index].seasonal_prices[
                  a.price_indexes.price_index
                ].price,
              )
            : a.room_types[0].price) -
          (b.price_indexes
            ? Number(
                b.room_types[b.price_indexes.room_index].seasonal_prices[
                  b.price_indexes.price_index
                ].price,
              )
            : b.room_types[0].price),
      );
    } else {
      data = data.sort(
        (a: any, b: any) =>
          (b.price_indexes
            ? Number(
                b.room_types[b.price_indexes.room_index].seasonal_prices[
                  b.price_indexes.price_index
                ].price,
              )
            : b.room_types[0].price) -
          (a.price_indexes
            ? Number(
                a.room_types[a.price_indexes.room_index].seasonal_prices[
                  a.price_indexes.price_index
                ].price,
              )
            : a.room_types[0].price),
      );
    }
  } else if (sortBy && sortBy === 'name') {
    if (sort === 'dsc') {
      data = data.sort((a: any, b: any) => b.title.localeCompare(a.title));
    } else {
      data = data.sort((a: any, b: any) => a.title.localeCompare(b.title));
    }
  } else {
    data = nearToFar(point, data);
  }

  if (category) {
    data = data.filter((x) => x.categoriesId === Number(category));
  }

  return data;
};
