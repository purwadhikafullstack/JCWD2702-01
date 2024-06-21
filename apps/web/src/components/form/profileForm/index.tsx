'use client';

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
import { ProfileFormSchema } from '@/features/user/profile/schemas/ProfileFormSchema';
import { Image, User2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import {
  IPersistSignin,
  IPersistTenantData,
} from '@/features/auth/signin/type';
import { useState, useEffect } from 'react';
import { useUpdateUserProfile } from '@/features/user/profile/hooks/useUpdateUser';
import { useUpdateTenantProfile } from '@/features/tenant/profile/hooks/useUpdateTenantProfile';

export default function ProfileForm() {
  const [userData, setUserData] = useState<IPersistSignin>(
    {} as IPersistSignin,
  );
  const [tenantData, setTenantData] = useState<IPersistTenantData>(
    {} as IPersistTenantData,
  );
  const stateUser = useSelector((state: any) => state.user);
  const stateTenant = useSelector((state: any) => state.tenant);
  const { mutationUpdateUserProfile } = useUpdateUserProfile();
  const { mutationUpdateTenantProfile } = useUpdateTenantProfile();
  const [images, setImages] = useState([]);

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

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      username: '',
      image_url: '',
    },
  });

  const { formState, reset } = form;
  const { isDirty } = formState;

  const onSubmit = async (values: z.infer<typeof ProfileFormSchema>) => {
    const fd = new FormData();

    fd.append(
      'data',
      JSON.stringify({
        display_name: values.username,
      }),
    );
    if (images) {
      images.forEach((file) => {
        fd.append(`images`, file);
      });
    }
    if (userData.rolesId == 1) {
      mutationUpdateUserProfile(fd, {
        onSuccess: () => {
          reset();
          window.location.reload();
        },
      });
    } else {
      mutationUpdateTenantProfile(fd, {
        onSuccess: () => {
          reset();
          window.location.reload();
        },
      });
    }
  };

  useEffect(() => {
    setUserData(stateUser);
    setTenantData(stateTenant);
  }, [stateUser, stateTenant]);

  return (
    <div className="flex flex-col gap-7 md:w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={
                      userData.rolesId == 1
                        ? userData.display_name
                        : tenantData?.display_name
                    }
                    {...field}
                    suffix={<User2 />}
                    className=" rounded-full bg-zinc-100"
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
                <FormLabel>Display Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
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
          <div className="full flex justify-end">
            <Button
              className="w-2/5 mt-5 rounded-full"
              type="submit"
              disabled={!isDirty}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
