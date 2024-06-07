import { Home, Tent, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Image from 'next/image';
import Link from 'next/link';
import { FaqAccordion } from '@/components/be_a_tenant/faq_accordion';
export default function Page() {
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
          <Button size={'lg'} className="order-1 lg:order-2">
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
        <div className="w-[80%] font-medium text-center">
          We’ve partnered with apartment buildings across the US so you can rent
          a place to live and host on Airbnb part-time. The typical host
          earned $3650/year and hosted 28 nights.
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
