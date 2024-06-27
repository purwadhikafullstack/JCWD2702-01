'use client';
import { Search } from 'lucide-react';
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
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import PlacesAutocomplete from './PlacesSuggestion';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { GuestCard } from './sections/guestsCard';
import { CalendarCard } from './sections/calendarCard';
import { useSearchParams } from 'next/navigation';
export default function SearchBarVariant({
  onSubmitCallback,
  dateParam,
  guestsParam,
  locationParam,
}: any) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(dateParam.from),
    to: new Date(dateParam.to),
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const searchParams = useSearchParams();

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
      adults: z.number().min(0),
      children: z.number().min(0),
      pets: z.number().min(0),
    }),
  });

  function decodeAsciiAndSpaces(encodedString: string) {
    if (!encodedString || encodedString == '') return '';
    let result = '';
    let i = 0;

    while (i < encodedString.length) {
      if (
        encodedString[i] === '%' &&
        encodedString[i + 1] === '2' &&
        encodedString[i + 2] === '0'
      ) {
        result += ' ';
        i += 3; // Skip over the "%20"
      } else if (!/[a-zA-Z]/.test(encodedString[i])) {
        let asciiValue = '';
        while (i < encodedString.length && !/[a-zA-Z]/.test(encodedString[i])) {
          asciiValue += encodedString[i];
          i++;
        }
        result += String.fromCharCode(parseInt(asciiValue, 10));
      } else {
        result += encodedString[i];
        i++;
      }
    }

    return result;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: `${searchParams.get('lat')},${searchParams.get('lng')},${searchParams.get('country')},,${decodeAsciiAndSpaces(locationParam)}`,
      duration: {
        from: new Date(),
        to: addDays(new Date(), 2),
      },
      guests: {
        adults: Number(guestsParam.adults),
        children: Number(guestsParam.children),
        pets: 0,
      },
    },
  });

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    if (selectedDate?.from && selectedDate?.to) {
      setValue('duration', selectedDate as { from: Date; to: Date });
    }
  };
  const queryClient = useQueryClient();
  const pathname = usePathname();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const location = values.location.split(',');
    const paramsString = `lat=${location[0]}&lng=${location[1]}&country=${location[3]}&start_date=${format(values.duration.from, 'yyyy-MM-dd')}&end_date=${format(values.duration.to, 'yyyy-MM-dd')}&adults=${values.guests.adults}&children=${values.guests.children}&loc_term=${location[4]}`;
    window.history.replaceState(null, '', '?' + paramsString.toString());
    onSubmitCallback(paramsString);
  }

  const { setValue } = form;

  const guests = form.watch('guests');

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-0 items-end"
        >
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="ml-6 font-semibold ml-4">
                  Location
                </FormLabel>
                <FormControl>
                  <PlacesAutocomplete
                    initialValue={decodeAsciiAndSpaces(locationParam)}
                    setValue={setValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <CalendarCard
            form={form}
            date={date}
            dateChangeHandler={handleDateChange}
          />
          <GuestCard form={form} />
          <Button
            className={cn(
              'rounded-full lg:ml-3',
              windowWidth < 1000 && 'w-[40px] ml-3 h-[40px]',
            )}
            type="submit"
          >
            {windowWidth > 1000 ? (
              <div className="flex items-center gap-1">
                <Search className="p-1 ml-[-5px]" /> Search
              </div>
            ) : (
              <div>
                <Search className="p-1" />
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
