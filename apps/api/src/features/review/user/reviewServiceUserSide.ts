import { prisma } from '@/connection';
import { isPast } from 'date-fns';
import { IReview } from './types';

export const getAllPastStays = async (uid: string) => {
  const allBookings = await prisma.users.findUnique({
    where: {
      uid,
    },
    include: {
      bookings: {
        include: {
          booking_histories: {
            include: {
              booking: true,
              status: true,
            },
          },
          room_type: {
            include: {
              room_images: true,
              seasonal_prices: true,
              listing: {
                include: {
                  listing_images: true,
                  listing_facilities: true,
                  tenant: true,
                },
              },
            },
          },
          status: true,
          payment_type: true,
          reviews: {
            include: {
              review_replies: true,
            },
          },
        },
      },
    },
  });

  if (allBookings) {
    return allBookings.bookings.filter(
      (x: any) => x.booking_statusId === 3 && isPast(new Date(x.end_date)),
    );
  } else {
    return [];
  }
};

export const newReview = async ({
  bookingsId,
  listingsId,
  usersId,
  rating,
  review,
}: IReview) => {
  await prisma.$transaction(async (prisma) => {
    const newReview = await prisma.reviews.create({
      data: {
        rating: Number(rating),
        review,
        bookingsId,
        listingsId,
        usersId,
      },
    });

    const listing = await prisma.listings.findUnique({
      where: {
        id: listingsId,
      },
      include: {
        room_types: {
          include: {
            bookings: true,
          },
        },
        reviews: true,
      },
    });

    const avg_rating = (
      listing!.reviews.reduce(
        (acc: number, x: any) => acc + Number(x.rating),
        0,
      ) / listing!.reviews.length
    ).toFixed(2);

    await prisma.listings.update({
      where: {
        id: listingsId,
      },
      data: {
        avg_rating: Number(avg_rating),
      },
    });
    
    return newReview;
  });
};
