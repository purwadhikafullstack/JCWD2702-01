import {
  Form,
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
import { LoadingCircle } from '@/components/ui/loading';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import FilterCalendar from './sections/FilterCalendar';
import PriceDisplay from './sections/PriceDisplay';
import { ShowPrice } from './sections/PriceCalculatorLogic';
import PriceDetails from './sections/PriceDetails';
import {
  HotelFormExtension,
  GuestsFormExtension,
} from './sections/FormExtension';
import { formSchema } from './sections/FilterFormSchema';
import { useSelector } from 'react-redux';

export default function FilterCard({
  no_book,
  seasonal_prices,
  data,
  listingId,
  room_typesId,
  breakfast_option = false,
  room_typesIndex = 0,
  updateCurrentRoom,
  breakfast_price,
  className,
  startDate,
  endDate,
  adults,
  kids,
}: {
  no_book: any[];
  seasonal_prices: any[];
  data: any;
  listingId: string;
  breakfast_option: boolean;
  room_typesId: number | undefined;
  room_typesIndex?: number;
  updateCurrentRoom?: (roomIndex: number) => void;
  breakfast_price?: number;
  className?: string;
  startDate?: string;
  endDate?: string;
  adults?: string;
  kids?: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: {
        from: startDate ? new Date(startDate) : undefined,
        to: endDate ? new Date(endDate) : undefined,
      },
      guests: { adults: Number(adults), children: Number(kids), pets: 0 },
      seasonal_price: 0,
      seasonal_night: 0,
      normal_price: 0,
      normal_night: 0,
      room_types: room_typesId,
      include_breakfast: breakfast_option,
      breakfast_price: breakfast_price || 0,
    },
  });

  const [isClicked, setIsClicked] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  const router = useRouter();
  const userState = useSelector((state: any) => state.user.uid);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsClicked(true);
    if (!userState) {
      router.push('/signin');
    } else {
      const toPush: any = { ...data };
      toPush.checkin = format(data.duration.from, 'yyyy-MM-dd');
      toPush.checkout = format(data.duration.to, 'yyyy-MM-dd');
      toPush.adults = data.guests.adults;
      toPush.children = data.guests.children;
      toPush.pets = data.guests.pets;
      toPush.listingsId = listingId;
      toPush.room_typesId = room_typesId;
      delete toPush.guests;
      delete toPush.duration;

      const searchParams = [];
      for (let key in toPush) {
        searchParams.push(`${key}=${toPush[key]}`);
      }

      router.push(`/booking/confirmation?${searchParams.join('&')}`);
    }
  }

  const priceBasedOnRange = ShowPrice({
    date: date,
    seasonal_prices: seasonal_prices,
    data: data,
    room_typesIndex: room_typesIndex,
    form: form,
  });

  console.log(priceBasedOnRange);

  return (
    <div className={cn('w-full shadow-md rounded-xl p-6', className)}>
      <PriceDisplay
        priceBasedOnRange={priceBasedOnRange}
        room_typesIndex={room_typesIndex}
        data={data}
      ></PriceDisplay>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {data.category.category === 'Hotel' && updateCurrentRoom && (
            <HotelFormExtension
              form={form}
              updateCurrentRoom={(val: any) => updateCurrentRoom(val)}
              data={data}
              setDate={setDate}
              breakfast_option={breakfast_option}
              breakfast_price={breakfast_price}
            ></HotelFormExtension>
          )}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'rounded-full font-medium',
                          !date?.from && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, 'LLL dd, y')} -{' '}
                              {format(date.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(date.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="center">
                    <FilterCalendar
                      date={date}
                      setDate={(date: DateRange | undefined) => setDate(date)}
                      form={form}
                      data={data}
                      seasonal_prices={seasonal_prices}
                      unbookable={no_book}
                      room_typesIndex={room_typesIndex}
                    ></FilterCalendar>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <GuestsFormExtension
            form={form}
            data={data}
            room_typesIndex={room_typesIndex}
          ></GuestsFormExtension>
          {date?.to && date.from && (
            <PriceDetails
              form={form}
              priceBasedOnRange={priceBasedOnRange}
              breakfast_price={breakfast_price}
            ></PriceDetails>
          )}
          <Button
            type="submit"
            disabled={
              !(
                form.watch('duration.from') &&
                form.watch('duration.to') &&
                form.watch('guests.adults')
              )
                ? true
                : isClicked
                  ? true
                  : false
            }
            className="w-full flex gap-3"
          >
            {isClicked && <LoadingCircle />}
            Make reservation
          </Button>
        </form>
      </Form>
    </div>
  );
}
