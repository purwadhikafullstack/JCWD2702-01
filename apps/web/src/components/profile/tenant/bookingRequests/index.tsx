import Loading from '@/app/loading';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGetAllTenantBooking } from '@/features/tenant/transaction/hooks/useGetBooking';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useConfirmBooking } from '@/features/tenant/transaction/hooks/useBooking';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import BookingCard from '@/components/cards/BookingCard';
import { useQueryClient } from '@tanstack/react-query';
export default function BookingRequests() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { allBookings } = useGetAllTenantBooking(page);
  const [status, setStatus] = useState(0);
  console.log(page);
  if (!allBookings) return <Loading />;
  return (
    <>
      {allBookings.length > 0 ? (
        <div className="flex flex-col gap-3">
          {allBookings.map((x: any) => (
            <div className="p-3 rounded-lg border w-full">
              <BookingCard data={x} />
              {x.status.id === 2 ? (
                <div className="w-full flex flex-col items-end">
                  <Dialog>
                    <Separator className="my-3" />
                    <DialogTrigger asChild>
                      <Button size={'sm'} className="h-6">
                        See payment proof
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="min-h-[300px]">
                      <DialogHeader>
                        <DialogTitle className="pb-3">
                          Confirm payment
                        </DialogTitle>
                        <DialogDescription className="grid gap-3">
                          {status === 0 ? (
                            <div>
                              <Image
                                src={x.payment_proof}
                                height={80}
                                width={80}
                                alt="Payment Proof"
                                unoptimized
                                className="w-full object-cover rounded-lg"
                              />
                              <div className="flex justify-between py-3">
                                <Button
                                  onClick={() => setStatus(4)}
                                  variant={'destructive'}
                                  className="h-6"
                                >
                                  Cancel
                                </Button>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => setStatus(1)}
                                    variant={'outline'}
                                    className="h-6"
                                  >
                                    Ask to reupload
                                  </Button>
                                  <Button
                                    onClick={() => setStatus(3)}
                                    className="bg-green-600 hover:bg-green-500 h-6"
                                  >
                                    Confirm
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <DialogConfirmation
                              status={status}
                              cb={() => setStatus(0)}
                              data={x}
                            />
                          )}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : null}
            </div>
          ))}
          <div className="w-full flex justify-between">
            <Button
              variant={'outline'}
              disabled={page == 1}
              onClick={() => {
                setPage(Math.max(1, page - 1));
                queryClient.invalidateQueries({
                  queryKey: ['allBookingRequest'],
                });
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
      ) : (
        <div className="text-center font-medium border text-sm  p-12 rounded-lg text-stone-400">
          No incoming bookings
        </div>
      )}
    </>
  );
}

const DialogConfirmation = ({
  status,
  cb,
  data,
}: {
  status: number;
  cb: Function;
  data: any;
}) => {
  const { mutationConfirmBooking } = useConfirmBooking();
  if (status === 3) {
    return (
      <div className="text-center">
        <div>Confirm booking?</div>
        <div>{data.id}</div>
        <Button
          onClick={() => mutationConfirmBooking({ status, bookingId: data.id })}
        >
          Yes
        </Button>
        <Button onClick={() => cb()}>No</Button>
      </div>
    );
  } else if (status === 1) {
    return (
      <div className="text-center">
        <div>Ask customer to reupload picture?</div>
        <Button
          onClick={() => mutationConfirmBooking({ status, bookingId: data.id })}
        >
          Yes
        </Button>
        <Button onClick={() => cb()}>No</Button>
      </div>
    );
  } else if (status === 4) {
    return (
      <div className="text-center">
        <div>Cancel booking?</div>
        <Button
          onClick={() => mutationConfirmBooking({ status, bookingId: data.id })}
        >
          Yes
        </Button>
        <Button onClick={() => cb()}>No</Button>
      </div>
    );
  }
};
