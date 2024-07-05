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
import { SignupFormSchema } from '@/features/auth/signup/schemas/SignupFormSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { MailIcon } from 'lucide-react';
import { useSignupUser } from '@/features/auth/signup/hooks/useSignupUser';
import { useSignin } from '@/features/auth/signin/hooks/useSignin';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase/firebase';

const SignupForm = () => {
  const { mutationSignin } = useSignin();

  const { mutationSignupUser } = useSignupUser();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
    },
  });
<<<<<<< HEAD

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    mutationSignupUser({
      email: values.email,
    });
=======
  const { reset } = form;

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    await mutationSignupUser({
      email: values.email,
    });

    reset();
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
  };

  const signupWithGoogle = async () => {
    signInWithPopup(auth, provider).then(async (res) => {
      if (res.user) {
        mutationSignupUser({
          uid: res.user.uid,
          email: res.user.email,
          display_name: res.user.displayName,
          is_verified: res.user.emailVerified,
          image_url: res.user.photoURL,
        });

        mutationSignin({
          email: res.user.email,
        });
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} suffix={<MailIcon />} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-5" type="submit">
            Sign Up
          </Button>
        </form>
        <div className="divider before:bg-zinc-300 after:bg-zinc-300 text-sm">
          or
        </div>
        <Button
<<<<<<< HEAD
          className="w-full mt-1"
          type="submit"
          onClick={signupWithGoogle}
        >
=======
          className="w-full flex gap-3"
          type="submit"
          onClick={signupWithGoogle}
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
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
          Sign Up with Google
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
