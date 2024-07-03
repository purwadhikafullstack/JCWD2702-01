import { format } from 'date-fns';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { CommentRatings } from '@/components/ui/rating';
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
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
export default function PastStayReviewCard({
  data,
  index,
  form,
  submitHandler,
}: any) {
  return (
    <div className="border rounded-lg grid gap-3 p-3">
      <div key={index} className=" flex gap-3 items-start justify-between ">
        <div className="flex gap-3">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${data.room_type.listing.listing_images[0].image_url}`}
            width={100}
            height={100}
            alt="Listing Image"
            className="rounded-lg"
          />
          <div className="">
            <div className="font-semibold">{data.room_type.listing.title}</div>
            <div className="text-xs font-medium text-stone-600">
              {format(new Date(data.start_date), 'MMM d yyyy')} -{' '}
              {format(new Date(data.end_date), 'MMM d yyyy')}
            </div>
          </div>
        </div>
        {data.reviews.length > 0 ? (
          <Badge variant={'outline'}>Reviewed</Badge>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  form.setValue('bookingsId', data.id);
                  form.setValue('listingsId', data.room_type.listing.id);
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
                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${data.room_type.listing.listing_images[0].image_url}`}
                    width={100}
                    height={100}
                    unoptimized
                    alt="Listing Image"
                    className="rounded-lg w-full h-[200px] object-cover"
                  />
                  <div className="text-sm font-semibold">
                    {data.room_type.listing.title}
                  </div>
                  <div className="text-xs font-semibold text-stone-500">
                    Hosted by {data.room_type.listing.tenant.display_name}
                  </div>
                </div>

                <div className="">
                  <div className="grid gap-3">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(submitHandler)}
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
      <div>
        {data.reviews.length > 0 && (
          <div className="grid gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">Rating:</span>
              <CommentRatings
                rating={data.reviews[0].rating}
                disabled={true}
                showCurrentRating={false}
              ></CommentRatings>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Review:</span>
              {data.reviews[0].review}
            </div>
            {data.reviews[0].review_replies[0] && (
              <div>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full border-none"
                >
                  <AccordionItem value="item-1" className="text-sm border-none">
                    <AccordionTrigger className="m-0 font-semibold p-0 hover:no-underline font-medium text-stone-400">
                      Tenant reply
                    </AccordionTrigger>
                    <AccordionContent className="mt-2 p-0 ">
                      <Separator className="mb-2" />
                      <div className="flex gap-2">
                        <span className="font-semibold">
                          {data.room_type.listing.tenant.display_name}
                        </span>
                        {data.reviews[0].review_replies[0].reply}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
