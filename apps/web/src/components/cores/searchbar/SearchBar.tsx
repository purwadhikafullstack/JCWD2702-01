'use client';
import { Plus, User, Baby, Dog, Minus, Tent, Search } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import PlacesAutocomplete from './PlacesSuggestion';
import { CounterComponent } from './CounterComponent';

export default function SearchBar() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const pageResized = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', pageResized);
    return () => {
      window.removeEventListener('resize', pageResized);
    };
  }, []);

  const formSchema = z.object({
    location: z.string({ required_error: 'Must be filled' }),
    duration: z.object({
      from: z.date(),
      to: z.date(),
    }),
    guests: z.object({
      adults: z.number().min(1),
      children: z.number().min(0),
      pets: z.number().min(0),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      duration: {
        from: new Date(),
        to: addDays(new Date(), 2),
      },
      guests: { adults: 0, children: 0, pets: 0 },
    },
  });

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate?.from && selectedDate?.to) {
      setValue('duration', selectedDate as { from: Date; to: Date });
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const { setValue, watch } = form;

  const guests = form.watch('guests');

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 lg:gap-0 lg:flex items-end"
        >
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-secondary ml-6 lg:font-semibold lg:text-lg lg:ml-4">
                  Location
                </FormLabel>
                <FormControl>
                  <PlacesAutocomplete setValue={setValue} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-secondary ml-6 lg:font-semibold lg:text-lg lg:ml-2">
                  Duration
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'rounded-full lg:w-72 lg:rounded-none p-8 justify-start align-center text-left font-medium',
                          !date && 'text-muted-foreground',
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      min={2}
                      fromDate={new Date()}
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={handleDateChange}
                      numberOfMonths={2}
                      className="bg-white shadow-md rounded-lg"
                    />
                    ;
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
                <FormLabel className="text-secondary ml-6 lg:font-semibold lg:text-lg lg:ml-2">
                  Guests
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className={cn(
                          'text-semibold justify-start lg:w-72 text-left font-medium p-8 rounded-full lg:rounded-none lg:rounded-r-full',
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
                      />
                      <CounterComponent
                        icon={<Baby className="h-4 w-4" />}
                        text={'Children'}
                        count={guests.children}
                        setCount={(val: any) =>
                          setValue('guests.children', val)
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
          <Button
            className={cn(
              'p-2 rounded-full lg:w-[70px] lg:ml-3 lg:h-[70px]',
              windowWidth < 1000 && 'mt-3 h-[50px]',
            )}
            type="submit"
          >
            {windowWidth > 1000 ? (
              <Search />
            ) : (
              <div className="-ml-3 flex items-center gap-1 ">
                <Search className="p-1" /> Search
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
