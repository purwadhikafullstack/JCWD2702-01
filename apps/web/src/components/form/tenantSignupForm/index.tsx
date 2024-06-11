'use client';

import { useState } from 'react';
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
import { TenantSignupFormSchema } from '@/features/tenant/signup/schemas/TenantSignupSchema';
import { Image, Phone, User2 } from 'lucide-react';
import { useSignupTenant } from '@/features/tenant/signup/hooks/useSignupTenant';

export default function TenantSignupForm({ nextStep }: any) {
  const [images, setImages] = useState([]);
  const { mutationSignupTenant } = useSignupTenant(nextStep);

  const onSetFiles = (event: any) => {
    try {
      const acceptedFormat = ['jpg', 'jpeg', 'webp', 'png'];
      const files: any = [...event.target.files];

      console.log(event.target.files);
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

      console.log('files after process', files);
      setImages(files);
      console.log('should show image ', images);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const form = useForm<z.infer<typeof TenantSignupFormSchema>>({
    resolver: zodResolver(TenantSignupFormSchema),
    defaultValues: {
      display_name: '',
      image_url: '',
      id_card_number: '',
      phone: '',
    },
  });

  const { formState } = form;
  const { isDirty } = formState;

  const onSubmit = async (values: z.infer<typeof TenantSignupFormSchema>) => {
    console.log({ values: values });

    const fd = new FormData();

    fd.append(
      'data',
      JSON.stringify({
        display_name: values.display_name,
        id_card_number: values.id_card_number,
        phone: values.phone,
      }),
    );
    if (images) {
      images.forEach((file) => {
        fd.append(`images`, file);
      });
    }

    mutationSignupTenant(fd);
  };
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-7 items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="text-sm text-zinc-400">Step 1 of 2</div>
        <div className="text-center text-2xl font-bold">
          Set up your tenant profile
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="username"
                    suffix={<User2 />}
                    className=" rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>display picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder={
                      images ? JSON.stringify(images) : 'Upload file'
                    }
                    accept="image/*"
                    {...field}
                    onChange={(event) => {
                      onSetFiles(event);
                      field.onChange(event);
                    }}
                    suffix={<Image />}
                    className=" rounded-full"
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
                <FormLabel>phone number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="phone"
                    suffix={<Phone />}
                    className=" rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id_card_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>id card</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Id Card Number"
                    className=" rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full mt-5 rounded-full"
            type="submit"
            disabled={!isDirty}
          >
            Sign Up as Tenant
          </Button>
        </form>
      </Form>
      <div className=" text-xs text-center font-light w-full">
        * All data must be valid. This data will be used as reference in the
        case of emergency <br />* By filling up the form, you are agreeing to
        our terms and conditions
      </div>
    </div>
  );
}
