'use client';
import { Button } from '@/components/ui/button';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ArrowUpDown, MapPin, MoreHorizontal } from 'lucide-react';
import { format, isWithinInterval } from 'date-fns';
import { toCurrency } from '@/components/cores/ToCurrency';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
export type Sales = {
  id: string;
  display_name: string;
  total: number;
  order_date: string;
  payment_type: string;
  listing: {
    title: string;
  };
  details: any | undefined;
  booking: any | undefined;
};

export const columns2: ColumnDef<Sales>[] = [
  {
    accessorKey: 'id',
    header: 'Booking ID',
  },
  {
    accessorKey: 'display_name',
    header: 'User',
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-right"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseInt(row.getValue('total'));
      return (
        <div className="text-center font-medium">{toCurrency(amount)}</div>
      );
    },
  },
  {
    accessorKey: 'order_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-right"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ordered at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = format(row.getValue('order_date'), 'yyyy MMMM dd');
      return <div className="text-center font-medium">{formatted}</div>;
    },
    filterFn: (row: any, columnId: string, filterValue: any) => {
      console.log(
        'check',
        filterValue,
        row.getValue('order_date'),
        isWithinInterval(new Date(row.getValue('order_date')), {
          start: filterValue.from,
          end: new Date(new Date(filterValue.to).setHours(23, 59, 59)),
        }),
      );
      return isWithinInterval(new Date(row.getValue('order_date')), {
        start: filterValue.from,
        end: new Date(filterValue.to.setHours(23, 59, 59)),
      });
    },
  },
  {
    accessorKey: 'listing',
    header: 'Listing',
    cell: ({ row }) => {
      const listing = row.getValue('listing') as { title: string };
      const formatted = listing?.title ?? 'No title';
      return <div>{formatted}</div>;
    },
    filterFn: (row: any, columnId: string, filterValue: any) => {
      return (
        (row.getValue('listing').title as { title: string }) == filterValue
      );
    },
  },
  {
    accessorKey: 'booking',
    header: 'Details',
    cell: ({ row }) => {
      const booking = row.getValue('booking') as any;
      console.log('>>>>>', booking);
      return (
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
                    <p>{booking?.id}</p>
                    <p>
                      {format(
                        new Date(booking?.created_at),
                        'yyyy-MM-dd HH:mm',
                      )}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Image
                      src={
                        booking?.room_type.listing.listing_images[0].image_url
                      }
                      width={100}
                      height={100}
                      alt="listing"
                      unoptimized
                      className="w-[150px] h-[80px] object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-bold">
                        {booking?.room_type.listing.title}
                      </div>
                      <div className="flex items-center text-xs">
                        <MapPin className="p-1 ml-[-8px]" />
                        <span className="font-medium">
                          {`${booking?.room_type.listing.city}, ${booking?.room_type.listing.country}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid">
                    <div className="flex w-full justify-between">
                      <div>Duration</div>
                      <div className="font-semibold">
                        {format(new Date(booking?.start_date), 'dd MMMM yyyy')}
                        {' - '}
                        {format(new Date(booking?.end_date), 'dd MMMM yyyy')}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div>Number of guests</div>
                      <div className="font-semibold">
                        {booking?.num_of_guests}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div>Include breakfast</div>
                      <div className="font-semibold">
                        {booking?.details?.include_breakfast ? 'Yes' : 'No'}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div>
                        {booking?.details?.normal_night +
                          booking?.details?.seasonal_night}{' '}
                        night(s)
                      </div>
                      <div className="font-semibold">
                        {toCurrency(
                          booking?.details?.normal_price +
                            booking?.details?.seasonal_price,
                        )}
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div>Taxes & Fees</div>
                      <div className="font-semibold">
                        {toCurrency(booking?.details?.taxes_and_fees)}
                      </div>
                    </div>
                    <div className="flex font-bold w-full justify-between">
                      <div>Total</div>
                      <div>{toCurrency(booking?.total_price)}</div>
                    </div>
                  </div>
                  {booking?.details?.breakfast_price &&
                  booking?.details?.include_breakfast ? (
                    <div>{toCurrency(booking?.details?.breakfast_price)}</div>
                  ) : null}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
