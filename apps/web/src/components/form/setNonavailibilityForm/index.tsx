'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setNonavailabilityFormSchema } from '@/features/listings/schemas/ListingFormSchema';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { SetNonAvailabilityFormProps } from '@/components/profile/tenant/myListing/type';
import { useSetNonavailability } from '@/features/tenant/property/hooks/useSetNonavailability';
import { areIntervalsOverlapping, closestTo, subDays } from 'date-fns';
import { format } from 'date-fns';

export const SetNonavailabilityForm = ({
  listing,
}: SetNonAvailabilityFormProps) => {
  const { mutationSetNonavailability } = useSetNonavailability();
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [roomTypeIndex, setRoomTypeIndex] = useState(0);

  const bookings: any[] = [];
  for (let booking of listing.room_types[roomTypeIndex].bookings) {
    bookings.push({
      from: new Date(booking.start_date),
      to: new Date(booking.end_date),
    });
  }

  const existingSeasonalPrice = [
    ...listing.room_types[roomTypeIndex].nonavailability,
  ].map((x) => ({ from: new Date(x.start_date), to: new Date(x.end_date) }));

  const form = useForm<z.infer<typeof setNonavailabilityFormSchema>>({
    resolver: zodResolver(setNonavailabilityFormSchema),
    defaultValues: {
      room_types: Number(listing.room_types[0].id),
      start_date: date?.from,
      end_date: date?.to,
    },
  });
  const handleDateChange = (selectedDate: DateRange | undefined) => {
    if (!selectedDate?.from || !selectedDate?.to) {
      setDate(selectedDate);
      form.setValue('start_date', selectedDate?.from as Date);
      form.setValue('end_date', selectedDate?.to as Date);
      return;
    }

    setDate(selectedDate);
    form.setValue('start_date', selectedDate.from);
    form.setValue('end_date', selectedDate.to);

    const disabledDates = [...existingSeasonalPrice, ...bookings];

    const overlappingDates = disabledDates.filter((x: any) =>
      areIntervalsOverlapping(
        { start: selectedDate.from as Date, end: selectedDate.to as Date },
        { start: x.from, end: x.to },
      ),
    );

    if (selectedDate.to > date?.to!) {
      setDate({ from: selectedDate.to, to: undefined });
      form.setValue('start_date', selectedDate.to);
      form.setValue('end_date', null);
    } else if (overlappingDates.length > 0) {
      const froms = overlappingDates.map((x: any) => x.from);
      const closestDate = closestTo(selectedDate.from, froms);
      const newEndDate = subDays(closestDate as Date, 1);

      setDate({ from: selectedDate.from, to: newEndDate });
      form.setValue('end_date', newEndDate);
    }
  };

  const room_types = listing.room_types;

  const onSubmit = async (
    values: z.infer<typeof setNonavailabilityFormSchema>,
  ) => {
    mutationSetNonavailability({
      room_types_id: values.room_types
        ? values.room_types
        : listing.room_types[0].id,
      start_date: new Date(values.start_date),
      end_date: new Date(values.end_date as Date),
    });
  };
  return (
    <div className="w-full h-full pt-2 flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-start gap-7"
        >
          <div className="flex flex-col gap-5 items-center justify-center">
            <div className="flex flex-col items-start gap-3">
              <Calendar
                mode="range"
                numberOfMonths={1}
                min={2}
                fromDate={new Date()}
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateChange}
                disabled={[...existingSeasonalPrice, ...bookings]}
              />
              <div className="flex flex-col gap-3 w-full">
                {listing?.categoriesId === 10 && (
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="room_types"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel>Room types</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value: any) => {
                                field.onChange(value);
                                form.setValue('room_types', Number(value));
                                const index_room = room_types.findIndex(
                                  (x) => x.id == Number(value),
                                );
                                setRoomTypeIndex(index_room);
                              }}
                            >
                              <SelectTrigger className="w-full rounded-full">
                                <SelectValue placeholder="Select room type" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                {listing.room_types.map(
                                  (item: any, i: number) => (
                                    <SelectItem key={i} value={`${item.id}`}>
                                      {item.name}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              {date?.from && date?.to ? (
                <div className="mb-4 text-black w-full text-center">{`Duration: ${format(date.from, 'MMMM dd yyyy')} - ${format(date.to, 'MMMM dd yyyy')}`}</div>
              ) : (
                <div className="mb-4 w-full text-center">Pick a date</div>
              )}
            </div>
            <Button
              type="submit"
              className="w-80"
              disabled={
                form.watch('start_date') && form.watch('end_date')
                  ? false
                  : true
              }
            >
              Set Nonavailability
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
