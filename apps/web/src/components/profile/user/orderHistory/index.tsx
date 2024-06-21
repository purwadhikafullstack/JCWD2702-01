import Loading from '@/app/loading';
import { format, isPast } from 'date-fns';
import { toCurrency } from '@/components/cores/ToCurrency';
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

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useUploadPaymentProof } from '@/features/user/transaction/hooks/useBooking';
import { Badge } from '@/components/ui/badge';
import { useCancelBooking } from '@/features/user/transaction/hooks/useBooking';
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
    <div className="">
      {allBookings
        .sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .map((x: any) => (
          <div className="w-full">
            <div className="text-xs font-medium text-stone-500 flex justify-between">
              <span>ID {x.id}</span>
              <span>{format(new Date(x.created_at), 'yyyy-MM-dd HH:mm')}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <div>Payment method</div>
              <div>Total</div>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <div>{x.payment_type.type}</div>
              <div>{toCurrency(x.total_price)}</div>
            </div>
            {x.booking_statusId === 1 ? (
              <div className="w-full flex gap-2 justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={'outline'}
                      onClick={() => setBookingId(x.id)}
                      size={'sm'}
                    >
                      Cancel booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="pb-3">Cancel booking</DialogTitle>
                      <DialogDescription className="grid gap-3">
                        <div>
                          Cancellation can not be reverted. You must make
                          another booking should you change your mind. Note that
                          room availability is not guaranteed.
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
                    <Button onClick={() => setBookingId(x.id)} size={'sm'}>
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
            ) : (
              <Badge variant={x.status.id === 4 ? 'destructive' : 'default'}>
                {x.status.status}
              </Badge>
            )}
          </div>
        ))}
    </div>
  );
}
