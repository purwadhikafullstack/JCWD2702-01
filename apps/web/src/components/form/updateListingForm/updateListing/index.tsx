'use client';

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import * as z from 'zod';
import { updateListingFormSchema } from '@/features/listings/schemas/ListingFormSchema';
import { useGetListingsFacilities } from '@/features/listings/hooks/useGetListings';
import { useUpdateListing } from '@/features/listings/hooks/useUpdateListing';
import { ListingForm } from './ListingForm';

const UpdateListingForm = forwardRef(({ item }: any, ref) => {
  const [images, setImages] = useState([]);
  const { mutationUpdateListing } = useUpdateListing();
  const { facilities } = useGetListingsFacilities();
  const checkedFacilities: any = item.listing_facilities.map((item: any) => {
    return item.facilitiesId;
  });
  const room_types = item.room_types[0].id;
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
      facilities: checkedFacilities || [],
      room_types: room_types,
      room_types_name: '',
      room_types_images: '',
    },
  });

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

  const onSubmit = async (values: z.infer<typeof updateListingFormSchema>) => {
    const fd = new FormData();

    fd.append(
      'listingData',
      JSON.stringify({
        listing_id: values.listing_id,
        title: values.title || '',
        description: values.description || '',
        listing_facilities: values.facilities,
      }),
    );
    fd.append(
      'roomTypeData',
      JSON.stringify({
        room_types: values.room_types,
        room_types_name: values.room_types_name || '',
        price: Number(values.price) || '',
        bedding_details: values.bedding_details || '',
      }),
    );
    if (images) {
      images.forEach((file) => {
        fd.append(`listingImages`, file);
      });
    }

    mutationUpdateListing(fd);
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => form.handleSubmit(onSubmit)(),
  }));

  return (
    <div className="py-4 flex flex-col items-start justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-7 w-full"
        >
          <ListingForm
            form={form}
            item={item}
            facilities={facilities}
            onSetFiles={onSetFiles}
          />
        </form>
      </Form>
    </div>
  );
});

UpdateListingForm.displayName = 'UpdateListingForm';

export { UpdateListingForm };
