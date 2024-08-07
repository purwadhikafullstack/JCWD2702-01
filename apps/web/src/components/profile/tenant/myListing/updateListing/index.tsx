import React, { useRef } from 'react';
import { FilePenLine } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { UpdateListingForm } from '@/components/form/updateListingForm/updateListing';
import { UpdateHotelListingForm } from '@/components/form/updateListingForm/updateHotel';
import UpdateListingImageTiles from '../updateListingImageTiles';

export const UpdateListing = ({ item }: any) => {
  const formRef = useRef<any>();
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center gap-1 p-1 px-3 hover:bg-stone-100 rounded-full text-xs font-medium">
        <FilePenLine className="w-4 h-4" /> Edit
      </DrawerTrigger>
      <DrawerContent className="flex flex-col h-full">
        <div className="flex flex-col overflow-auto md:flex-row items-stretch flex-grow md:overflow-hidden md:px-20">
          <div className="flex justify-center flex-shrink-0 overflow-auto mb-4 md:mb-0">
            <UpdateListingImageTiles
              imageCollection={item.listing_images.map((item: any) => {
                return item.image_url;
              })}
            />
          </div>
          <div className="flex flex-col justify-start items-center flex-grow md:pt-8">
            <div className="w-full max-w-3xl p-4 overflow-auto">
              <div className="text-xl font-semibold flex justify-start items-center">
                {item.title}
              </div>
              {item.categoriesId === 10 ? (
                <UpdateHotelListingForm ref={formRef} item={item} />
              ) : (
                <UpdateListingForm ref={formRef} item={item} />
              )}
            </div>
          </div>
        </div>
        <DrawerFooter className="flex items-center justify-center pt-3 bg-zinc-100">
          <Button className="w-44" onClick={() => formRef.current.submitForm()}>
            Save changes
          </Button>
          <DrawerClose>
            <Button variant="outline" className="w-36">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
