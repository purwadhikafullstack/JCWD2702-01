'use client';

import { useState, useEffect } from 'react';
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
            <AlertDialogTitle className="w-full flex items-center justify-center">
              <div className="flex-none items-center justify-start">
                <AlertDialogCancel className="border-none text-zinc-600">
                  x
                </AlertDialogCancel>
              </div>
              <div className="flex flex-1 items-center justify-center text-2xl pr-4">
                {selectedListing
                  ? 'Set Seasonal Price'
                  : 'Select listing to set'}
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedListing ? (
                <>
                  <SetSeasonalPriceForm listing={selectedListing} />
                  <Button variant="ghost" onClick={handleBackToListings}>
                    {'<'}
                  </Button>
                </>
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
