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
import { setSeasonalPriceFormSchema } from '@/features/listings/schemas/ListingFormSchema';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { SetSeasonalPriceFormProps } from '@/components/profile/tenant/myListing/type';
import { useSetSeasonalPrice } from '@/features/tenant/property/hooks/useSetSeasonalPrice';

export const SetSeasonalPriceForm = ({
  listing,
}: SetSeasonalPriceFormProps) => {
  const { mutationSetSeasonalPrice } = useSetSeasonalPrice();
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [roomTypeIndex, setRoomTypeIndex] = useState(0);

  const existingSeasonalPrice = [
    ...listing.room_types[roomTypeIndex].seasonal_prices,
  ].map((x) => ({ from: new Date(x.start_date), to: new Date(x.end_date) }));

  const form = useForm<z.infer<typeof setSeasonalPriceFormSchema>>({
    resolver: zodResolver(setSeasonalPriceFormSchema),
    defaultValues: {
      price: '',
      room_types: Number(listing.room_types[0].id),
      start_date: date?.from,
      end_date: date?.to,
    },
  });
  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);

    form.setValue('start_date', selectedDate?.from as Date);
    form.setValue('end_date', selectedDate?.to as Date);
  };

  const room_types = listing.room_types;

  const onSubmit = async (
    values: z.infer<typeof setSeasonalPriceFormSchema>,
  ) => {
    mutationSetSeasonalPrice({
      price: values.price,
      room_types_id: values.room_types
        ? values.room_types
        : listing.room_types[0].id,
      start_date: new Date(values.start_date),
      end_date: new Date(values.end_date),
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
                disabled={[...existingSeasonalPrice]}
              />
              <div className="flex flex-col gap-3 w-full">
                {listing?.categoriesId === 10 ? (
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
                ) : (
                  <div></div>
                )}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Price"
                          {...field}
                          className="rounded-full bg-zinc-100"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-80"
              disabled={
                form.watch('start_date') &&
                form.watch('end_date') &&
                form.watch('price')
                  ? false
                  : true
              }
            >
              Set Price
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
