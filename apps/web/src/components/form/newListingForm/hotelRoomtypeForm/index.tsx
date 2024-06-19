'use client';

import { HotelRoomTypePopup } from './RoomtypePopup';
import { Button } from '@/components/ui/button';

export const HotelRoomTypeForm = ({ onNext, onBack }: any) => {
  const handleBack = () => {
    onBack();
  };
  const handleNext = () => {
    onNext();
  };
  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <HotelRoomTypePopup />
      </div>
      <div className=" pb-24 pt-8 flex justify-between items-center">
        <Button
          variant={'ghost'}
          onClick={handleBack}
          className="text-zinc-500 underline underline-offset-2 w-28 h-8 flex items-center justify-center"
        >
          Back
        </Button>
        <Button className="w-28 h-8" type="submit" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};
