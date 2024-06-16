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
import { Badge } from '@/components/ui/badge';
export default function BookingRequests() {
  const { allBookings } = useGetAllTenantBooking();
  const [status, setStatus] = useState(0);

  const bookings = allBookings[0];
  if (!allBookings || allBookings.length === 0) return <Loading />;
  console.log(bookings);
  console.log(allBookings);
  return (
    <div className="md:w-96">
      {allBookings[0]
        .sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .map((x: any) => (
          <div className="text-sm">
            <div className="text-xs font-medium text-stone-600">ID {x.id}</div>
            <Badge variant={'outline'}>{x.status.status}</Badge>
            {x.status.id === 2 ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>See payment proof</Button>
                </DialogTrigger>
                <DialogContent className="min-h-[300px]">
                  <DialogHeader>
                    <DialogTitle className="pb-3">Confirm payment</DialogTitle>
                    <DialogDescription className="grid gap-3">
                      {status === 0 ? (
                        <div>
                          <Image
                            src={x.payment_proof}
                            height={100}
                            width={100}
                            alt="Payment Proof"
                            unoptimized
                            className="w-full object-cover"
                          />
                          <div className="flex justify-between">
                            <Button
                              onClick={() => setStatus(4)}
                              variant={'destructive'}
                            >
                              Cancel
                            </Button>
                            <div>
                              <Button
                                onClick={() => setStatus(1)}
                                variant={'outline'}
                              >
                                Ask to reupload
                              </Button>
                              <Button
                                onClick={() => setStatus(3)}
                                className="bg-green-600 hover:bg-green-500"
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
            ) : null}
          </div>
        ))}
    </div>
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
