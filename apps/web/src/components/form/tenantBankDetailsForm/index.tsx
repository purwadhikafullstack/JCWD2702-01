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
import { TenantBankDetailsFormSchema } from '@/features/tenant/signup/schemas/TenantSignupSchema';

export default function TenantBankDetailsForm({ nextStep }: any) {
  const form = useForm<z.infer<typeof TenantBankDetailsFormSchema>>({
    resolver: zodResolver(TenantBankDetailsFormSchema),
    defaultValues: {
      card_holder_name: '',
      card_number: '',
      exp_date: '',
      cvv: '',
    },
  });

  const { formState } = form;
  const { isDirty } = formState;

  const onSubmit = async (
    values: z.infer<typeof TenantBankDetailsFormSchema>,
  ) => {
    nextStep();
  };
  return (
    <div className=" w-full md:w-1/2 lg:w-1/3 flex flex-col gap-7 items-center">
      <div className="flex flex-col items-center gap-3">
        <div className="text-sm text-zinc-400">Step 2 of 2</div>
        <div className="text-center text-2xl font-bold">Enter bank details</div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="card_holder_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Holder Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Chris L Martin"
                    className=" rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="card_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="1234567890000000"
                    className=" rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exp_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="01-12"
                    className=" rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card verification value</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="987"
                    className=" rounded-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-between">
            <Button
              className="w-2/5 mt-5 rounded-full bg-transparent border border-black text-black hover:text-white"
              type="button"
              onClick={() => {
                nextStep();
              }}
            >
              Skip
            </Button>
            <Button
              className="w-2/5 mt-5 rounded-full"
              type="submit"
              disabled={!isDirty}
            >
              Sign Up as Tenant
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
