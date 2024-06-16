import { BedSingle, UserRound, SunMedium } from 'lucide-react';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
export default function HotelRoomCard({ roomData }: { roomData: any }) {
  return (
    <Card className="flex justify-between p-4 border mb-3">
      <div className="flex">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${roomData.room_images[0].image_url}`}
          width={100}
          height={100}
          alt="Room Image"
          unoptimized
          className="w-[250px] object-cover rounded-lg"
        />
        <div className="flex flex-col text-sm font-medium">
          <div className="font-bold text-xl">{roomData.name}</div>
          <div className="grid grid-cols-2">
            <div className="min-w-96">
              <div className="font-bold">Details</div>
              <div className="text-stone-600">
                <div className="flex items-center">
                  <BedSingle className="w-4"></BedSingle>
                  {roomData.bed_details}
                </div>
                <div className="flex items-center">
                  <UserRound className="w-4" />
                  {roomData.capacity} Guests
                </div>
                <div className="flex items-center">
                  <SunMedium className="w-4" />
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
