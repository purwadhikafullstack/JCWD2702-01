import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Badge } from '../ui/badge';
import HotelRoomCard from '../cards/HotelRoomCard';
import RenderStars from '../cores/RenderStars';
import ImageTiles from './ImageTiles';
import { FacilityBadge } from '../cores/FacilityBadge';

export default function HotelPage({
  data,
  imageCollection,
}: {
  data: any;
  imageCollection: string[];
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  if (isLoaded)
    return (
      <div className="py-32 w-[60vw] mx-auto">
        <ImageTiles imageCollection={imageCollection}></ImageTiles>
        <div className="grid gap-3">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="grid justify-items-center">
                <div className="font-bold text-4xl">4.8</div>
                <RenderStars rating={5} />
                <div className="">32 reviews</div>
              </div>
              <div className="">
                <div className="font-semibold">{data.tenant.display_name}</div>

                <div className="text-2xl font-bold">{data.title}</div>
                <div className="font-medium text-stone-600">
                  {data.city + ', ' + data.country}
                </div>
              </div>
            </div>
            <Badge variant={'secondary'} className="text-md">
              {data.category.category}
            </Badge>
          </div>
          <div className="">{data.description}</div>
        </div>
        <div className="flex gap-3">
          <div className="w-[50%]">
            <div className="text-lg font-bold">Facilities & amenities</div>
            <div>
              {data.listing_facilities.map((x: any) => (
                <div className="mb-2">
                  <FacilityBadge
                    icon={true}
                    text={x.facility.facility}
                  ></FacilityBadge>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            <div className="text-lg w-80 font-bold">Location</div>
            <div className="grid gap-2">
              <div>{data.address}</div>
              <GoogleMap
                zoom={15}
                center={data.location_coordinate}
                mapContainerStyle={{
                  height: '200px',
                  width: 'auto',
                  borderRadius: '10px',
                }}
              >
                <Marker position={data.location_coordinate} />
              </GoogleMap>
            </div>
          </div>
        </div>
        <div>
          <div className="text-lg font-bold">Rooms</div>
          {data.room_types.map((x: any, i: number) => (
            <HotelRoomCard roomData={x} />
          ))}
        </div>
        <div>
          <div className="text-lg font-bold">Reviews</div>
          <div>Them reviews</div>
        </div>
      </div>
    );
}
