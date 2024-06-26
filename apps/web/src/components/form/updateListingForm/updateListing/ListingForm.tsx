import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FacilitiesScrollArea } from './FacilitiesScrollArea';

export const ListingForm = ({ form, item, facilities, onSetFiles }: any) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-7 w-full ">
        <div className="flex flex-col gap-3 w-full lg:w-1/2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`${item.title}`}
                    {...field}
                    className="rounded-full bg-zinc-100 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`${item.room_types[0].price}`}
                    {...field}
                    className="rounded-full bg-zinc-100"
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
                <FormLabel>Bed details</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`${item.room_types[0].bed_details}`}
                    {...field}
                    className="rounded-full bg-zinc-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FacilitiesScrollArea form={form} facilities={facilities} />
      </div>
      <div className="w-full flex flex-col gap-3">
        <FormField
          control={form.control}
          name="listing_images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  {...field}
                  onChange={(event) => {
                    onSetFiles(event);
                    field.onChange(event);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`${item.description}`}
                  {...field}
                  className="h-[125px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
