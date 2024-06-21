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
import { SendEmailResetPasswordFormSchema } from '@/features/auth/password/schemas/ResetPasswordFormSchema';
import { MailIcon } from 'lucide-react';
import { useSendResetPasswordLink } from '@/features/auth/password/hooks/useResetPasswordLink';

export default function SendEmailResetPasswordForm() {
  const { mutationSendResetPasswordLink } = useSendResetPasswordLink();
  const form = useForm<z.infer<typeof SendEmailResetPasswordFormSchema>>({
    resolver: zodResolver(SendEmailResetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof SendEmailResetPasswordFormSchema>,
  ) => {
    mutationSendResetPasswordLink({
      email: values.email,
    });
  };

  return (
    <>
      <h1 className="flex flex-col items-center gap-4">
        <div className="font-bold text-2xl">Reset Your Password</div>
        <div className="flex flex-col">
          <span className="text-sm text-center">
            Input your email here so we can send you an email <br /> to reset
            the password
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
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
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </h1>
    </>
  );
}
