' use client ';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RoomFacilitiesScrollArea } from './RoomFacilitiesScrollArea';

export const RoomDetailsForm = ({
  form,
  onSubmit,
  onSetFiles,
  facilities,
}: any) => {
  const [showBreakfastCharge, setShowBreakfastCharge] = useState(false);
  const { formState, reset } = form;
  const { isDirty } = formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start gap-7"
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-7">
            <div className="flex flex-col gap-3 w-80">
              <FormField
                control={form.control}
                name="room_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Room name"
                        {...field}
                        className="rounded-full "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        className="rounded-full "
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
                        className="rounded-full "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Stock"
                        {...field}
                        className="rounded-full "
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
                        className="rounded-full "
                      />
                    </FormControl>
                    <FormDescription>
                      Ex. No pets, no smoking, not infant friendly, etc.
                    </FormDescription>
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
                        className="rounded-full "
                      />
                    </FormControl>
                    <FormDescription>
                      Ex. 1 Queen Bed, 2 Twin Beds, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start gap-3 w-80">
              <div className="font-semibold text-black">Facilities</div>
              <RoomFacilitiesScrollArea form={form} facilities={facilities} />
              <FormField
                control={form.control}
                name="breakfast_option"
                render={({ field }) => (
                  <FormItem className=" pt-1">
                    <FormLabel>Breakfast option</FormLabel>
                    <FormControl>
                      <select
                        name="breakfast_option"
                        id="breakfast_option"
                        className="rounded-full  w-80 h-10 border"
                        value={field.value}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          setShowBreakfastCharge(value === 'yes');
                        }}
                      >
                        <option value="" disabled>
                          Breakfast option
                        </option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="already included">
                          Already included
                        </option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {showBreakfastCharge && (
                <FormField
                  control={form.control}
                  name="breakfast_charge"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Breakfast charge</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Breakfast charge"
                          {...field}
                          className="rounded-full  w-80"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="room_images"
              render={({ field }) => (
                <FormItem className=" pt-1">
                  <FormLabel>Room images</FormLabel>
                  <FormControl>
                    <Input
                      multiple
                      type="file"
                      accept="image/*"
                      {...field}
                      onChange={(event) => {
                        onSetFiles(event);
                        field.onChange(event);
                      }}
                      className="rounded-full w-full flex items-center justify-center"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Add room type</Button>
        </div>
      </form>
    </Form>
  );
};
