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
import Link from 'next/link';

export const FeaturedRooms = ({ listings }: { listings: any[] }) => {
  console.log(listings);
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
            {listings?.slice(0, 7).map((x, i) => (
              <CarouselItem className="md:basis-1/2 xl:basis-1/4 2xl:basis-1/5">
                <Link href={`/sandbox/${x.slug}`}>
                  <ListingCard
                    key={x.id}
                    imageUrl={`${process.env.NEXT_PUBLIC_BASE_API_URL}${x.listing_images[0].image_url}`}
                    title={x.title}
                    city={x.city}
                    country={x.country}
                    price={x.room_types[0].price}
                    seasonalPrice={x.room_types[0]?.seasonal_prices[0]}
                    avgRating={x.avg_rating}
                    // numOfReviews={x.reviews.length}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Link href={'/search'} className="mx-auto">
        <Button
          variant={'outline'}
          size={'lg'}
          className="rounded-full text-lg font-semibold"
        >
          See more rooms
          <ArrowRight className="ml-3" />
        </Button>
      </Link>
    </div>
  );
};
