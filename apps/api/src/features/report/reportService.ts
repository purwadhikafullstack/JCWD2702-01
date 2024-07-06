import { prisma } from '@/connection';

export const getAllSales = async (uid: string) => {
  const sales = await prisma.tenants.findUnique({
    where: {
      usersId: uid,
    },
    include: {
      listings: {
        include: {
          room_types: {
            include: {
              bookings: {
                where: {
                  booking_statusId: 3,
                },
                include: {
                  user: true,
                  payment_type: true,
                  room_type: {
                    include: {
                      listing: {
                        include: {
                          listing_images: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  let salesList = [];
  if (!sales) return 'No Sales';
  for (let listing of sales?.listings) {
    for (let room of listing.room_types) {
      for (let booking of room.bookings) {
        salesList.push({
          id: booking.id,
          display_name: booking.user.display_name,
          total: booking.total_price,
          order_date: booking.created_at,
          payment_type: booking.payment_type.type,
          listing: booking.room_type?.listing,
          details: booking.details,
          booking: booking,
        });
      }
    }
  }

  return salesList;
};
