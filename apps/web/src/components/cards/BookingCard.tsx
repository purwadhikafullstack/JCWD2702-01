import { format } from 'date-fns';
import { Separator } from '../ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { toCurrency } from '../cores/ToCurrency';
import { Badge } from '../ui/badge';

export default function BookingCard({ data }: any) {
  return (
    <div>
      <div className="text-[10px] font-medium text-stone-400 flex justify-between">
        <span>ID {data.id}</span>
        <span>{format(new Date(data.created_at), 'yyyy-MM-dd HH:mm')}</span>
      </div>
      <Separator className="my-3" />
      <div className="flex justify-between">
        <div className="grid justify-items-start">
          <div className="text-xs text-stone-600 font-medium">
            Payment method
          </div>
          <div className="text-sm font-bold">{data.payment_type.type}</div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={'link'}
                size={'sm'}
                className="text-xs text-stone-600 font-medium p-0 h-5"
              >
                See order details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="pb-3">Order details</DialogTitle>
                <DialogDescription className="grid text-stone-800 gap-3">
                  <div className="grid gap-3">
                    <div className="text-xs w-full flex justify-between">
                      <p>{data.id}</p>
                      <p>
                        {format(new Date(data.created_at), 'yyyy-MM-dd HH:mm')}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Image
                        src={data.room_type.listing.listing_images[0].image_url}
                        width={100}
                        height={100}
                        alt="listing"
                        unoptimized
                        className="w-[150px] h-[80px] object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-bold">
                          {data.room_type.listing.title}
                        </div>
                        <div className="flex items-center text-xs">
                          <MapPin className="p-1 ml-[-8px]" />
                          <span className="font-medium">
                            {`${data.room_type.listing.city}, ${data.room_type.listing.country}`}
                          </span>
                        </div>
                        <div className="text-xs">
                          Hosted by {data.room_type.listing.tenant.display_name}
                        </div>
                      </div>
                    </div>

                    <div className="grid">
                      <div className="flex w-full justify-between">
                        <div>Duration</div>
                        <div className="font-semibold">
                          {format(new Date(data.start_date), 'dd MMMM yyyy')}
                          {' - '}
                          {format(new Date(data.end_date), 'dd MMMM yyyy')}
                        </div>
                      </div>
                      <div className="flex w-full justify-between">
                        <div>Number of guests</div>
                        <div className="font-semibold">
                          {data.num_of_guests}
                        </div>
                      </div>
                      <div className="flex w-full justify-between">
                        <div>Include breakfast</div>
                        <div className="font-semibold">
                          {data.details?.include_breakfast ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div className="flex w-full justify-between">
                        <div>
                          {data.details?.normal_night +
                            data.details?.seasonal_night}{' '}
                          night(s)
                        </div>
                        <div className="font-semibold">
                          {toCurrency(
                            data.details?.normal_price +
                              data.details?.seasonal_price,
                          )}
                        </div>
                      </div>
                      <div className="flex w-full justify-between">
                        <div>Taxes & Fees</div>
                        <div className="font-semibold">
                          {toCurrency(data.details?.taxes_and_fees)}
                        </div>
                      </div>
                      <div className="flex font-bold w-full justify-between">
                        <div>Total</div>
                        <div>{toCurrency(data.total_price)}</div>
                      </div>
                    </div>
                    {data.details?.breakfast_price &&
                    data.details?.include_breakfast ? (
                      <div>{toCurrency(data.details?.breakfast_price)}</div>
                    ) : null}
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-1 flex-col justify-between items-end">
          <div className="text-xs text-stone-600 font-medium">Total</div>
          <div className="text-sm font-bold">
            {toCurrency(data.total_price)}
          </div>
          <Badge
            className={`${data.status.id === 4 ? 'bg-red-200' : data.status.id === 3 ? 'bg-green-200' : ''}`}
            variant={'secondary'}
          >
            {data.status.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
