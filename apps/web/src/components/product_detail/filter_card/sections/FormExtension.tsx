import { CounterComponent } from '@/components/cores/searchbar/CounterComponent';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Baby, Dog, User } from 'lucide-react';

export function HotelFormExtension({
  form,
  updateCurrentRoom,
  setDate,
  data,
  breakfast_option,
  breakfast_price,
}: any) {
  const { setValue } = form;
  return (
    <>
      <FormField
        control={form.control}
        name="room_types"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Select
              onValueChange={(value) => {
                field.onChange(Number(value));
                updateCurrentRoom(Number(value));
                setDate({ from: undefined, to: undefined });
                setValue('guests.adults', 0);
                setValue('guests.children', 0);
                setValue('guests.pets', 0);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a room type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data.room_types.map((x: any, i: number) => (
                  <SelectItem key={i} value={i.toString()}>
                    {x.name ? x.name : 'None'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {breakfast_option && (
        <FormField
          control={form.control}
          name="include_breakfast"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between px-3">
              <div
                className={`space-y-0.5 ${form.watch('include_breakfast') ? null : 'text-stone-600'} font-medium text-sm`}
              >
                Include breakfast
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    console.log('checked', checked);
                    field.onChange(checked);
                    setValue('breakfast_price', checked ? breakfast_price : 0); // Set the breakfast price
                  }}
                  disabled={breakfast_price ? false : true}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </>
  );
}

export function GuestsFormExtension({ form, data, room_typesIndex }: any) {
  const { setValue } = form;
  const guests = form.watch('guests');
  return (
    <FormField
      control={form.control}
      name="guests"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    'text-semibold lg:w-72 font-medium',
                    Object.values(form.watch('guests')).reduce(
                      (acc: number, x: any) => acc + x,
                      0,
                    ) === 0 && 'text-muted-foreground',
                  )}
                >
                  {Object.values(form.watch('guests')).reduce(
                    (acc: number, x: any) => acc + x,
                    0,
                  ) === 0
                    ? "Who's coming?"
                    : `Adults (${JSON.stringify(form.watch('guests').adults)}), Children (${JSON.stringify(form.watch('guests').children)}), Pets (${JSON.stringify(form.watch('guests').pets)})`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-120 grid gap-2 bg-white p-4 rounded-lg">
                <CounterComponent
                  icon={<User className="h-4 w-4" />}
                  text={'Adults'}
                  count={guests.adults}
                  setCount={(val: any) => setValue('guests.adults', val)}
                  maxCount={data.room_types[room_typesIndex].capacity}
                  disabled={
                    guests.children + guests.adults ==
                    data.room_types[room_typesIndex].capacity
                      ? true
                      : false
                  }
                />
                <CounterComponent
                  icon={<Baby className="h-4 w-4" />}
                  text={'Children'}
                  count={guests.children}
                  setCount={(val: any) => setValue('guests.children', val)}
                  maxCount={data.room_types[room_typesIndex].capacity}
                  disabled={
                    guests.children + guests.adults ==
                    data.room_types[room_typesIndex].capacity
                      ? true
                      : false
                  }
                />
                <CounterComponent
                  icon={<Dog className="h-4 w-4" />}
                  text={'Pets'}
                  count={guests.pets}
                  setCount={(val: any) => setValue('guests.pets', val)}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
