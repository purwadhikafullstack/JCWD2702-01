'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useGetListingsFacilities } from '@/features/listings/hooks/useGetListings';
import { listingFacilitiesDetailsFormSchema } from '../../../../features/listings/schemas/ListingFormSchema';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { FacilityBadge } from '@/components/cores/FacilityBadge';

export const ListingFacilitiesDetails = ({ onNext, onBack }: any) => {
  const { facilities } = useGetListingsFacilities();
  const getData = localStorage.getItem('listingFacilitiesDetails');
  let data;
  if (getData) {
    data = JSON.parse(getData);
  }
  const form = useForm<z.infer<typeof listingFacilitiesDetailsFormSchema>>({
    resolver: zodResolver(listingFacilitiesDetailsFormSchema),
    defaultValues: {
      facilities: data?.facilities || [],
      price_per_night: data?.price_per_night || '',
      capacity: data?.capacity || '',
      restrictions: data?.restrictions || '',
      bedding_details: data?.bedding_details || '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof listingFacilitiesDetailsFormSchema>,
  ) => {
    localStorage.setItem('listingFacilitiesDetails', JSON.stringify(values));
    onNext();
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-center font-semibold text-xl">
        Listing details
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="flex justify-center gap-12">
              <div className="flex flex-col items-start gap-3">
                <div className="font-semibold text-sm">Facilities</div>
                <ScrollArea className="h-80 w-56 rounded-md">
                  <div>
                    <Controller
                      name="facilities"
                      control={form.control}
                      render={({ field }) => (
                        <>
                          {facilities ? (
                            facilities.map((item: any, index: number) => (
                              <div
                                key={item.id}
                                className="flex gap-2 my-1 text-sm items-center"
                              >
                                <Checkbox
                                  checked={field.value.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...field.value, item.id]
                                      : field.value.filter(
                                          (id: number) => id !== item.id,
                                        );
                                    field.onChange(newValue);
                                  }}
                                />
                                <FacilityBadge
                                  icon={true}
                                  text={item.facility}
                                />
                              </div>
                            ))
                          ) : (
                            <p>Loading</p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </ScrollArea>
              </div>
              <div className="flex flex-col gap-3 w-80">
                <FormField
                  control={form.control}
                  name="price_per_night"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per night</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Price"
                          {...field}
                          className="rounded-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Capacity"
                          {...field}
                          className="rounded-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="restrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restrictions</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Restrictions"
                          {...field}
                          className="rounded-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bedding_details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedding details</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Bedding details"
                          {...field}
                          className="rounded-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-between items-end">
              <Button
                variant={'ghost'}
                onClick={handleBack}
                className="text-zinc-500 underline underline-offset-2 w-28 h-8 flex items-center justify-center"
              >
                Back
              </Button>
              <Button className="w-28 h-8" type="submit">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
