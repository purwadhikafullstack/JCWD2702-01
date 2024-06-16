'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ChevronsUpDown, Check } from 'lucide-react';
import RenderStars from '@/components/cores/RenderStars';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { toCurrency } from '@/components/cores/ToCurrency';
import { useGetListingById } from '@/features/listings/hooks/useGetListings';
import Image from 'next/image';
import Loading from '@/app/loading';
import { useNewBookingMutation } from '@/features/user/transaction/api/useBookingMutation';
import { useNewBooking } from '@/features/user/transaction/hooks/useBooking';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  phone: z.string(),
  payment: z.number(),
  total_price: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  num_of_guests: z.number(),
});

const languages = [
  { label: 'Manual Transfer', value: 1 },
  { label: 'Online Payment', value: 2 },
] as const;

export default function Page() {
  const searchParams = useSearchParams();

  const listingsId = searchParams.get('listingsId');
  const room_typesId = searchParams.get('room_typesId');
  const adults = Number(searchParams.get('adults'));
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const children = parseInt(searchParams.get('children') as string);
  const normal_night = Number(searchParams.get('normal_night'));
  const normal_price = Number(searchParams.get('normal_price'));
  const seasonal_night = Number(searchParams.get('seasonal_night'));
  const seasonal_price = Number(searchParams.get('seasonal_price'));
  const pets = parseInt(searchParams.get('pets') as string);
  const breakfast = JSON.parse(searchParams.get('include_breakfast') as string);
  const breakfast_price = Number(searchParams.get('breakfast_price'));

  const { listingById } = useGetListingById({ id: listingsId as string });
  const { mutationNewBooking } = useNewBooking();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total_price:
        (seasonal_night * seasonal_price + normal_night * normal_price) * 1.2,
      start_date: checkin as string,
      end_date: checkout as string,
      num_of_guests: adults + children,
      email: '',
      phone: '',
      payment: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutationNewBooking({ room_typesId: room_typesId as string, data: values });
  }

  if (!listingById) return <Loading></Loading>;
  return (
    <div className="my-32 w-[1000px] mx-auto">
      <div className="font-bold text-2xl mb-10">Booking confirmation</div>
      <div className="grid grid-cols-5 gap-16">
        <div className="col-span-3">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div>
                  <div className="font-bold pb-3">Contact information</div>
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fullname</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-8 justify-between">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className={cn('w-full')}>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className={cn('w-full')}>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormDescription className={cn('text-xs pt-3')}>
                    After payment, e-voucher and booking reminder will be sent
                    to to the email provided here.
                  </FormDescription>
                </div>
                <div>
                  <div className="font-bold pb-3">Payment method</div>
                  <FormField
                    control={form.control}
                    name="payment"
                    render={({ field }) => (
                      <FormItem className="grid">
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue('payment', Number(value));
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages.map((x) => (
                              <SelectItem value={x.value.toString()}>
                                {x.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <div className="font-bold pb-3">Cancellation policy</div>
                  <div className="grid gap-3">
                    <div className="text-sm">
                      The reservation is non-refundable. 
                      <Button variant={'link'} className="h-auto p-0">
                        Learn more
                      </Button>
                    </div>
                    <Separator />
                    <div className="text-xs">
                      By selecting the button below, I agree to the Host's House
                      Rules, Ground rules for guests, Airbnb's Rebooking and
                      Refund Policy, and that Airbnb can charge my payment
                      method if I’m responsible for damage.
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-[50%]">
                  Confirm and pay
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="bg-white col-span-2 p-6 flex flex-col gap-4 rounded-xl shadow-lg">
          <div>
            <Image
              src={listingById.imageCollection[0]}
              width={100}
              height={100}
              alt="Listing image"
              unoptimized
              className="w-full h-[150px] rounded-lg object-cover"
            />
            <div className="text-sm font-bold truncate">
              {listingById.sample.title}
            </div>
            <div className="flex text-xs items-center gap-2 font-medium">
              <RenderStars rating={5} />
              <div>(4.8)</div>
            </div>
          </div>
          <Separator></Separator>
          <div className="flex justify-between">
            <div>
              <div className="font-bold">Check-in</div>
              <div className="text-sm font-medium">
                {format(new Date(checkin as string), 'LLL dd, y')}
              </div>
              <div className="text-xs">After 14.00 PM</div>
            </div>
            <div className="text-right">
              <div className="font-bold">Check-out</div>
              <div className="text-sm font-medium">
                {format(new Date(checkout as string), 'LLL dd, y')}
              </div>
              <div className="text-xs">Before 11.00 PM</div>
            </div>
          </div>
          <Separator></Separator>
          <div className="flex justify-between">
            <div className="font-bold">Guests</div>
            {adults && (
              <div className="text-sm font-medium">Adults ({adults})</div>
            )}
            {children > 0 && (
              <div className="text-sm font-medium">Children ({children})</div>
            )}
            {pets > 0 && (
              <div className="text-sm font-medium">Pets ({pets})</div>
            )}
          </div>
          <Separator></Separator>
          <div className="">
            <div className="font-bold">Price details</div>
            <div className="grid gap-1">
              <div>
                <div className="flex justify-between text-sm font-medium">
                  <div>Rooms</div>
                  <div>
                    {toCurrency(
                      seasonal_night * seasonal_price +
                        normal_night * normal_price,
                    )}
                  </div>
                </div>
                {/* disini nanti mapping */}
                <div>
                  {normal_night ? (
                    <div className="flex justify-between text-xs text-stone-500 font-medium">
                      <div>{normal_night} nights</div>
                      <div>
                        {normal_night} x {toCurrency(normal_price)}
                      </div>
                    </div>
                  ) : null}
                  {seasonal_night ? (
                    <div className="flex justify-between text-xs text-stone-500 font-medium">
                      <div>{seasonal_night} nights</div>
                      <div>
                        {seasonal_night} x {toCurrency(seasonal_price)}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              {breakfast && (
                <div className="flex justify-between text-sm font-medium">
                  <div>Breakfast</div>
                  <div>{toCurrency(breakfast_price)}</div>
                </div>
              )}
              <div className="flex justify-between text-sm font-medium">
                <div>Taxes & Fees</div>
                <div>
                  {toCurrency(
                    (seasonal_night * seasonal_price +
                      normal_night * normal_price) *
                      0.2,
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Total</div>
                <div className="font-bold">
                  {toCurrency(
                    (seasonal_night * seasonal_price +
                      normal_night * normal_price) *
                      1.2 +
                      breakfast_price,
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
