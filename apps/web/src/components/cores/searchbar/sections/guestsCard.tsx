import { CounterComponent } from '@/components/cards/CounterComponent';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { User, Baby, Dog } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GuestCard({ form }: any) {
  const guests = form.watch('guests');
  const { setValue } = form;
  return (
    <FormField
      control={form.control}
      name="guests"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="ml-6 font-semibold lg:ml-2">Guests</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    'text-semibold justify-start text-left font-medium lg:w-60 p-3 rounded-none rounded-r-full',
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
              <PopoverContent className="shadow-md w-120 grid gap-2 bg-white p-4 rounded-lg">
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
                  setCount={(val: any) => setValue('guests.children', val)}
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
