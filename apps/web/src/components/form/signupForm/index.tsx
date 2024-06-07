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

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    console.log({ values: values });

    mutationSignupUser({
      email: values.email,
    });
  };

  const signupWithGoogle = async () => {
    signInWithPopup(auth, provider).then(async (res) => {
      console.log({ GoogleSignupRes: res.user });

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
          className="w-full mt-1"
          type="submit"
          onClick={signupWithGoogle}
        >
          Sign Up with Google
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
