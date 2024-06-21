'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { useGetListingsFacilities } from '@/features/listings/hooks/useGetListings';
import { listingRoomtypeFormSchema } from '../../../../features/listings/schemas/ListingFormSchema';
import { useState, useEffect } from 'react';
import { RoomDetailsForm } from './RoomDetailsForm';
import { CreatedRoomTypeCard } from '@/components/cards/CreatedRoomTypeCard';

export const HotelRoomTypePopup = () => {
  const { facilities } = useGetListingsFacilities();
  const [images, setImages] = useState([]);
  const { toast } = useToast();
  const [roomTypeData, setRoomTypeData] = useState<any[]>(() => {
    const savedData = localStorage.getItem('RoomTypeData');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [roomtypeImages, setRoomtypeImages] = useState<any[]>(() => {
    const savedData = localStorage.getItem('RoomtypeImages');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [imagesToBase64, setImagesToBase64] = useState('');

  const form = useForm<z.infer<typeof listingRoomtypeFormSchema>>({
    resolver: zodResolver(listingRoomtypeFormSchema),
    defaultValues: {
      room_name: '',
      price_per_night: '',
      capacity: '',
      restrictions: '',
      bedding_details: '',
      facilities: [],
      breakfast_option: '',
      room_images: '',
      breakfast_charge: '',
      stock: '',
    },
  });
  const { formState, reset } = form;
  const onSetFiles = (event: any) => {
    try {
      const acceptedFormat = ['jpg', 'jpeg', 'webp', 'png'];
      const files: any = [...event.target.files];

      files.forEach((file: any) => {
        if (
          !acceptedFormat.includes(
            file.name.split('.')[file.name.split('.').length - 1],
          )
        ) {
          throw { message: `${file.name} Format Not Acceptable` };
        }
        if (file.size > 1000000) {
          throw {
            message: `${file.name} is too Large! Maximum Filesize is 1Mb`,
          };
        }
      });

      if (files.length > 5) throw { message: 'Selected Files more than 5' };

      setImages(files);

      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.addEventListener('load', () => {
          const url = reader.result;
          setImagesToBase64(url as string);
        });
      }
    } catch (error: any) {
      toast({
        description: `${error.message}`,
      });
      reset();
    }
  };

  const onSubmit = async (
    values: z.infer<typeof listingRoomtypeFormSchema>,
  ) => {
    const fd = new FormData();
    const createdRoomtypeData = {
      name: values.room_name,
      stock: Number(values.stock),
      capacity: Number(values.capacity),
      bed_details: values.bedding_details,
      price: Number(values.price_per_night),
      has_breakfast_option:
        values.breakfast_option === 'yes' ||
        values.breakfast_option === 'already included'
          ? true
          : false,
      breakfast_price: values.breakfast_charge
        ? Number(values.breakfast_charge)
        : 0,
      restrictions: values.restrictions,
      facilities: values.facilities,
      room_images_url: images.map((image) => URL.createObjectURL(image)),
    };

    setRoomTypeData((oldRoomTypeData) => [
      ...oldRoomTypeData,
      createdRoomtypeData,
    ]);

    setRoomtypeImages((oldroom) => [...oldroom, imagesToBase64]);
    reset();
  };

  useEffect(() => {
    localStorage.setItem('RoomTypeData', JSON.stringify(roomTypeData));
    localStorage.setItem('RoomtypeImages', JSON.stringify(roomtypeImages));
  }, [roomTypeData, roomtypeImages]);

  const handleDelete = (index: number) => {
    const updatedRoomTypeData = roomTypeData.filter((_, i) => i !== index);
    const updatedRoomImagesData = roomtypeImages.filter((_, i) => i !== index);
    setRoomTypeData(updatedRoomTypeData);
    setRoomtypeImages(updatedRoomImagesData);
    localStorage.setItem('RoomTypeData', JSON.stringify(updatedRoomTypeData));
    localStorage.setItem(
      'RoomtypeImages',
      JSON.stringify(updatedRoomImagesData),
    );
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4 w-full h-screen pt-24">
      <div className="flex items-center justify-center font-semibold text-xl">
        Listing details
      </div>
      <div className="w-full h-32 flex items-center justify-center">
        <AlertDialog>
          <AlertDialogTrigger className="bg-zinc-200 w-3/4 h-3/4 rounded-xl text-lg font-medium">
            + Add room type
          </AlertDialogTrigger>
          <AlertDialogContent className="min-h-3/4 min-w-[1000px] flex flex-col items-center justify-center">
            <AlertDialogHeader className="w-full">
              <AlertDialogTitle className="w-full flex  items-center justify-center">
                <div className="w-1/2">
                  <AlertDialogCancel
                    className="border-none text-zinc-600"
                    onClick={() => {
                      reset();
                      setImages([]);
                    }}
                  >
                    x
                  </AlertDialogCancel>
                </div>
                <div className="w-1/2 mr-28">Room Details</div>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <div className="w-full h-full pt-7 flex items-center justify-center">
                  <RoomDetailsForm
                    form={form}
                    onSubmit={onSubmit}
                    onSetFiles={onSetFiles}
                    facilities={facilities}
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="grid gird-cols-2 w-full">
        {roomTypeData?.map((item: any, index: any) => {
          return (
            <CreatedRoomTypeCard
              item={item}
              index={index}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};
