import Loading from '@/app/loading';
import { useGetBookingByUser } from '@/features/user/transaction/hooks/useGetBooking';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { useUploadPaymentProof } from '@/features/user/transaction/hooks/useBooking';
import BookingCard from '@/components/cards/BookingCard';
import { useQueryClient } from '@tanstack/react-query';
import { BookingOptions } from './sections/bookingOptions';

export const UploadProofSchema = z.object({
  image_url: z.string(),
});

export default function orderHistory() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [bookingId, setBookingId] = useState('');
  const { allBookings } = useGetBookingByUser(page);
  const { mutationPaymentProof } = useUploadPaymentProof();
  const form = useForm<z.infer<typeof UploadProofSchema>>({
    resolver: zodResolver(UploadProofSchema),
    defaultValues: {
      image_url: '',
    },
  });

  console.log('>>>', page);
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

  const queryClient = useQueryClient();
  if (!allBookings) return <Loading></Loading>;
  return (
    <div className="flex flex-col gap-3">
      {allBookings.map((x: any) => (
        <div className="p-3 rounded-lg border w-full">
          <BookingCard data={x} />
          {x.booking_statusId === 1 && (
            <BookingOptions
              setBookingId={setBookingId}
              bookingId={bookingId}
              form={form}
              onSetFiles={onSetFiles}
              onSubmit={onSubmit}
              images={images}
              data={x}
            />
          )}
        </div>
      ))}
      <div className="w-full flex justify-between">
        <Button
          variant={'outline'}
          disabled={page == 1}
          onClick={() => {
            setPage(Math.max(1, page - 1));
            queryClient.invalidateQueries({ queryKey: ['allBookingDate'] });
          }}
        >
          Prev
        </Button>
        <Button
          disabled={allBookings.length < 6}
          onClick={() => {
            setPage(page + 1);
            queryClient.invalidateQueries({ queryKey: ['allBookingDate'] });
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
