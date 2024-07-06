'use client';
import { Button } from '@/components/ui/button';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { format, isWithinInterval } from 'date-fns';
import { toCurrency } from '@/components/cores/ToCurrency';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

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
    accessorKey: 'details',
    header: 'Details',
    cell: ({ row }) => {
      const details = row.getValue('details');
      const listing = row.getValue('listing');
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
            <DialogDescription>
              <div>{JSON.stringify(details)}</div>
              <div>
                
              </div>
              <div>{JSON.stringify(listing)}</div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
