import Loading from '@/app/loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useGetPastStays } from '@/features/user/review/hooks/useGetReview';
import { Textarea } from '@/components/ui/textarea';
import { CommentRatings } from '@/components/ui/rating';
import Image from 'next/image';
import { format } from 'date-fns';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { isDirty, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePostReview } from '@/features/user/review/hooks/useReview';
import { Badge } from '@/components/ui/badge';
export const ReviewSchema = z.object({
  rating: z.number(),
  review: z
    .string()
    .min(10, { message: 'Review must be at least 10 characters long.' }),
  listingsId: z.string(),
  bookingsId: z.string(),
});

export default function myReviews() {
  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
      review: '',
      listingsId: '',
      bookingsId: '',
    },
  });
  const { pastStays } = useGetPastStays();
  const { mutationPostReview } = usePostReview();
  if (!pastStays) return <Loading></Loading>;
  return (
    <div className="">
      {pastStays &&
        pastStays?.map((x: any, i: number) => (
          <div
            key={i}
            className="p-3 flex gap-3 items-start justify-between border rounded-lg"
          >
            <div className="flex gap-3">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${x.room_type.listing.listing_images[0].image_url}`}
                width={100}
                height={100}
                alt="Listing Image"
                className="rounded-lg"
              />
              <div className="">
                <div className="font-semibold">{x.room_type.listing.title}</div>
                <div className="text-xs font-medium text-stone-600">
                  {format(new Date(x.start_date), 'MMM d yyyy')} -{' '}
                  {format(new Date(x.end_date), 'MMM d yyyy')}
                </div>
              </div>
            </div>
            {x.reviews.length > 0 ? (
              <Badge variant={'outline'}>Reviewed</Badge>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      form.setValue('bookingsId', x.id);
                      form.setValue('listingsId', x.room_type.listing.id);
                    }}
                    size={'sm'}
                  >
                    Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add a review</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${x.room_type.listing.listing_images[0].image_url}`}
                        width={100}
                        height={100}
                        unoptimized
                        alt="Listing Image"
                        className="rounded-lg w-full h-[200px] object-cover"
                      />
                      <div className="text-sm font-semibold">
                        {x.room_type.listing.title}
                      </div>
                      <div className="text-xs font-semibold text-stone-500">
                        Hosted by {x.room_type.listing.tenant.display_name}
                      </div>
                    </div>

                    <div className="">
                      <div className="grid gap-3">
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(
                              async (values: z.infer<typeof ReviewSchema>) => {
                                try {
                                  await mutationPostReview(values);
                                  form.reset({ rating: 0 });
                                } catch (error) {
                                  console.log(error);
                                }
                              },
                            )}
                            className="w-full grid gap-3"
                          >
                            <FormField
                              control={form.control}
                              name="rating"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <CommentRatings
                                      id="rating"
                                      totalStars={5}
                                      size={24}
                                      rating={0}
                                      onRatingChange={(rating: number) =>
                                        form.setValue('rating', rating)
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="review"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder="How was your experience staying here?"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              className="w-full mt-5 rounded-full"
                              type="submit"
                              disabled={form.watch('rating') == 0}
                            >
                              Send review
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        ))}
    </div>
  );
}
