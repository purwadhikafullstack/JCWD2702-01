'use client';

import { Trash } from 'lucide-react';
import Image from 'next/image';

export const CreatedRoomTypeCard = ({ item, index, handleDelete }: any) => {
  return (
    <div className="w-full">
      <div className="h-auto w-full bg-transparent shadow-lg rounded-xl">
        <div className="w-full h-44 flex justify-around gap-4 p-3">
          <div className="flex-1 rounded-xl relative">
            <Image
              src={item.room_images_url[0]}
              alt={`Room Type ${index + 1}`}
              className="rounded-xl object-cover"
              fill
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
          <div className="flex-initial w-60 grow flex flex-col gap-1">
            <div className="text-lg text-pretty font-bold">{item.name}</div>
            <div className="text-xs text-pretty">{item.bed_details}</div>
            <div className="text-base font-semibold pt-3">
              {item.price?.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}{' '}
              / night
            </div>
          </div>
          <div>
            <Trash
              className="w-5 h-5  cursor-pointer"
              onClick={() => handleDelete(index)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
