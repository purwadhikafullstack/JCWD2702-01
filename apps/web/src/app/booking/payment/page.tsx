'use client';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { toCurrency } from '@/components/cores/ToCurrency';
import { Button } from '@/components/ui/button';
import Timer from '@/components/timer/TimerComponent';
import { useGetBookingById } from '@/features/user/transaction/hooks/useGetBooking';
import Loading from '@/app/loading';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAutoPayment } from '@/features/user/transaction/hooks/useBooking';
export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookingId = searchParams.get('order_id');
  const payment_type = searchParams.get('payment_type');
  const transaction_status = searchParams.get('transaction_status');
  let { booking } = useGetBookingById(bookingId as string);
  const { mutationAutoPayment } = useAutoPayment();

  const autopayment = async () => {
    await mutationAutoPayment(bookingId as string);
  };

  const handleCopy = () => {};
  useEffect(() => {
    if (Number(payment_type) != 1 && transaction_status == 'settlement') {
      autopayment();
    }
  }, []);
  console.log(booking);
  if (!booking) return <Loading></Loading>;
  return (
    <div className="my-32 md:w-[600px] mx-auto grid gap-5">
      {booking.booking_statusId > 1 ? (
        <div className="flex justify-center mt-[30vh] flex-col items-center gap-3">
          <div className="text-xs font-medium md:text-sm text-stone-400">
            Booking ID {bookingId}
          </div>
          <div className="text-2xl md:text-3xl font-bold">
            {booking.status.status}
          </div>
          {booking.booking_statusId === 2 ? (
            <div className="font-medium flex flex-col gap-3 items-center text-stone-600">
              <div className="w-[60vw] text-center md:w-full">
                Your payment proof is currently being reviewed by tenant.
              </div>
              <div className="flex gap-3">
                <Button onClick={() => router.push('/')} variant={'outline'}>
                  Back to home
                </Button>
                <Button onClick={() => router.refresh()}>
                  Check payment status
                </Button>
              </div>
            </div>
          ) : booking.booking_statusId === 3 ? (
            <div className="font-medium text-center flex flex-col gap-3 items-center text-stone-600">
              <div>
                Your booking request has been accepted by tenant. You should
                receive a confirmation email.
              </div>
              <div className="flex gap-3">
                <Button onClick={() => router.push('/')}>Back to home</Button>
              </div>
            </div>
          ) : (
            <div className="font-medium flex flex-col gap-3 items-center text-stone-600">
              <div>Your booking has been cancelled.</div>
              <div className="flex gap-3">
                <Button onClick={() => router.push('/')} variant={'outline'}>
                  Back to home
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="text-center grid gap-5">
            <div className="text-xl font-bold">Your booking is on hold</div>
            <Timer expiryTimestamp={new Date(booking.expired_at)} />
          </div>
          <div className="text-sm text-center">
            <div>
              Please finish payment before{' '}
              <span className="font-semibold">
                {format(new Date(booking.expired_at), 'yyyy-MM-dd HH:mm')}
              </span>
            </div>
            <div>
              Your booking will be cancelled automatically if time is up.
            </div>
          </div>
          <div className="p-8 grid gap-5 border rounded-lg">
            <div className="flex justify-between items-center">
              <div className="font-bold">Manual transfer</div>
              <Image src={'/BCA.png'} width={100} height={100} alt="BCA Logo" />
            </div>
            <Separator></Separator>
            <div className="flex justify-between">
              <div>
                <div className="font-medium text-stone-600 text-sm">
                  Bank account number
                </div>
                <div className="font-bold">372 178 50566</div>
              </div>
              <Button variant={'secondary'} onClick={handleCopy}>
                Copy
              </Button>
            </div>

            <div>
              <div className="font-medium text-stone-600 text-sm">
                Account name
              </div>
              <div className="font-bold">PT. Roomer Indonesia</div>
            </div>
            <div className="flex justify-between">
              <div>
                <div className="font-medium text-stone-600 text-sm">
                  Total amount
                </div>
                <div className="font-bold">
                  {toCurrency(booking.total_price)}
                </div>
                <div className="font-medium text-stone-600 text-xs">
                  Important: please transfer the exact amount
                </div>
              </div>
              <div>See details</div>
            </div>
          </div>
          <div className="text-center grid gap-3">
            <div className="font-bold">How to pay</div>
            <div className="text-sm">
              Make sure the payment is successfully made and upload the payment
              proof to verify
            </div>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => router.push('/')} variant={'outline'}>
                Back to home
              </Button>
              <Button onClick={() => router.refresh()}>
                Check payment status
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
