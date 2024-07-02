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
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { ResetPasswordFormSchema } from '@/features/auth/password/schemas/ResetPasswordFormSchema';
import { PasswordInput } from '@/components/ui/password-input';
import { useNewPassword } from '@/features/auth/password/hooks/useNewPassword';

export default function ResetPasswordForm({ token }: { token: string }) {
  const { mutationNewPassword } = useNewPassword();
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordFormSchema>) => {
    mutationNewPassword({
      password: values.password,
      token: token,
    });
  };

  return (
    <>
      <h1 className="flex flex-col items-center gap-4">
        <div className="font-bold text-2xl">Reset Your Password</div>
        <div className="flex flex-col">
          <span className="text-sm text-center">
            Input your new password here
          </span>
        </div>
        <div className="w-80">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
              <Button className="w-full mt-5" type="submit">
                Save
              </Button>
            </form>
          </Form>
        </div>
      </h1>
    </>
  );
}
