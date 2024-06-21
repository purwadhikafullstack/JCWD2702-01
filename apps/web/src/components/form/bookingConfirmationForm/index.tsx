import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNewBooking } from '@/features/user/transaction/hooks/useBooking';
import { z } from 'zod';

const payment_methods = [
  { label: 'Manual Transfer', value: 1 },
  { label: 'Online Payment', value: 2 },
] as const;

export default function BookingConfirmationForm({
  form,
  formSchema,
  room_typesId,
  details,
}: any) {
  const { mutationNewBooking } = useNewBooking();

  function onSubmit(values: z.infer<typeof formSchema>) {
    details.phone = values.phone;
    details.email = values.email;
    details.fullname = values.fullname;
    mutationNewBooking({
      room_typesId: room_typesId as string,
      data: values,
      payment_type: values.payment,
      details: details,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <div className="font-bold pb-3">Contact information</div>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="Fullname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-8 justify-between">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={cn('w-full')}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className={cn('w-full')}>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormDescription className={cn('text-xs pt-3')}>
            After payment, e-voucher and booking reminder will be sent to to the
            email provided here.
          </FormDescription>
        </div>
        <div>
          <div className="font-bold pb-3">Payment method</div>
          <FormField
            control={form.control}
            name="payment"
            render={({ field }) => (
              <FormItem className="grid">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('payment', Number(value));
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {payment_methods.map((x: any) => (
                      <SelectItem value={x.value.toString()}>
                        {x.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <div>
          <div className="font-bold pb-3">Cancellation policy</div>
          <div className="grid gap-3">
            <div className="text-sm">
              The reservation is non-refundable. 
              <Button variant={'link'} className="h-auto p-0">
                Learn more
              </Button>
            </div>
            <Separator />
            <div className="text-xs">
              By selecting the button below, I agree to the Host's House
              Rules, Ground rules for guests, Airbnb's Rebooking and Refund
              Policy, and that Airbnb can charge my payment method if I’m
              responsible for damage.
            </div>
          </div>
        </div>
        <Button type="submit" className="w-[50%]">
          Confirm and pay
        </Button>
      </form>
    </Form>
  );
}
