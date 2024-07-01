import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Badge } from '../ui/badge';
import HotelRoomCard from '../cards/HotelRoomCard';
import RenderStars from '../cores/RenderStars';
import ImageTiles from './ImageTiles';
import { FacilityBadge } from '../cores/FacilityBadge';
import FilterCard from './filter_card/FilterCard';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { GuestReviewCard } from '../cards/GuestReviewCard';
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
            <div>
              <div className="text-lg font-bold">Rooms</div>
              {data.categoriesId === 10 &&
                data.room_types.map((x: any, i: number) => (
                  <HotelRoomCard roomData={x} />
                ))}
            </div>
            <div>
              <div className="text-lg font-bold">Reviews</div>
              {data.reviews.map((x: any, i: number) => (
                <GuestReviewCard review={x} id={x.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
