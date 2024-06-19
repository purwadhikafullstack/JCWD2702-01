'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { useGetListingsFacilities } from '@/features/listings/hooks/useGetListings';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { FacilityBadge } from '@/components/cores/FacilityBadge';
import { listingRoomtypeFormSchema } from '../../../../features/listings/schemas/ListingFormSchema';
import { useState, useEffect } from 'react';
import { Trash } from 'lucide-react';

export const HotelRoomTypePopup = () => {
  const { facilities } = useGetListingsFacilities();
  const [images, setImages] = useState([]);
  const { toast } = useToast();
  const [showBreakfastCharge, setShowBreakfastCharge] = useState(false);
  const [roomTypeData, setRoomTypeData] = useState<any[]>(() => {
    const savedData = localStorage.getItem('RoomTypeData');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [roomtypeImages, setRoomtypeImages] = useState<any[]>(() => {
    const savedData = localStorage.getItem('RoomtypeImages');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [imagesToBase64, setImagesToBase64] = useState(null);

  // const getCreatedRoomType = localStorage.getItem('RoomTypeData');
  // let createdRoomType: any;
  // if (getCreatedRoomType) {
  //   createdRoomType = JSON.parse(getCreatedRoomType);
  // }
  // const getCreatedRoomtypeImages = localStorage.getItem('RoomtypeImages');
  // let createdRoomtypeImages: any;
  // if (getCreatedRoomtypeImages) {
  //   createdRoomtypeImages = JSON.parse(getCreatedRoomtypeImages);
  // }

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
  const { isDirty } = formState;
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
          localStorage.setItem('my-images', url as string);
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
    console.log({ RoomtypeValues: values });
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
      breakfast_price: showBreakfastCharge
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
    console.log(roomTypeData);
    console.log({ roomtypeImages: roomtypeImages });
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
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex items-start gap-7"
                    >
                      <div className="flex flex-col gap-5">
                        <div className="flex gap-7">
                          <div className="flex flex-col gap-3 w-80">
                            <FormField
                              control={form.control}
                              name="room_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Room name</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="Room name"
                                      {...field}
                                      className="rounded-full bg-zinc-100"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="price_per_night"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price per night</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="price"
                                      {...field}
                                      className="rounded-full bg-zinc-100"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="capacity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Capacity</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="capacity"
                                      {...field}
                                      className="rounded-full bg-zinc-100"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="stock"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Stock</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="stock"
                                      {...field}
                                      className="rounded-full bg-zinc-100"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="restrictions"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Restrictions</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="restrictions"
                                      {...field}
                                      className="rounded-full bg-zinc-100"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="bedding_details"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bedding Details</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="bedding details"
                                      {...field}
                                      className="rounded-full bg-zinc-100"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex flex-col items-start gap-3 w-80">
                            <div className="font-semibold">Facilities</div>
                            <ScrollArea className="h-64 w-80 rounded-md border bg-zinc-100">
                              <div className="p-4">
                                <Controller
                                  name="facilities"
                                  control={form.control}
                                  render={({ field }) => (
                                    <>
                                      {facilities ? (
                                        facilities.map(
                                          (item: any, index: number) => (
                                            <div
                                              key={item.id}
                                              className="flex gap-2 items-center"
                                            >
                                              <Checkbox
                                                checked={field.value.includes(
                                                  item.id,
                                                )}
                                                onCheckedChange={(checked) => {
                                                  const newValue = checked
                                                    ? [...field.value, item.id]
                                                    : field.value.filter(
                                                        (id: number) =>
                                                          id !== item.id,
                                                      );
                                                  field.onChange(newValue);
                                                }}
                                              />
                                              <FacilityBadge
                                                icon={true}
                                                text={item.facility}
                                              />
                                            </div>
                                          ),
                                        )
                                      ) : (
                                        <div>Loading</div>
                                      )}
                                    </>
                                  )}
                                />
                              </div>
                            </ScrollArea>
                            <FormField
                              control={form.control}
                              name="breakfast_option"
                              render={({ field }) => (
                                <FormItem className=" pt-1">
                                  <FormLabel>Breakfast option</FormLabel>
                                  <FormControl>
                                    <select
                                      name="breakfast_option"
                                      id="breakfast_option"
                                      className="rounded-full bg-zinc-100 w-80 h-10 border"
                                      value={field.value}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value);
                                        setShowBreakfastCharge(value === 'yes');
                                      }}
                                    >
                                      <option value="" disabled>
                                        Breakfast option
                                      </option>
                                      <option value="yes">Yes</option>
                                      <option value="no">No</option>
                                      <option value="already included">
                                        Already included
                                      </option>
                                    </select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {showBreakfastCharge && (
                              <FormField
                                control={form.control}
                                name="breakfast_charge"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormLabel>Breakfast charge</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        placeholder="Breakfast charge"
                                        {...field}
                                        className="rounded-full bg-zinc-100 w-80"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </div>
                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="room_images"
                            render={({ field }) => (
                              <FormItem className=" pt-1">
                                <FormLabel>Upload images</FormLabel>
                                <FormControl>
                                  <Input
                                    multiple
                                    type="file"
                                    accept="image/*"
                                    {...field}
                                    onChange={(event) => {
                                      onSetFiles(event);
                                      field.onChange(event);
                                    }}
                                    className="bg-zinc-100 rounded-xl w-full flex items-center justify-center"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit">Add room type</Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="grid gird-cols-2 w-full">
        {roomTypeData?.map((item: any, index: any) => {
          return (
            <div className="w-full">
              <div className="h-auto w-full bg-transparent shadow-lg rounded-xl">
                <div className="w-full h-44 flex justify-around gap-4 p-3">
                  <div className="flex-1 rounded-xl relative">
                    <img
                      src={item.room_images_url[0]}
                      alt={`Room Type ${index + 1}`}
                      className="rounded-xl object-cover"
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                  <div className="flex-initial w-60 grow flex flex-col gap-1">
                    <div className="text-lg text-pretty font-bold">
                      {item.name}
                    </div>
                    <div className="text-xs text-pretty">
                      {item.bed_details}
                    </div>
                    <div className="text-xs text-pretty">
                      {/* {item.has_breakfast_option}, {item.breakfast_price} */}
                    </div>
                    <div className="text-base font-semibold pt-3">
                      {item.price?.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}{' '}
                      / night
                    </div>
                  </div>
                  <div>
                    <Trash
                      className="w-5 h-5  cursor-pointer"
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
