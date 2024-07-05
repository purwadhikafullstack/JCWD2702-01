import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { isDirty } from 'zod';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadProofSchema } from '../profile/user/orderHistory';
import { useState } from 'react';
import { useUploadPaymentProof } from '@/features/user/transaction/hooks/useBooking';

export default function UploadBookingButton({ bookingId }: any) {
  const [images, setImages] = useState([]);
  const { mutationPaymentProof } = useUploadPaymentProof();
  const form = useForm<z.infer<typeof UploadProofSchema>>({
    resolver: zodResolver(UploadProofSchema),
    defaultValues: {
      image_url: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UploadProofSchema>) => {
    const fd = new FormData();

    if (images) {
      images.forEach((file: any) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload payment proof</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3">Upload payment proof</DialogTitle>
          <DialogDescription className="grid gap-3">
            <div>Make sure your payment proof includes:</div>
            <ul className="list-disc ml-8">
              <li>Transfer time & date</li>
              <li>Transfer success status</li>
              <li>Recipient detail</li>
              <li>Transfer amount</li>
            </ul>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          placeholder={
                            images ? JSON.stringify(images) : 'Upload file'
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
  );
}
