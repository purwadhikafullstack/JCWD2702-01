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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const ListingForm = ({
  form,
  item,
  setRoomTypeIndex,
  onSetFiles,
}: any) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="w-full">
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
        name="description"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder={`${item.description}`}
                {...field}
                className="rounded-lg w-full h-[125px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="listing_images"
        render={({ field }) => (
          <FormItem className="w-full">
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
        name="room_types"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1 w-full">
            <FormLabel>Room types</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value: any) => {
                  field.onChange(value);
                  form.setValue('room_types', Number(value));
                  const index_room = item.room_types.findIndex(
                    (x: any) => x.id == Number(value),
                  );
                  setRoomTypeIndex(index_room);
                }}
              >
                <SelectTrigger className="w-full rounded-lg">
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {item.room_types.map((item: any, i: number) => (
                    <SelectItem key={i} value={`${item.id}`}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
