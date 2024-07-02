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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { FacilityBadge } from '@/components/cores/FacilityBadge';
import { useGetListingsFacilities } from '@/features/listings/hooks/useGetListings';
import Image from 'next/image';

export const RoomTypeForm = ({
  form,
  item,
  roomTypeIndex,
  onSetRoomtypeFiles,
}: any) => {
  const { facilities } = useGetListingsFacilities();
  return (
    <div className="px-4 md:px-20 py-4 flex flex-col items-center justify-center w-full">
      <div className="w-full md:w-96 h-60 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${item.room_types[roomTypeIndex].room_images[0].image_url}`}
          fill={true}
          alt="picture"
          className="rounded-xl"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-7 w-full mt-4">
        <div className="flex flex-col gap-3 w-full md:w-1/2 lg:w-80">
          <FormField
            control={form.control}
            name="room_types_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`${item.room_types[roomTypeIndex].name}`}
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={`${item.room_types[roomTypeIndex].price}`}
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
                    placeholder={`${item.room_types[roomTypeIndex].bed_details}`}
                    {...field}
                    className="rounded-full bg-zinc-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col items-start w-full md:w-1/2 lg:w-80">
          <div className="font-semibold text-lg">Facilities</div>
          <ScrollArea className="h-52 w-full rounded-md border">
            <div className="p-4">
              <Controller
                name="facilities"
                control={form.control}
                render={({ field }) => (
                  <>
                    {facilities ? (
                      facilities.map((facility: any) => (
                        <div
                          key={facility.id}
                          className="flex gap-2 items-center"
                        >
                          <Checkbox
                            checked={field.value.includes(facility.id)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, facility.id]
                                : field.value.filter(
                                    (id: number) => id !== facility.id,
                                  );
                              field.onChange(newValue);
                            }}
                          />
                          <FacilityBadge icon={true} text={facility.facility} />
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
      </div>
      <div className="w-full mt-4">
        <FormField
          control={form.control}
          name="room_types_images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  {...field}
                  onChange={(event) => {
                    onSetRoomtypeFiles(event);
                    field.onChange(event);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
