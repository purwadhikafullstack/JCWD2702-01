' use client ';

import {
  Form,
  FormControl,
<<<<<<< HEAD
=======
  FormDescription,
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                        className="rounded-full bg-zinc-100"
=======
                        className="rounded-full "
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                        placeholder="price"
                        {...field}
                        className="rounded-full bg-zinc-100"
=======
                        placeholder="Price"
                        {...field}
                        className="rounded-full "
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                        placeholder="capacity"
                        {...field}
                        className="rounded-full bg-zinc-100"
=======
                        placeholder="Capacity"
                        {...field}
                        className="rounded-full "
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                        placeholder="stock"
                        {...field}
                        className="rounded-full bg-zinc-100"
=======
                        placeholder="Stock"
                        {...field}
                        className="rounded-full "
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                        placeholder="restrictions"
                        {...field}
                        className="rounded-full bg-zinc-100"
                      />
                    </FormControl>
=======
                        placeholder="Restrictions"
                        {...field}
                        className="rounded-full "
                      />
                    </FormControl>
                    <FormDescription>
                      Ex. No pets, no smoking, not infant friendly, etc.
                    </FormDescription>
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedding_details"
                render={({ field }) => (
                  <FormItem>
<<<<<<< HEAD
                    <FormLabel>Bedding Details</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="bedding details"
                        {...field}
                        className="rounded-full bg-zinc-100"
                      />
                    </FormControl>
=======
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
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start gap-3 w-80">
<<<<<<< HEAD
              <div className="font-semibold">Facilities</div>
=======
              <div className="font-semibold text-black">Facilities</div>
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                        className="rounded-full bg-zinc-100 w-80 h-10 border"
=======
                        className="rounded-full  w-80 h-10 border"
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                          className="rounded-full bg-zinc-100 w-80"
=======
                          className="rounded-full  w-80"
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                  <FormLabel>Upload images</FormLabel>
=======
                  <FormLabel>Room images</FormLabel>
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
                      className="bg-zinc-100 rounded-xl w-full flex items-center justify-center"
=======
                      className="rounded-full w-full flex items-center justify-center"
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
