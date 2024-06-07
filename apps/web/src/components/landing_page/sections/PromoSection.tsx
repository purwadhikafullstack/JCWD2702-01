import Autoplay from 'embla-carousel-autoplay';
import { ArrowRightCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { ThumbnailCard } from '../../cores/cards/ThumbnailCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../../ui/carousel';

export const BestDeals = () => {
  return (
    <div className="my-16 flex flex-col gap-6">
      <div className="text-3xl font-bold">Best deals for you</div>
      <div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 10000,
            }),
          ]}
          className="mx-auto"
        >
          <CarouselContent className="mx-auto -ml-4">
            {Array(6)
              .fill('/')
              .map((x, i) => (
                <CarouselItem className="xl:basis-1/2 2xl:basis-1/3">
                  <ThumbnailCard
                    redirectUrl={x}
                    imageUrl={'/promo.webp'}
                  ></ThumbnailCard>
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
        See more promos
        <ArrowRight className="ml-3" />
      </Button>
    </div>
  );
};
