import Image from 'next/image';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Tent } from 'lucide-react';

export const Newsletter = () => {
  return (
    <div>
      <div className="relative">
        <div className="relative h-full w-full overflow-hidden -mt-[50px] z-0">
          <Image
            src={'/manuel-cosentino-n--CMLApjfI-unsplash.jpg'}
            width={100}
            height={100}
            alt="newsletter"
            unoptimized
            className="z-50 w-full h-[550px] object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col h-full items-center sm:items-start justify-between px-[80px] sm:px-[120px] py-[150px] lg:px-[200px]">
          <div className="flex gap-2 justify-center -pl-5 sm:p-0 sm:justify-start items-center text-white">
            <Tent />
            <span className="text-xl sm:text-2xl font-bold">Roomer</span>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-white text-center sm:text-left font-semibold text-xl md:text-3xl w-[320px] md:w-[600px]">
              {`Stay updated with recommendations and \n latest deals through our
      newsletter`}
            </span>
            <div className="grid sm:flex gap-3">
              <Input className="sm:w-[350px] font-medium rounded-full" />
              <Button className="rounded-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
