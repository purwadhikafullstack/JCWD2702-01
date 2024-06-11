import { Request, Response } from 'express';
import prisma from '@/prisma';
import { areIntervalsOverlapping } from 'date-fns';

export class SampleController {
  async getSampleData(req: Request, res: Response) {
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
  }

  async getSampleDataById(req: Request, res: Response) {
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
  }

  async getSampleDataByQuery(req: Request, res: Response) {
    const { start, end } = req.query;

    const date = {
      start: new Date(start as string),
      end: new Date(end as string),
    };

    const sample = await prisma.room_types.findMany({
      include: {
        bookings: {
          include: {
            status: true,
          },
        },
        nonavailability: true,
        seasonal_prices: true,
      },
    });

    if (!sample) {
      return res.send(404);
    }

    const toShow = [];

    for (let x of sample) {
      let isBookOverlap;
      let isNonavOverlap;
      const bookCheck = [];

      console.log(x);
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
        console.log('Bookcheck result', bookCheck);
        isBookOverlap = x.stock - bookCheck.length > 0 ? false : true;
      }

      // for (let book of x.bookings) {
      //   if (!room.bookings.length) {
      //     roomCheck.push(false);
      //   } else {
      //     for (let book of room.bookings) {
      //       if (book.status.id < 4) {
      //         const roomOverlap = areIntervalsOverlapping(date, {
      //           start: new Date(book.start_date),
      //           end: new Date(book.end_date),
      //         });
      //         roomCheck.push(roomOverlap);
      //       }
      //     }
      //   }

      //   console.log('room check ? >', roomCheck);
      //   isBookOverlap = !roomCheck.some((x) => x === false);
      // }

      if (!isNonavOverlap && !isBookOverlap) toShow.push(x);
    }

    return res.status(200).send({
      sample,
      toShow,
    });
  }
}
