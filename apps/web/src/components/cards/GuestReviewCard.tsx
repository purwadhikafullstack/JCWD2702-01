import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CommentRatings } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { isDirty, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostReply } from '@/features/tenant/review/hooks/useReview';

export function GuestReviewCard({ review, id, isTenant }: any) {
  const { mutationPostReply } = usePostReply();
  const reviewed = review.review_replies.length;
  const ReplySchema = z.object({
    reply: z.string(),
    reviewsId: z.string(),
  });

  const form = useForm<z.infer<typeof ReplySchema>>({
    resolver: zodResolver(ReplySchema),
    defaultValues: {
      reply: '',
      reviewsId: String(id),
    },
  });

  return (
    <div className="p-3 border rounded-lg mb-3">
      <div className="grid gap-3">
        <div className="text-sm font-semibold text-foreground-muted">
          {review?.user?.display_name} {review?.created_at}
        </div>
        <CommentRatings
          size={15}
          showCurrentRating={false}
          rating={review.rating}
          disabled
        />
        <div>{review.review}</div>
      </div>
      {isTenant ? (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="m-0 p-0 hover:no-underline font-medium text-stone-600">
              <Separator className="my-2" />
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src={`${review?.listing?.listing_images[0].image_url}`}
                    width={30}
                    height={30}
                    alt="Listing Image"
                    className="rounded"
                  />
                  <div className="text-xs">{review.listing.title}</div>
                </div>
                <div className="px-2 text-sm font-semibold">Reply</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="mt-2 p-0 ">
              {reviewed ? (
                <p className="text-xs font-medium text-foreground-muted">
                  <span className="font-semibold">Your reply:</span>{' '}
                  <span className="italic">
                    {review?.review_replies[0].reply}
                  </span>
                </p>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(
                      async (values: z.infer<typeof ReplySchema>) => {
                        try {
                          await mutationPostReply(values);
                          form.reset();
                        } catch (error) {
                        }
                      },
                    )}
                    className="w-full flex flex-col items-end gap-3"
                  >
                    <FormField
                      control={form.control}
                      name="reply"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Textarea {...field} placeholder="Write a reply" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size={'sm'} disabled={!isDirty}>
                      Send reply
                    </Button>
                  </form>
                </Form>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        review.review_replies[0] && (
          <div>
            <Separator className="my-2" />
            <p className="text-xs text-foreground-muted">
              <span className="font-semibold">
                {review.listing?.tenant?.display_name}
              </span>{' '}
              <span>{review.review_replies[0]?.reply}</span>
            </p>
          </div>
        )
      )}
    </div>
  );
}
