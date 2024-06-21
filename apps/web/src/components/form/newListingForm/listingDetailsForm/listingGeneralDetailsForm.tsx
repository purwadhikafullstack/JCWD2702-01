'use client';

import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { listingGeneralDetailsFormSchema } from '../../../../features/listings/schemas/ListingFormSchema';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import AutocompleteInput from './listingDetailsAutoComplete';

const ListingGeneralDetails = ({ onNext, onBack }: any) => {
  const center = useMemo(() => ({ lat: 53.54, lng: 10 }), []);
  const [mapCenter, setMapCenter] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(center);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  const form = useForm({
    resolver: zodResolver(listingGeneralDetailsFormSchema),
    defaultValues: {
      title: '',
      location: '',
      addressDetails: '',
      phone: '',
      description: '',
    },
  });

  const { setValue, watch, getValues } = form;
  const locationValue = watch('location');

  useEffect(() => {
    const getData = localStorage.getItem('listingGeneralDetails');
    if (getData) {
      const data = JSON.parse(getData);
      setValue('title', data.title);
      setValue('location', data.location);
      setValue('addressDetails', data.addressDetails);
      setValue('phone', data.phone);
      setValue('description', data.description);
      if (data.coordinate) {
        setMapCenter(data.coordinate);
        setMarkerPosition(data.coordinate);
      }
    }
  }, [setValue]);

  useEffect(() => {
    if (locationValue) {
      const splitLocation = locationValue.split(',');
      if (splitLocation.length === 4) {
        const coordinate = {
          lat: Number(splitLocation[0]),
          lng: Number(splitLocation[1]),
        };
        setMapCenter(coordinate);
        setMarkerPosition(coordinate);
      }
    }
  }, [locationValue]);

  const onSubmit = (values: any) => {
    const splitLocation = values.location.split(',');
    const coordinate = {
      lat: Number(splitLocation[0]),
      lng: Number(splitLocation[1]),
    };
    const city = splitLocation[2];
    const country = splitLocation[3];

    const submittedValues = {
      ...values,
      coordinate,
      city,
      country,
    };

    localStorage.setItem(
      'listingGeneralDetails',
      JSON.stringify(submittedValues),
    );
    onNext();
  };

  const handleLocationChange = (location: string) => {
    setValue('location', location);
    localStorage.setItem(
      'listingGeneralDetails',
      JSON.stringify({ ...getValues(), location }),
    );
  };

  if (isLoaded)
    return (
      <div className="flex flex-col gap-4 pb-40 pt-32 w-full items-center justify-center">
        <div className="flex items-center justify-center font-semibold text-xl">
          Listing details
        </div>
        <div className="w-3/5 h-full flex items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl className="h-44 flex- items-center justify-center">
                      <Input
                        type="text"
                        placeholder="title"
                        {...field}
                        className="rounded-2xl h-1/2 flex items-center justify-center"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl className="h-44 flex- items-center justify-center">
                      <Input
                        type="text"
                        placeholder="description"
                        {...field}
                        className="rounded-2xl h-1/2 flex items-center justify-center"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl className="w-full h-9 flex- items-center justify-center">
                      <AutocompleteInput
                        setValue={setValue}
                        onSelect={handleLocationChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <GoogleMap
                zoom={15}
                center={mapCenter}
                mapContainerStyle={{
                  height: '200px',
                  width: 'auto',
                  borderRadius: '10px',
                }}
              >
                <Marker position={markerPosition} />
              </GoogleMap>
              <FormField
                control={form.control}
                name="addressDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address details</FormLabel>
                    <FormControl className="h-44 flex- items-center justify-center">
                      <Input
                        type="text"
                        placeholder="address"
                        {...field}
                        className="rounded-2xl h-1/2 flex items-center justify-center"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl className="h-44 flex- items-center justify-center">
                      <Input
                        type="text"
                        placeholder="phone"
                        {...field}
                        className="rounded-2xl h-1/2 flex items-center justify-center"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" mt-4 flex justify-between items-end">
                <Button
                  variant={'ghost'}
                  className=" text-zinc-500 underline underline-offset-2 w-28 h-8 flex items-center justify-center"
                  onClick={onBack}
                >
                  Back
                </Button>
                <Button className=" w-28 h-8" type="submit">
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
};

export default ListingGeneralDetails;
