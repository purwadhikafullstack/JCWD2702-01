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
import Link from 'next/link';

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
                      placeholder="Email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-xs pt-1">
            <Link
              href={'/forgot-password'}
              className="cursor-pointer hover:text-blue-400"
            >
              Forgot Password?
            </Link>
          </div>
          <Button className="w-full mt-5" type="submit">
            Sign In
          </Button>
        </form>
        <div className="divider before:bg-zinc-300 after:bg-zinc-300 text-sm">
          or
        </div>
        <Button
          className="flex gap-3 w-full"
          type="submit"
          onClick={signinWithGoogle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign In with Google
        </Button>
      </Form>
    </div>
  );
};

export default SigninForm;
