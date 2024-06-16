import { toCurrency } from '@/components/cores/ToCurrency';
import { CounterComponent } from '@/components/cores/searchbar/CounterComponent';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  areIntervalsOverlapping,
  closestTo,
  differenceInDays,
  format,
  getOverlappingDaysInIntervals,
  isWithinInterval,
  subDays,
} from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Baby, CalendarIcon, Dog, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DateRange, DayContentProps } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  duration: z.object({
    from: z.date(),
    to: z.date(),
  }),
  guests: z.object({
    adults: z.number().min(1),
    children: z.number().min(0),
    pets: z.number().min(0),
  }),
  seasonal_price: z.number(),
  seasonal_night: z.number(),
  normal_price: z.number(),
  normal_night: z.number(),
  room_types: z.number(),
  include_breakfast: z.boolean(),
  breakfast_price: z.number(),
});

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
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: {
        from: undefined,
        to: undefined,
      },
      guests: { adults: 0, children: 0, pets: 0 },
      seasonal_price: 0,
      seasonal_night: 0,
      normal_price: 0,
      normal_night: 0,
      room_types: room_typesId,
      include_breakfast: breakfast_option,
      breakfast_price: 0,
    },
  });

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const router = useRouter();
  const { setValue, watch } = form;
  const guests = watch('guests');

  function CustomDayContent(props: DayContentProps) {
    const isDisabled = no_book.some((x) =>
      isWithinInterval(props.date, { start: subDays(x.from, 1), end: x.to }),
    );

    const getActiveSeasonalPrice = (date: Date) => {
      return seasonal_prices.find((x) =>
        isWithinInterval(date, { start: x.start, end: x.end }),
      );
    };
    const seasonal_price_check = getActiveSeasonalPrice(props.date);

    return (
      <span
        className="numbers-font"
        style={{
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          padding: '7px',
          display: 'inline-block',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
        }}
      >
        <div className={`text-xs ${isDisabled && 'line-through'}`}>
          {props.date.getDate()}
        </div>
        {!isDisabled && (
          <div
            className={
              seasonal_price_check &&
              seasonal_price_check.price <
                data.room_types[room_typesIndex].price
                ? 'text-green-500 font-medium'
                : 'font-medium'
            }
            style={{ fontSize: '0.65em', marginTop: '0.1em' }}
          >
            {seasonal_price_check
              ? seasonal_price_check.price / 1000
              : (data.room_types[room_typesIndex].price as number) / 1000}
          </div>
        )}
        {isDisabled && (
          <div style={{ fontSize: '0.65em', marginTop: '0.1em' }}>Booked</div>
        )}
      </span>
    );
  }

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    setValue('duration', {
      from: selectedDate?.from as Date,
      to: selectedDate?.to as Date,
    });
    let result;
    if (selectedDate?.from && selectedDate?.to) {
      if (selectedDate?.to > date?.to!) {
        setDate({ from: selectedDate.to, to: undefined });
      } else {
        result = no_book.filter((x) =>
          areIntervalsOverlapping(
            { start: selectedDate.from as Date, end: selectedDate.to as Date },
            { start: x.from, end: x.to },
          ),
        );

        if (result.length > 0) {
          const froms = result.map((x) => x.from);
          const closestDate = closestTo(selectedDate.from as Date, froms);
          setDate({
            from: selectedDate.from,
            to: subDays(closestDate as Date, 1),
          });
        }
      }

      setValue('duration', selectedDate as { from: Date; to: Date });
    }
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
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

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const searchParams = [];
    for (let key in toPush) {
      searchParams.push(`${key}=${toPush[key]}`);
    }

    router.push(`/booking/confirmation?${searchParams.join('&')}`);
  }

  const ShowPrice = ({
    date,
    seasonal_prices,
  }: {
    date: DateRange | undefined;
    seasonal_prices: any;
  }) => {
    const normalPrice = data.room_types[room_typesIndex].price;
    setValue('normal_price', normalPrice);
    const totalNights = differenceInDays(date?.to as Date, date?.from as Date);
    let seasonalNight = 0;
    let normalNight = 0;
    let seasonalPrice = 0;
    const overlap = (val: any) => {
      return areIntervalsOverlapping(
        { start: new Date(val.start), end: new Date(val.end) },
        { start: date?.from as Date, end: date?.to as Date },
      );
    };

    if (date && date.from && date.to) {
      const hasOverlap = seasonal_prices.some((x: any) => overlap(x));
      if (hasOverlap) {
        const seasonal_entity = seasonal_prices.find((x: any) => overlap(x));
        seasonalNight = getOverlappingDaysInIntervals(
          {
            start: new Date(seasonal_entity.start),
            end: new Date(seasonal_entity.end),
          },
          { start: date.from, end: date.to },
        );
        normalNight = totalNights - seasonalNight;
        seasonalPrice = seasonal_entity.price;
        setValue('seasonal_night', seasonalNight);
        setValue('seasonal_price', seasonalPrice);
        setValue('normal_night', normalNight);
      } else {
        normalNight = totalNights;
        setValue('normal_night', normalNight);
      }
    }
    return {
      totalPrice: seasonalNight * seasonalPrice + normalNight * normalPrice,
      totalNights,
      seasonalNight,
      seasonalPrice,
      normalNight,
      normalPrice,
    };
  };

  const priceBasedOnRange = ShowPrice({
    date: date,
    seasonal_prices: seasonal_prices,
  });

  return (
    <div className={cn('w-full shadow-md rounded-xl p-6', className)}>
      <div className="font-semibold numbers-font py-4">
        {priceBasedOnRange.seasonalNight && priceBasedOnRange.normalNight ? (
          <div className="flex flex-col">
            <div className="text-2xl">
              {toCurrency(priceBasedOnRange.seasonalPrice)} -
            </div>
            <div className="flex gap-2 items-end">
              <div className="text-2xl">
                {toCurrency(priceBasedOnRange.normalPrice)}
              </div>
              <div>/ night</div>
            </div>
          </div>
        ) : priceBasedOnRange.seasonalNight ? (
          <div className="flex gap-2 items-end">
            <div className="text-2xl">
              {toCurrency(priceBasedOnRange.seasonalPrice)}
            </div>
            <div>/ night</div>
          </div>
        ) : (
          <div className="flex gap-2 items-end">
            <div className="text-2xl">
              {toCurrency(data.room_types[room_typesIndex].price)}
            </div>
            <div>/ night</div>
          </div>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {data.category.category === 'Hotel' && updateCurrentRoom && (
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
                            field.onChange(checked);
                            setValue(
                              'breakfast_price',
                              checked ? breakfast_price || 0 : 0,
                            ); // Set the breakfast price
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
                    <Calendar
                      initialFocus
                      mode="range"
                      min={2}
                      fromDate={new Date()}
                      defaultMonth={date?.from}
                      selected={date}
                      disabled={[...no_book]}
                      onSelect={handleDateChange}
                      numberOfMonths={1}
                      components={{
                        DayContent: CustomDayContent, // Replace the DayContent component
                      }}
                      className="bg-white align-center rounded-lg shadow-lg"
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
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
                            (acc, x) => acc + x,
                            0,
                          ) === 0 && 'text-muted-foreground',
                        )}
                      >
                        {Object.values(form.watch('guests')).reduce(
                          (acc, x) => acc + x,
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
                        setCount={(val: any) =>
                          setValue('guests.children', val)
                        }
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
          {date?.to && date.from && (
            <div className="grid gap-2 py-2">
              <div className="font-bold text-lg">Price details</div>
              <div className="">
                <div className="flex font-medium justify-between">
                  <div>Rooms</div>
                  <div>{toCurrency(priceBasedOnRange.totalPrice)}</div>
                </div>
                <div className="text-sm">
                  {priceBasedOnRange.seasonalNight ? (
                    <div className="flex justify-between">
                      <div>{priceBasedOnRange.seasonalNight} Nights</div>
                      <div>
                        {`${priceBasedOnRange.seasonalNight} x ${toCurrency(priceBasedOnRange.seasonalPrice)}`}
                      </div>
                    </div>
                  ) : null}
                  {priceBasedOnRange.normalNight ? (
                    <div className="flex justify-between">
                      <div>{priceBasedOnRange.normalNight} Nights</div>
                      <div>
                        {`${priceBasedOnRange.normalNight} x ${toCurrency(priceBasedOnRange.normalPrice)}`}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="font-medium">
                <div className="flex justify-between">
                  <div>Taxes & fees</div>
                  <div>{toCurrency(priceBasedOnRange.totalPrice * 0.2)}</div>
                </div>
              </div>
              {form.watch('include_breakfast') === true && breakfast_price ? (
                <div className="font-medium">
                  <div className="flex justify-between">
                    <div>Breakfast</div>
                    <div>{toCurrency(breakfast_price)}</div>
                  </div>
                </div>
              ) : null}
              <div className="font-medium">
                <div className="flex justify-between">
                  <div>Total</div>
                  <div className="font-bold">
                    {toCurrency(
                      priceBasedOnRange.totalPrice * 1.2 +
                        (form.watch('include_breakfast') && breakfast_price
                          ? breakfast_price
                          : 0),
                    )}
                  </div>
                </div>
              </div>
            </div>
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
                : false
            }
            className="w-full"
          >
            Make reservation
          </Button>
        </form>
      </Form>
    </div>
  );
}
