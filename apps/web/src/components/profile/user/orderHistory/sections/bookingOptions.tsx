import { DialogHeader } from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { isDirty } from 'zod';
import { useCancelBooking } from '@/features/user/transaction/hooks/useBooking';

export const BookingOptions = ({
  setBookingId,
  bookingId,
  form,
  onSetFiles,
  onSubmit,
  images,
  data,
}: any) => {
  const { mutationCancelBooking } = useCancelBooking();
  return (
    <div>
      <Separator className="my-3" />
      <div className="w-full flex gap-2 justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'outline'}
              onClick={() => setBookingId(data.id)}
              size={'sm'}
              className="h-6"
            >
              Cancel booking
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="pb-3">Cancel booking</DialogTitle>
              <DialogDescription className="grid gap-3">
                <div>
                  Cancellation can not be reverted. You must make another
                  booking should you change your mind. Note that room
                  availability is not guaranteed.
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
              onClick={() => setBookingId(data.id)}
              size={'sm'}
              className="h-6"
            >
              Upload payment proof
            </Button>
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
      </div>
    </div>
  );
};
