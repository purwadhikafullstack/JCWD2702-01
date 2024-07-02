import Loading from '@/app/loading';
import { format, isPast } from 'date-fns';
import { useGetBookingByUser } from '@/features/user/transaction/hooks/useGetBooking';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toCurrency } from '@/components/cores/ToCurrency';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useUploadPaymentProof } from '@/features/user/transaction/hooks/useBooking';
import { Badge } from '@/components/ui/badge';
import { useCancelBooking } from '@/features/user/transaction/hooks/useBooking';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
export const UploadProofSchema = z.object({
  image_url: z.string(),
});

export default function orderHistory() {
  const [images, setImages] = useState([]);
  const [bookingId, setBookingId] = useState('');
  const { allBookings } = useGetBookingByUser();
  const { mutationPaymentProof } = useUploadPaymentProof();
  const { mutationCancelBooking } = useCancelBooking();
  const form = useForm<z.infer<typeof UploadProofSchema>>({
    resolver: zodResolver(UploadProofSchema),
    defaultValues: {
      image_url: '',
    },
  });

  const { isDirty } = form.formState;

  const onSubmit = async (values: z.infer<typeof UploadProofSchema>) => {
    const fd = new FormData();

    if (images) {
      images.forEach((file) => {
        fd.append(`images`, file);
      });
    }

    mutationPaymentProof({ bookingId: bookingId, fd: fd });
  };

  const onSetFiles = (event: any) => {
    try {
      const acceptedFormat = ['jpg', 'jpeg', 'webp', 'png'];
      const files: any = [...event.target.files];

      files.forEach((file: any) => {
        if (
          !acceptedFormat.includes(
            file.name.split('.')[file.name.split('.').length - 1],
          )
        ) {
          throw { message: `${file.name} Format Not Acceptable` };
        }
        if (file.size > 1000000) {
          throw {
            message: `${file.name} is too Large! Maximum Filesize is 1Mb`,
          };
        }
      });

      if (files.length > 1) throw { message: 'Selected Files more than 1' };
      setImages(files);
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!allBookings) return <Loading></Loading>;
  return (
    <div className="flex flex-col gap-3">
      {allBookings
        .sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .map((x: any) => (
          <div className="p-3 rounded-lg border w-full">
            <div className="text-[10px] font-medium text-stone-400 flex justify-between">
              <span>ID {x.id}</span>
              <span>{format(new Date(x.created_at), 'yyyy-MM-dd HH:mm')}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between">
              <div className="grid justify-items-start">
                <div className="text-xs text-stone-600 font-medium">
                  Payment method
                </div>
                <div className="text-sm font-bold">{x.payment_type.type}</div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={'link'}
                      size={'sm'}
                      className="text-xs text-stone-600 font-medium p-0 h-5"
                    >
                      See order details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="pb-3">Order details</DialogTitle>
                      <DialogDescription className="grid text-stone-800 gap-3">
                        <div className="grid gap-3">
                          <div className="text-xs w-full flex justify-between">
                            <p>{x.id}</p>
                            <p>
                              {format(
                                new Date(x.created_at),
                                'yyyy-MM-dd HH:mm',
                              )}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Image
                              src={
                                x.room_type.listing.listing_images[0].image_url
                              }
                              width={100}
                              height={100}
                              alt="listing"
                              unoptimized
                              className="w-[150px] h-[80px] object-cover rounded-lg"
                            />
                            <div>
                              <div className="font-bold">
                                {x.room_type.listing.title}
                              </div>
                              <div className="flex items-center text-xs">
                                <MapPin className="p-1 ml-[-8px]" />
                                <span className="font-medium">
                                  {`${x.room_type.listing.city}, ${x.room_type.listing.country}`}
                                </span>
                              </div>
                              <div className="text-xs">
                                Hosted by{' '}
                                {x.room_type.listing.tenant.display_name}
                              </div>
                            </div>
                          </div>

                          <div className="grid">
                            <div className="flex w-full justify-between">
                              <div>Duration</div>
                              <div className="font-semibold">
                                {format(new Date(x.start_date), 'dd MMMM yyyy')}
                                {' - '}
                                {format(new Date(x.end_date), 'dd MMMM yyyy')}
                              </div>
                            </div>
                            <div className="flex w-full justify-between">
                              <div>Number of guests</div>
                              <div className="font-semibold">
                                {x.num_of_guests}
                              </div>
                            </div>
                            <div className="flex w-full justify-between">
                              <div>Include breakfast</div>
                              <div className="font-semibold">
                                {x.details?.include_breakfast ? 'Yes' : 'No'}
                              </div>
                            </div>
                            <div className="flex w-full justify-between">
                              <div>
                                {x.details?.normal_night +
                                  x.details?.seasonal_night}{' '}
                                night(s)
                              </div>
                              <div className="font-semibold">
                                {toCurrency(
                                  x.details?.normal_price +
                                    x.details?.seasonal_price,
                                )}
                              </div>
                            </div>
                            <div className="flex w-full justify-between">
                              <div>Taxes & Fees</div>
                              <div className="font-semibold">
                                {toCurrency(x.details?.taxes_and_fees)}
                              </div>
                            </div>
                            <div className="flex font-bold w-full justify-between">
                              <div>Total</div>
                              <div>{toCurrency(x.total_price)}</div>
                            </div>
                          </div>
                          {x.details?.breakfast_price &&
                          x.details?.include_breakfast ? (
                            <div>{toCurrency(x.details?.breakfast_price)}</div>
                          ) : null}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex gap-1 flex-col justify-between items-end">
                <div className="text-xs text-stone-600 font-medium">Total</div>
                <div className="text-sm font-bold">
                  {toCurrency(x.total_price)}
                </div>
                <Badge
                  className={`${x.status.id === 4 ? 'bg-red-200' : x.status.id === 3 ? 'bg-green-200' : ''}`}
                  variant={'secondary'}
                >
                  {x.status.status}
                </Badge>
              </div>
            </div>

            {x.booking_statusId === 1 && (
              <div>
                <Separator className="my-3" />
                <div className="w-full flex gap-2 justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={'outline'}
                        onClick={() => setBookingId(x.id)}
                        size={'sm'}
                        className="h-6"
                      >
                        Cancel booking
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="pb-3">
                          Cancel booking
                        </DialogTitle>
                        <DialogDescription className="grid gap-3">
                          <div>
                            Cancellation can not be reverted. You must make
                            another booking should you change your mind. Note
                            that room availability is not guaranteed.
                          </div>
                          <Button
                            onClick={() => mutationCancelBooking(bookingId)}
                            size={'sm'}
                          >
                            Proceed
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setBookingId(x.id)}
                        size={'sm'}
                        className="h-6"
                      >
                        Upload payment proof
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="pb-3">
                          Upload payment proof
                        </DialogTitle>
                        <DialogDescription className="grid gap-3">
                          <div>Make sure your payment proof includes:</div>
                          <ul className="list-disc ml-8">
                            <li>Transfer time & date</li>
                            <li>Transfer success status</li>
                            <li>Recipient detail</li>
                            <li>Transfer amount</li>
                          </ul>
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="w-full"
                            >
                              <FormField
                                control={form.control}
                                name="image_url"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="file"
                                        placeholder={
                                          images
                                            ? JSON.stringify(images)
                                            : 'Upload file'
                                        }
                                        accept="image/*"
                                        {...field}
                                        onChange={(event) => {
                                          onSetFiles(event);
                                          field.onChange(event);
                                        }}
                                        className=" rounded-full"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                className="w-full mt-5 rounded-full"
                                type="submit"
                                disabled={!isDirty}
                              >
                                Upload
                              </Button>
                            </form>
                          </Form>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
