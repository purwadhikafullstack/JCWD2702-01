import { BedSingle, UserRound, SunMedium } from 'lucide-react';
import Image from 'next/image';
import { Card } from '../ui/card';
import { AspectRatio } from '../ui/aspect-ratio';
export default function HotelRoomCard({ roomData }: { roomData: any }) {
  return (
    <Card className="flex justify-between p-4 border mb-3">
      <div className="flex gap-5">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${roomData.room_images[0].image_url}`}
          width={100}
          height={100}
          alt="Room Image"
          unoptimized
          className="w-[250px] object-cover rounded-lg"
        />
        <div className="flex flex-col text-sm font-medium gap-2">
          <div className="font-bold text-xl">{roomData.name}</div>
          <div className="lg:min-w-96">
            <div className="font-semibold text-stone-500">Details</div>
            <div className="text-stone-600 font-medium">
              <div className="flex items-start gap-1">
                <BedSingle className="w-4"></BedSingle>
                <div className="flex flex-wrap">{roomData.bed_details}</div>
              </div>
              <div className="flex items-start gap-1">
                <UserRound className="w-4" />
                {roomData.capacity} Guests
              </div>
              <div className="flex items-start gap-1">
                <SunMedium className="w-4" />
                <div className="flex flex-wrap">
                  {roomData.breakfast_price && roomData.has_breakfast_option
                    ? 'Breakfast option available'
                    : roomData.has_breakfast_option
                      ? 'Breakfast already included'
                      : 'Breakfast not included'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
