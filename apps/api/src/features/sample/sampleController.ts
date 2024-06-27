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

  const toShow = listingsToShow(sample, date);

  const data = listingsFilterAndSort(
    sortBy as string,
    sort as string,
    category as string,
    point,
    toShow,
  );

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
