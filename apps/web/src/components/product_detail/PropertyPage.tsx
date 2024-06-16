import Image from 'next/image';
import { Badge } from '../ui/badge';
import ImageTiles from './ImageTiles';
import { Button } from '../ui/button';
import RenderStars from '../cores/RenderStars';
import { Baby, Dog, Ellipsis, MapPin, User } from 'lucide-react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Calendar } from '../ui/calendar';
import { FacilityBadge } from '../cores/FacilityBadge';
import { useState, useCallback } from 'react';
import {
  Interval,
  addDays,
  areIntervalsOverlapping,
  closestTo,
  differenceInDays,
  eachDayOfInterval,
  getOverlappingDaysInIntervals,
  isWithinInterval,
  subDays,
} from 'date-fns';
import { DateRange, DayContentProps } from 'react-day-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
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
import { toast } from '@/components/ui/use-toast';
import { CounterComponent } from '../cores/searchbar/CounterComponent';
import { useRouter } from 'next/navigation';
import FilterCard from './filter_card/FilterCard';

export default function PropertyPage({
  data,
  imageCollection,
}: {
  data: any;
  imageCollection: string[];
}) {
  const router = useRouter();
  const listingId = data.id;
  const room_typesId = data.room_types[0].id;

  const bookings = [...data.room_types[0].bookings].map((x) => ({
    from: new Date(x.start_date),
    to: subDays(new Date(x.end_date), 1),
  }));

  const nonavailabilities = [...data.room_types[0].nonavailability].map(
    (x) => ({
      from: new Date(x.start_date),
      to: new Date(x.end_date),
    }),
  );

  const no_book = [...bookings, ...nonavailabilities];

  const seasonal_prices = [...data.room_types[0].seasonal_prices].map((x) => ({
    start: new Date(new Date(x.start_date).setHours(0, 0, 0, 0)),
    end: new Date(x.end_date),
    price: Number(x.price),
  }));

  // console.log(priceBasedOnRange);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  if (isLoaded)
    return (
      <div className="py-32 mx-12 lg:w-[70vw] lg:mx-auto">
        <ImageTiles imageCollection={imageCollection} />
        <div className=" mt-6 flex w-full items-start gap-8">
          <div className="h-screen w-full">
            <div id="Title">
              <div className="font-semibold text-lg">
                {data.tenant.display_name}
              </div>
              <div className="text-3xl font-bold">{data.title}</div>
              <div className="flex items-center gap-2">
                <RenderStars rating={5}></RenderStars> ({data.avg_rating})
              </div>

              <div className="flex font-medium text-stone-600">
                <MapPin className="p-1" /> {data.city}, {data.country}
              </div>
              <Badge variant={'secondary'}>{data.category.category}</Badge>
            </div>
            <div id="Description">
              <div className="text-lg w-80 font-bold">Description</div>
              <div className="text-sm">{data.description}</div>
            </div>
            <div id="Amenities">
              <div className="text-lg w-80 font-bold">Amenities</div>
              <div className="grid lg:w-[40%] grid-rows-5 grid-cols-2">
                {data.listing_facilities.slice(0, 9).map((x: any) => (
                  <div className="">
                    <FacilityBadge
                      icon={true}
                      text={x.facility.facility}
                    ></FacilityBadge>
                  </div>
                ))}
                <Button
                  variant={'outline'}
                  size={'sm'}
                  className="flex items-center font-medium text-stone-600"
                >
                  Show all
                </Button>
              </div>
            </div>
            <div id="Restrictions">
              <div className="text-lg w-80 font-bold">Restrictions</div>
            </div>
            <div id="Location">
              <div className="text-lg w-80 font-bold">Location</div>
              <div className="grid gap-2">
                <div>{data.address}</div>
                <GoogleMap
                  zoom={15}
                  center={data.location_coordinate}
                  mapContainerStyle={{
                    height: '250px',
                    width: 'auto',
                    borderRadius: '10px',
                  }}
                >
                  <Marker position={data.location_coordinate} />
                </GoogleMap>
              </div>
            </div>
            <div id="Reviews">
              <div className="text-lg w-full font-bold">Reviews</div>
            </div>
          </div>
          {/* <FilterCard
            no_book={no_book}
            seasonal_prices={seasonal_prices}
            data={data}
            listingId={listingId}
            room_typesId={room_typesId}
          /> */}
        </div>
      </div>
    );
}
