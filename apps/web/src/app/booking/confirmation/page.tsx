'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Separator } from '@/components/ui/separator';
import RenderStars from '@/components/cores/RenderStars';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { toCurrency } from '@/components/cores/ToCurrency';
import { useGetListingById } from '@/features/listings/hooks/useGetListings';
import Image from 'next/image';
import Loading from '@/app/loading';

import BookingConfirmationForm from '@/components/form/bookingConfirmationForm';
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

  const details = {
    normal_night,
    normal_price,
    seasonal_night,
    seasonal_price,
    include_breakfast: breakfast,
    breakfast_price,
    taxes_and_fees:
      (seasonal_night * seasonal_price + normal_night * normal_price) * 0.2,
  };

  const { listingById } = useGetListingById({ id: listingsId as string });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      total_price:
        (seasonal_night * seasonal_price + normal_night * normal_price) * 1.2 +
        (breakfast && breakfast_price ? breakfast_price : 0),
      start_date: checkin as string,
      end_date: checkout as string,
      num_of_guests: adults + children,
      email: '',
      phone: '',
      payment: 1,
    },
  });

  if (!listingById) return <Loading></Loading>;
  return (
    <div className="my-32 w-[1000px] mx-auto">
      <div className="font-bold text-2xl mb-10">Booking confirmation</div>
      <div className="grid grid-cols-5 gap-16">
        <div className="col-span-3">
          <div>
            <BookingConfirmationForm
              form={form}
              formSchema={formSchema}
              room_typesId={room_typesId}
              details={details}
            />
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
