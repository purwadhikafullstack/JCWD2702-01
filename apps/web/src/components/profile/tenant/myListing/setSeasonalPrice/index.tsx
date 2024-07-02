'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import GetMyListings from '../getMyListing';
import { SetSeasonalPriceForm } from '@/components/form/setSeasonalPriceForm';
import { IMyListing } from '../type';

export default function SetSeasonalPrice() {
  const [selectedListing, setSelectedListing] = useState<IMyListing | null>(
    null,
  );

  const handleSelectListing = (listing: IMyListing) => {
    setSelectedListing(listing);
  };

  const handleBackToListings = () => {
    setSelectedListing(null);
  };
  return (
    <div className="flex items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button className="h-7 bg-zinc-200 text-black flex items-center justify-center">
            Set Seasonal Price
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="min-h-3/4 min-w-[1000px] flex flex-col items-center justify-center">
          <AlertDialogHeader className="w-full">
            <AlertDialogTitle className="w-full flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBackToListings}
                className={`${selectedListing ? 'flex' : 'hidden'}`}
              >
                {'<'}
              </Button>
              <div className="flex items-center justify-center text-2xl">
                <div className="flex flex-col items-center justify-center">
                  {selectedListing
                    ? 'Set Seasonal Price'
                    : 'Select a listing to set'}
                  <div className="text-sm font-normal flex justify-center items-center">
                    {selectedListing ? selectedListing.title : ''}
                  </div>
                </div>
              </div>
              <AlertDialogCancel className="border-none text-zinc-600">
                x
              </AlertDialogCancel>
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedListing ? (
                <SetSeasonalPriceForm listing={selectedListing} />
              ) : (
                <GetMyListings onSelectListing={handleSelectListing} />
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
