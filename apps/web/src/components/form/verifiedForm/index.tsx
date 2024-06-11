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
import Link from 'next/link';
import { PasswordInput } from '@/components/ui/password-input';
import { Image, User2 } from 'lucide-react';
import { VerifiedFormSchema } from '@/features/auth/verified/schemas/VerifiedFormSchema';
import { useVerifiedAccount } from '@/features/auth/verified/hooks/useVerifiedAccount';

interface VerifiedFormProps {
  token: string;
}

export default function VerifiedForm({ token }: VerifiedFormProps) {
  const [result, setResult] = useState('');
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [images, setImages] = useState([]);

  const { mutationVerifiedAccount } = useVerifiedAccount();

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

  const form = useForm<z.infer<typeof VerifiedFormSchema>>({
    resolver: zodResolver(VerifiedFormSchema),
    defaultValues: {
      password: '',
      username: '',
      profilePict: '',
    },
  });

  const { formState } = form;
  const { isDirty } = formState;

  const onSubmit = async (values: z.infer<typeof VerifiedFormSchema>) => {
    const fd = new FormData();

    fd.append(
      'data',
      JSON.stringify({
        display_name: values.username,
        password: values.password,
      }),
    );
    if (images) {
      images.forEach((file) => {
        fd.append(`images`, file);
      });
    }

    mutationVerifiedAccount({
      fd,
      token,
    });
  };

  return (
    <div className="w-80">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="username" suffix={<User2 />} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} placeholder="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePict"
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-5" type="submit" disabled={!isDirty}>
            Verified!
          </Button>
        </form>
      </Form>
    </div>
  );
}
