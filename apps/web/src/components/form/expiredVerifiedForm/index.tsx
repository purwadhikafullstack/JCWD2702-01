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
import { ExpiredVerifiedFormSchema } from '@/features/auth/verified/schemas/ExpiredVerifiedFormSchema';
import { MailIcon } from 'lucide-react';
import { useNewVerificationLink } from '@/features/auth/verified/hooks/useNewVerificationLink';

export default function ExpiredVerifiedForm() {
  const { mutationNewVerificationLink } = useNewVerificationLink();

  const form = useForm<z.infer<typeof ExpiredVerifiedFormSchema>>({
    resolver: zodResolver(ExpiredVerifiedFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof ExpiredVerifiedFormSchema>,
  ) => {
    console.log({ values: values });

    mutationNewVerificationLink({
      email: values.email,
    });
  };

  return (
    <>
      <h1 className="flex flex-col items-center gap-4">
        <div className="font-bold text-2xl">Error</div>
        <div className="flex flex-col">
          <span className="text-sm text-center">
            Verification link Expired!
          </span>
          <span className="text-sm text-center">
            Input your email for a new verification link
          </span>
        </div>
        <div className="w-80">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email"
                        {...field}
                        suffix={<MailIcon />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-5" type="submit">
                Send Me a New Link!
              </Button>
            </form>
          </Form>
        </div>
      </h1>
    </>
  );
}
