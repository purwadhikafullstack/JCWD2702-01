import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ArrowRightCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { ListingCard } from '@/components/cards/ListingCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../../ui/carousel';

export const FeaturedRooms = ({
  listings,
  rooms,
}: {
  listings: any[];
  rooms: any[];
}) => {
  return (
    <div className="my-16 flex flex-col gap-6">
      <div className="text-3xl font-bold">Featured rooms</div>
      <div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="mx-auto"
        >
          <CarouselContent className="mx-auto -ml-4">
            {listings.map((x, i) => (
              <CarouselItem className="md:basis-1/2 xl:basis-1/4 2xl:basis-1/5">
                <ListingCard
                  imageUrl={x.listing_images}
                  title={x.title}
                  city={x.city}
                  country={x.country}
                  price={rooms[x.roomId].price}
                  seasonalPrice={rooms[x.roomId].seasonal_price}
                  avgRating={x.avg_rating}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Button
        variant={'outline'}
        size={'lg'}
        className="rounded-full mx-auto text-lg font-semibold"
      >
        See more rooms
        <ArrowRight className="ml-3" />
      </Button>
    </div>
  );
};
