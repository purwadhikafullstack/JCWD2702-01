'use client';
import { Home, Tent, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaqAccordion } from '@/components/be_a_tenant/faq_accordion';
import { useRouter } from 'next/navigation';
export default function Page() {
  const router = useRouter();
  return (
    <div className="mt-32 md:w-[80vw] grid gap-16 xl:w-[70vw] mx-8 md:mx-auto">
      <div className="justify-items-center grid gap-6 md:gap-8 pt-8">
        <div className="text-4xl md:text-5xl font-bold">Be a Roomer Tenant</div>
        <div className="text-lg md:text-2xl font-medium text-center">
          Rent out your property and earn more with Roomer
        </div>
        <div className="grid order-1 justify-items-center lg:flex gap-6">
          <Button
            variant={'secondary'}
            size={'lg'}
            className="order-2 lg:order-1 w-80 lg:w-auto"
          >
            Read FAQ
          </Button>
          <Button
            onClick={() => router.push('/tenant/set-up')}
            size={'lg'}
            className="order-1 lg:order-2"
          >
            <Home className="mr-3" />
            Set up a profile now
            <ArrowRight className="ml-3" />
          </Button>
        </div>
      </div>

      <div className="grid gap-3 justify-items-center">
        <Image
          src={'/roomer-tenant.webp'}
          height={100}
          width={100}
          unoptimized
          alt="Roomer tenant"
          className="w-full xl:h-[600px] xl:object-cover rounded-lg object-bottom"
        />
        <div className="md:w-[80%] text-lg font-medium  md:text-center">
          With over 500,000 users worldwide, Roomer partners with top apartment
          buildings across the globe, offering you a seamless way to rent and
          earn. List your place part-time on Roomer and join thousands of hosts
          who earned an average of $4,000 annually, hosting 30 nights a year.
          Our easy-to-use platform and dedicated support team make it simple to
          maximize your rental income while enjoying the flexibility you need.
        </div>
      </div>

      <div className="grid justify-items-center gap-6">
        <div className="text-3xl md:text-4xl font-bold">
          Frequently Asked Questions
        </div>
        <div className="w-full lg:w-[60%] 2xl:max-w-[50%]">
          <FaqAccordion></FaqAccordion>
        </div>
      </div>

      <div className="grid justify-items-center gap-6">
        <div className="text-4xl font-bold">Have more questions?</div>
        <div className="text-center font-medium">
          Connect with our customer support through support@roomer.com
        </div>
      </div>

      <Image
        src={'/support.webp'}
        height={100}
        width={100}
        alt="Support Banner"
        className="w-full"
        unoptimized
      />
    </div>
  );
}
