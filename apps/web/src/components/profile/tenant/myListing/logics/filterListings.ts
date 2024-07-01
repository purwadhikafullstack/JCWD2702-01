import { areIntervalsOverlapping } from 'date-fns';

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

  return toShow;
}
