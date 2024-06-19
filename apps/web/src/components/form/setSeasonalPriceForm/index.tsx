'use client';

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
import { setSeasonalPriceFormSchema } from '@/features/listings/schemas/ListingFormSchema';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { SetSeasonalPriceFormProps } from '@/components/profile/tenant/myListing/type';

export const SetSeasonalPriceForm = ({
  listing,
}: SetSeasonalPriceFormProps) => {
  const form = useForm<z.infer<typeof setSeasonalPriceFormSchema>>({
    resolver: zodResolver(setSeasonalPriceFormSchema),
    defaultValues: {
      price: '',
      //   start_date: '',
      //   end_date: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof setSeasonalPriceFormSchema>,
  ) => {
    console.log('triggered');
    console.log(values);
    console.log(listing);
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
                numberOfMonths={2}
                min={2}
                fromDate={new Date()}
              />
              <div className="flex flex-col gap-3 w-full">
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
            <Button type="submit" className="w-80">
              Set Price
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
