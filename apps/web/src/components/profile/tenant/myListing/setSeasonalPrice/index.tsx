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
import { ChevronLeft, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="h-7 text-xs md:text-sm bg-stone-200 hover:bg-stone-300 text-black flex items-center justify-center">
            Set Seasonal Price
          </Button>
        </DialogTrigger>
        <DialogContent className="min-h-3/4 min-w-[1000px] flex flex-col items-center justify-center">
          <DialogHeader className="w-full">
            <DialogTitle className="w-full flex items-center">
              <Button
                variant="ghost"
                onClick={handleBackToListings}
                className={`${selectedListing ? 'flex' : 'hidden'}`}
              >
                <ChevronLeft></ChevronLeft>
              </Button>
            </DialogTitle>
            <DialogDescription>
              {selectedListing ? (
                <div className="mb-8">
                  <div className="flex items-center justify-center font-bold text-xl">
                    <div className="flex flex-col items-center justify-center">
                      Set Seasonal Price
                      <div className="text-sm font-normal flex justify-center items-center">
                        {selectedListing.title}
                      </div>
                    </div>
                  </div>
                  <SetSeasonalPriceForm listing={selectedListing} />
                </div>
              ) : (
                <div>
                  <div className="font-semibold text-2xl mb-5">
                    Select a listing to set
                  </div>
                  <GetMyListings onSelectListing={handleSelectListing} />
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
