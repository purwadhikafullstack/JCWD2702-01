import { NextFunction, Request, Response } from 'express';
import { prisma } from '@/connection';
import { areIntervalsOverlapping } from 'date-fns';
import { getCategoryData, getFacilitiesData } from './sampleService';
import { nearToFar } from './logics/haversine';
import { listingsToShow, listingsFilterAndSort } from './logics/listingsToShow';
export const getSampleData = async (req: Request, res: Response) => {
  const sampleData = await prisma.listings.findMany({
    include: {
      listing_facilities: true,
      listing_images: true,
      room_types: {
        include: {
          room_facilities: true,
          room_images: true,
          seasonal_prices: true,
          bookings: {
            include: {
              status: true,
            },
          },
        },
      },
    },
  });

  return res.status(200).send({ listings: sampleData });
};

export const getSampleDataById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const sample = await prisma.listings.findUnique({
    where: { id },
    include: {
      tenant: true,

      category: true,
      listing_facilities: {
        include: {
          facility: true,
        },
      },
      listing_images: true,
      reviews: {
        include: {
          listing: {
            include: {
              listing_images: true,
              tenant: true,
            },
          },
          user: true,
          review_replies: true,
        },
      },
      room_types: {
        include: {
          room_facilities: true,
          room_images: true,
          seasonal_prices: true,
          bookings: {
            include: {
              status: true,
            },
          },
          nonavailability: true,
        },
      },
    },
  });

  if (!sample) {
    return res.send(404);
  }

  const imageCollection = [];
  for (let image of sample?.listing_images) {
    imageCollection.push(image.image_url);
  }

  for (let room of sample.room_types) {
    for (let image of room.room_images) {
      imageCollection.push(image.image_url);
    }
  }

  return res.status(200).send({ sample, imageCollection });
};

export const getRoomTypeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const room = await prisma.room_types.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      room_images: true,
    },
  });

  const image = await prisma.listings.findUnique({
    where: {
      id: room?.listingsId,
    },
    include: {
      listing_images: true,
    },
  });

  return res.status(200).send({ room, image });
};

export const getSampleDataByQuery = async (req: Request, res: Response) => {
  const {
    lat,
    lng,
    country,
    city,
    start_date,
    end_date,
    children,
    adults,
    pets,
    min_price,
    max_price,
    category,
    sortBy,
    sort,
  } = req.query;

  const date = {
    start: new Date(start_date as string),
    end: new Date(end_date as string),
  };

  const point = {
    lat: Number(lat),
    lng: Number(lng),
  };

  const sample = await prisma.listings.findMany({
    where: {
      country: country as string,
    },
    include: {
      room_types: {
        where: {
          capacity: {
            gte: Number(children) + Number(adults),
          },
        },
        include: {
          bookings: {
            include: {
              status: true,
            },
          },
          nonavailability: true,
          seasonal_prices: true,
        },
      },
      listing_images: true,
      listing_facilities: {
        include: {
          facility: true,
        },
      },
    },
  });

  if (!sample) {
    return res.send(404);
  }

  // const toShow: any[] = [];

  // for (let listing of sample) {
  //   const available_rooms = [];
  //   for (let x of listing.room_types) {
  //     let isBookOverlap;
  //     let isNonavOverlap;
  //     const bookCheck = [];
  //     if (!x.nonavailability.length) {
  //       isNonavOverlap = false;
  //     } else {
  //       for (let nonav of x.nonavailability) {
  //         const nonavRange = {
  //           start: new Date(nonav.start_date),
  //           end: new Date(nonav.end_date),
  //         };
  //         isNonavOverlap = areIntervalsOverlapping(date, nonavRange);
  //       }
  //     }

  //     if (!x.bookings.length) {
  //       isBookOverlap = false;
  //     } else {
  //       for (let book of x.bookings) {
  //         const bookRange = {
  //           start: new Date(book.start_date),
  //           end: new Date(book.end_date),
  //         };

  //         if (book.status.id < 4) {
  //           const bookOverlap = areIntervalsOverlapping(date, bookRange);
  //           if (bookOverlap) {
  //             bookCheck.push(bookOverlap);
  //           }
  //         }
  //       }
  //       isBookOverlap = x.stock - bookCheck.length > 0 ? false : true;
  //     }
  //     if (!isNonavOverlap && !isBookOverlap) {
  //       available_rooms.push(true);
  //     } else {
  //       available_rooms.push(false);
  //     }
  //   }
  //   if (available_rooms.includes(true)) toShow.push(listing);
  // }

  // for (let listing of toShow) {
  //   for (let room of listing.room_types) {
  //     for (let seasonal_price of room.seasonal_prices) {
  //       const seasonal_priceRange = {
  //         start: new Date(seasonal_price.start_date),
  //         end: new Date(seasonal_price.end_date),
  //       };
  //       const hasSeasonalPrice = areIntervalsOverlapping(
  //         date,
  //         seasonal_priceRange,
  //       );
  //       if (hasSeasonalPrice) {
  //         const price_indexes = {
  //           room_index: listing.room_types.indexOf(room),
  //           price_index: room.seasonal_prices.indexOf(seasonal_price),
  //         };
  //         listing.price_indexes = price_indexes;
  //       }
  //     }
  //   }
  // }
  const toShow = listingsToShow(sample, date);

  // let data;
  // data = nearToFar(point, toShow);

  // if (sortBy && sortBy === 'price') {
  //   if (sort === 'asc') {
  //     data = data.sort(
  //       (a: any, b: any) =>
  //         (a.price_indexes
  //           ? Number(
  //               a.room_types[a.price_indexes.room_index].seasonal_prices[
  //                 a.price_indexes.price_index
  //               ].price,
  //             )
  //           : a.room_types[0].price) -
  //         (b.price_indexes
  //           ? Number(
  //               b.room_types[b.price_indexes.room_index].seasonal_prices[
  //                 b.price_indexes.price_index
  //               ].price,
  //             )
  //           : b.room_types[0].price),
  //     );
  //   } else {
  //     data = data.sort(
  //       (a: any, b: any) =>
  //         (b.price_indexes
  //           ? Number(
  //               b.room_types[b.price_indexes.room_index].seasonal_prices[
  //                 b.price_indexes.price_index
  //               ].price,
  //             )
  //           : b.room_types[0].price) -
  //         (a.price_indexes
  //           ? Number(
  //               a.room_types[a.price_indexes.room_index].seasonal_prices[
  //                 a.price_indexes.price_index
  //               ].price,
  //             )
  //           : a.room_types[0].price),
  //     );
  //   }
  // } else if (sortBy && sortBy === 'name') {
  //   if (sort === 'dsc') {
  //     data = data.sort((a: any, b: any) => b.title.localeCompare(a.title));
  //   } else {
  //     data = data.sort((a: any, b: any) => a.title.localeCompare(b.title));
  //   }
  // } else {
  //   data = nearToFar(point, data);
  // }

  // if (category) {
  //   data = toShow.filter((x) => x.categoriesId === Number(category));
  // }

  const data = listingsFilterAndSort(sortBy as string, sort as string, category as string, point, toShow);

  return res.status(200).send({
    data: data,
    toShowLength: toShow.length,
  });
};

export const categoryData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categoryData = await getCategoryData();
  res.status(200).send({
    error: false,
    message: 'Success',
    data: categoryData,
  });
};

export const facilitiesData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const facilitiesData = await getFacilitiesData();
  res.status(200).send({
    error: false,
    message: 'Success',
    data: facilitiesData,
  });
};
