import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Badge } from '../ui/badge';
import HotelRoomCard from '../cards/HotelRoomCard';
import ImageTiles from './ImageTiles';
import { FacilityBadge } from '../cores/FacilityBadge';
import FilterCard from './filter_card/FilterCard';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { GuestReviewCard } from '../cards/GuestReviewCard';
import { CommentRatings } from '../ui/rating';
import { Separator } from '../ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function PropertyPage({
  data,
  imageCollection,
  startDate,
  endDate,
  adults,
  children,
}: {
  data: any;
  imageCollection: string[];
  startDate?: string;
  endDate?: string;
  adults?: string;
  children?: string;
}) {
  const [currentRoom, setCurrentRoom] = useState(0);
  console.log(data);
  const listingId = data.id;
  const room_typesId = data.room_types[currentRoom].id;
  // console.log(data);
  // const bookings = [...data.room_types[currentRoom].bookings]
  //   .filter((x) => x.booking_statusId < 4)
  //   .map((x) => ({
  //     from: new Date(x.start_date),
  //     to: subDays(new Date(x.end_date), 1),
  //   }));

  const bookings = [...data.room_types[currentRoom].bookings].filter(
    (x) => x.booking_statusId < 4,
  );
  console.log(bookings);
  const nonavailabilities = [
    ...data.room_types[currentRoom].nonavailability,
  ].map((x) => ({
    from: new Date(x.start_date),
    to: new Date(x.end_date),
  }));

  const no_book = [...bookings, ...nonavailabilities];

  const seasonal_prices = [...data.room_types[currentRoom].seasonal_prices].map(
    (x) => ({
      start: new Date(new Date(x.start_date).setHours(0, 0, 0, 0)),
      end: new Date(x.end_date),
      price: Number(x.price),
    }),
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  const selectRoomId = (index: number) => {
    setCurrentRoom(index);
  };

  if (isLoaded)
    return (
      <div className="py-32 w-[85vw] xl:w-[70vw] mx-auto">
        <ImageTiles imageCollection={imageCollection}></ImageTiles>
        <div className=" mt-6 grid md:flex items-start gap-8">
          <div className="md:hidden" id="Title">
            <div className="flex font-medium text-stone-600">
              <MapPin className="p-1" /> {data.city}, {data.country}
            </div>
            <div className="text-3xl font-bold">{data.title}</div>
            <div className=" flex text-lg gap-2 items-center pt-2">
              <div className="font-semibold flex gap-2 items-center">
                <Badge className="text-base" variant={'secondary'}>
                  {data.category.category}
                </Badge>
                by
                <div className="hover:underline hover:cursor-default">
                  {data.tenant.display_name}
                </div>
              </div>
              |
              <div className="flex items-center gap-2">
                <CommentRatings
                  size={20}
                  rating={data.avg_rating}
                  showCurrentRating={false}
                  disabled={true}
                />
                ({data.reviews.length})
              </div>
            </div>
          </div>
          <FilterCard
            className={
              'block md:order-3 border md:w-[450px] md:sticky md:top-24'
            }
            no_book={nonavailabilities}
            seasonal_prices={seasonal_prices}
            data={data}
            listingId={listingId}
            room_typesId={data.room_types[currentRoom].id}
            room_typesIndex={currentRoom}
            updateCurrentRoom={selectRoomId}
            breakfast_option={data.room_types[currentRoom].has_breakfast_option}
            breakfast_price={data.room_types[currentRoom].breakfast_price}
            startDate={startDate}
            endDate={endDate}
            adults={adults}
            children={children}
          ></FilterCard>
          <div className="w-full">
            <div className="hidden md:block" id="Title">
              <div className="flex font-medium text-stone-600">
                <MapPin className="p-1" /> {data.city}, {data.country}
              </div>
              <div className="text-3xl font-bold">{data.title}</div>
              <div className=" flex text-lg gap-2 items-center pt-2">
                <div className="font-semibold flex gap-2 items-center">
                  <Badge className="text-base" variant={'secondary'}>
                    {data.category.category}
                  </Badge>
                  by
                  <div className="hover:underline hover:cursor-default">
                    {data.tenant.display_name}
                  </div>
                </div>
                |
                <div className="flex items-center gap-2">
                  <CommentRatings
                    size={20}
                    rating={data.avg_rating}
                    showCurrentRating={false}
                    disabled={true}
                  />
                  ({data.reviews.length})
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-5">
              <div id="Description" className="grid gap-2">
                <div className="text-xl w-80 font-bold">Description</div>
                <div className="font-medium text-stone-600">
                  {data.description}
                </div>
              </div>
              <div id="Amenities" className="grid gap-2">
                <div className="text-xl w-80 font-bold">Amenities</div>
                <div className="grid grid-cols-2 gap-2 lg:w-[40%]">
                  {data.listing_facilities.slice(0, 9).map((x: any) => (
                    <div className="">
                      <FacilityBadge
                        icon={true}
                        text={x.facility.facility}
                      ></FacilityBadge>
                    </div>
                  ))}
                  {data.listing_facilities.length > 9 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-start font-medium text-stone-600">
                          Show more
                        </TooltipTrigger>
                        <TooltipContent className="grid gap-3">
                          {data.listing_facilities.slice(9).map((x: any) => (
                            <div className="">
                              <FacilityBadge
                                icon={true}
                                text={x.facility.facility}
                              ></FacilityBadge>
                            </div>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
              <div id="Location" className="grid gap-2">
                <div className="text-xl w-80 font-bold">Location</div>
                <div className="grid gap-2">
                  <div className="font-medium text-stone-600">
                    {data.address}
                  </div>
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
              {data.categoriesId === 10 && (
                <div id="Rooms" className="grid gap-2">
                  <div className="text-xl w-80 font-bold">Rooms</div>
                  {data.room_types.map((x: any, i: number) => (
                    <HotelRoomCard roomData={x} />
                  ))}
                </div>
              )}
              {data.reviews.length > 0 && (
                <div id="Reviews" className="grid gap-2">
                  <div className="text-xl w-80 font-bold">Reviews</div>
                  {data.reviews.map((x: any, i: number) => (
                    <GuestReviewCard review={x} id={x.id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}
