'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
<<<<<<< HEAD
=======
  FormDescription,
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { listingUploadImagesFormSchema } from '../../../../features/listings/schemas/ListingFormSchema';
import { useToast } from '@/components/ui/use-toast';
import { useNewlisting } from '@/features/listings/hooks/useNewListing';

export const ListingUploadImages = ({ onBack, onNext }: any) => {
  const [images, setImages] = useState([]);
  const { toast } = useToast();
  const { mutationNewListing } = useNewlisting();
  const getCategory = localStorage.getItem('selectedCategory');
  const getGeneralData = localStorage.getItem('listingGeneralDetails');
  const getRoomTypeData = localStorage.getItem('RoomTypeData');

  let general: any;
  if (getGeneralData) {
    const generalData = JSON.parse(getGeneralData);
    general = generalData;
  }
  const getFacilitiesData = localStorage.getItem('listingFacilitiesDetails');
  let facilities: any;
  if (getFacilitiesData) {
    const facilitiesData = JSON.parse(getFacilitiesData);
    facilities = facilitiesData;
  }
  let roomType: any;
  if (getRoomTypeData) {
    if (getRoomTypeData.length >= 1) {
      const roomTypeData = JSON.parse(getRoomTypeData);
      roomType = roomTypeData;
    }
  }

  const form = useForm<z.infer<typeof listingUploadImagesFormSchema>>({
    resolver: zodResolver(listingUploadImagesFormSchema),
    defaultValues: {
      listingImages: '',
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
    } catch (error: any) {
      toast({
        description: `${error.message}`,
      });
      reset();
    }
  };
  const handleBack = () => {
    onBack();
  };

  const onSubmit = async (
    values: z.infer<typeof listingUploadImagesFormSchema>,
  ) => {
    const fd = new FormData();

    const allFacilities: number[] = [];

    if (roomType && roomType.length > 0) {
      roomType.forEach((room: any) => {
        if (room.facilities && room.facilities.length > 0) {
          allFacilities.push(...room.facilities);
        }
      });
    }

    const hotelFacilities = Array.from(new Set(allFacilities));

    fd.append(
      'listingData',
      JSON.stringify({
        title: general?.title || '',
        description: general?.description || '',
        country: general?.country || '',
        categoriesId: Number(getCategory) || 0,
        address: general?.addressDetails || '',
        contact_person: general?.phone || '',
        location_coordinate: general?.coordinate || '',
        city: general?.city || '',
        listing_facilities: facilities
          ? facilities.facilities
          : hotelFacilities,
      }),
    );

    if (images) {
      images.forEach((file) => {
        fd.append(`listingImages`, file);
      });
    }

    if (roomType?.length >= 1) {
      fd.append(
        'roomTypeData',
        JSON.stringify(
          roomType.map((rt: any) => ({
            name: rt.name,
            stock: rt.stock,
            capacity: rt.capacity,
            bed_details: rt.bed_details,
            price: rt.price,
            has_breakfast_option: rt.has_breakfast_option,
            breakfast_price: rt.breakfast_price,
            restrictions: rt.restrictions,
            room_facilities: rt.facilities,
          })),
        ),
      );
    }
    let roomImages = localStorage.getItem('RoomtypeImages');

    if (roomImages) {
      let urls = JSON.parse(roomImages);
      if (urls.length > 0) {
        for (let url of urls) {
          let base64Parts = url.split(',');
          let fileFormat = base64Parts[0].split(';')[0].split(':')[1];
          let base64Data = base64Parts[1];

          let binaryString = atob(base64Data);
          let binaryLength = binaryString.length;
          let bytes = new Uint8Array(binaryLength);

          for (let i = 0; i < binaryLength; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          let file = new File([bytes], 'file_name_here.jpeg', {
            type: fileFormat,
          });
          fd.append('roomtypeImages', file);
        }
      }
    }

    if (roomType == null) {
      fd.append(
        'roomTypeData',
        JSON.stringify([
          {
            name: facilities?.name || '',
            stock: facilities?.stock || 0,
            capacity: Number(facilities?.capacity) || 0,
            bed_details: facilities?.bedding_details || '',
            price: Number(facilities?.price_per_night) || 0,
          },
        ]),
      );
    }

    mutationNewListing(fd, {
      onSuccess: () => {
        localStorage.clear();
        onNext();
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
      <div className="flex items-center justify-center font-semibold text-xl">
<<<<<<< HEAD
        Listing details
=======
        Listing images
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
      </div>
      <div className=" w-3/5 h-full mt-5 flex items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="listingImages"
              render={({ field }) => (
                <FormItem>
<<<<<<< HEAD
                  <FormLabel>Upload images</FormLabel>
=======
                  <FormLabel>Property&apos;s building images</FormLabel>
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
                  <FormControl className="h-44 flex- items-center justify-center">
                    <Input
                      multiple
                      type="file"
                      accept="image/*"
                      {...field}
                      onChange={(event) => {
                        onSetFiles(event);
                        field.onChange(event);
                      }}
                      className=" rounded-2xl h-1/2 flex items-center justify-center"
                    />
                  </FormControl>
<<<<<<< HEAD
=======
                  <FormDescription>
                    *Maximum 5 images, maximum size 1MB each
                  </FormDescription>
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
                  <FormMessage />
                </FormItem>
              )}
            />
<<<<<<< HEAD
            <div className="text-sm text-zinc-500">
              *Maximum 5 images, maximum size 1MB each
=======
            <div className="text-sm text-zinc-500 italic">
              You can share the building&apos;s front view, main areas,
              bathrooms, and any other spaces of the propery here.
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
            </div>
            <div className=" mt-4 flex justify-between items-end">
              <Button
                variant={'ghost'}
                onClick={handleBack}
                className="text-zinc-500 underline underline-offset-2 w-28 h-8 flex items-center justify-center"
              >
                Back
              </Button>
              <Button className="w-28 h-8" type="submit">
                Finish
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
