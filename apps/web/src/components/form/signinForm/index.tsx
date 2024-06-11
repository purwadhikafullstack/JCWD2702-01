'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { auth, provider } from '@/firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { PasswordInput } from '@/components/ui/password-input';
import { MailIcon } from 'lucide-react';
import { SigninFormSchema } from '@/features/auth/signin/schemas/SigninFormSchema';
import { useSignin } from '@/features/auth/signin/hooks/useSignin';

const SigninForm = () => {
  const { mutationSignin } = useSignin();

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SigninFormSchema>) => {
    try {
      mutationSignin({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        mutationSignin({
          email: result.user.email,
        });
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
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
          </div>
          <Button className="w-full mt-5" type="submit">
            Sign In
          </Button>
        </form>
        <div className="divider before:bg-zinc-300 after:bg-zinc-300 text-sm">
          or
        </div>
        <Button
          className="w-full mt-1"
          type="submit"
          onClick={signinWithGoogle}
        >
          Sign In with Google
        </Button>
      </Form>
    </div>
  );
};

export default SigninForm;
