import { prisma } from '@/connection';
import { IReply } from './types';

export const getAllReviews = async (uid: string) => {
  const result = await prisma.tenants.findUnique({
    where: {
      usersId: uid,
    },
    include: {
      listings: {
        include: {
          reviews: {
            include: {
              booking: true,
              user: true,
              listing: {
                include: {
                  tenant: true,
                  listing_images: true,
                },
              },
              review_replies: true,
            },
          },
          listing_images: true,
        },
      },
    },
  });

  let reviews: any[] = [];
  result?.listings.map((x: any) => x.reviews.map((y: any) => reviews.push(y)));

  return reviews.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
};

export const newReply = async ({ reply, reviewsId }: IReply) => {
  return await prisma.review_replies.create({
    data: {
      reply,
      reviewsId: Number(reviewsId),
    },
  });
};
