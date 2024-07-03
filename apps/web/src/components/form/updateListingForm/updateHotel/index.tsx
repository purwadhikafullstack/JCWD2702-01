'use client';

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { updateListingFormSchema } from '@/features/listings/schemas/ListingFormSchema';
import { ListingForm } from './ListingForm';
import { RoomTypeForm } from './RoomTypeForm';
import { useUpdateListing } from '@/features/listings/hooks/useUpdateListing';

const UpdateHotelListingForm = forwardRef(({ item }: any, ref) => {
  const [images, setImages] = useState([]);
  const [roomtypeImages, setRoomtypeImages] = useState([]);
  const { mutationUpdateListing } = useUpdateListing();
  const [roomTypeIndex, setRoomTypeIndex] = useState(null);
  const listing_id = item.id;
  const listing_description = item.description;

  const form = useForm<z.infer<typeof updateListingFormSchema>>({
    resolver: zodResolver(updateListingFormSchema),
    defaultValues: {
      listing_id: listing_id,
      title: '',
      price: '',
      bedding_details: '',
      description: listing_description,
      listing_images: '',
      facilities: [],
      room_types: 0,
      room_types_name: '',
      room_types_images: '',
    },
  });
  useEffect(() => {
    if (roomTypeIndex !== null) {
      const selectedRoom = item.room_types[roomTypeIndex];
      const checkedFacilities = selectedRoom.room_facilities.map(
        (item: any) => {
          return item.facilitiesId;
        },
      );
      form.setValue('facilities', checkedFacilities);
    }
  }, [roomTypeIndex, form, item.room_types]);

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

      if (files.length > 1) throw { message: 'Selected Files more than 1' };

      setImages(files);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onSetRoomtypeFiles = (event: any) => {
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

      if (files.length > 1) throw { message: 'Selected Files more than 1' };

      setRoomtypeImages(files);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onSubmit = async (values: z.infer<typeof updateListingFormSchema>) => {
    const fd = new FormData();

    const allFacilities: number[] = [];
    item.room_types.forEach((room: any) => {
      if (room.room_facilities && room.room_facilities.length > 0) {
        room.room_facilities.forEach((facility: any) => {
          allFacilities.push(facility.facilitiesId);
        });
      }
    });
    const hotelFacilities = Array.from(new Set(allFacilities));

    fd.append(
      'listingData',
      JSON.stringify({
        listing_id: values.listing_id,
        title: values.title || '',
        description: values.description || '',
        listing_facilities: hotelFacilities,
      }),
    );
    fd.append(
      'roomTypeData',
      JSON.stringify({
        room_types: values.room_types,
        room_types_name: values.room_types_name || '',
        price: Number(values.price) || '',
        bedding_details: values.bedding_details || '',
        room_facilities: values.facilities,
      }),
    );
    if (images) {
      images.forEach((file) => {
        fd.append(`listingImages`, file);
      });
    }

    if (roomtypeImages) {
      roomtypeImages.forEach((file) => {
        fd.append(`roomtypeImages`, file);
      });
    }

    mutationUpdateListing(fd);
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => form.handleSubmit(onSubmit)(),
  }));
  return (
    <div className="py-4 flex flex-col items-center justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-7 w-full"
        >
          <div className="flex flex-col items-center gap-3 w-full">
            <ListingForm
              item={item}
              form={form}
              setRoomTypeIndex={setRoomTypeIndex}
              onSetFiles={onSetFiles}
            />
            {roomTypeIndex != null ? (
              <RoomTypeForm
                item={item}
                roomTypeIndex={roomTypeIndex}
                form={form}
                onSetRoomtypeFiles={onSetRoomtypeFiles}
              />
            ) : (
              <div></div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
});

UpdateHotelListingForm.displayName = 'UpdateHotelListingForm';

export { UpdateHotelListingForm };
