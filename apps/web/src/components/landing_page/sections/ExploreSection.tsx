import Image from 'next/image';
import { ThumbnailCard } from '@/components/cards/ThumbnailCard';
export const ExploreCity = () => {
  const cities = [
    {
      redirectUrl: '/',
      image: '/aron-visuals.jpg',
      text: 'Bali',
    },
    {
      redirectUrl: '/',
      image: '/bangkok.jpg',
      text: 'Bangkok',
    },
    {
      redirectUrl: '/',
      image: '/tokyo.jpg',
      text: 'Tokyo',
    },
    {
      redirectUrl: '/',
      image: '/jakarta.jpg',
      text: 'Jakarta',
    },
    {
      redirectUrl: '/',
      image: '/kuala-lumpur.jpg',
      text: 'Kuala Lumpur',
    },
    {
      redirectUrl: '/',
      image: '/bandung.jpg',
      text: 'Bandung',
    },
  ];
  return (
    <div>
      <div className="text-3xl font-bold pb-8">Explore a new city</div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 ">
        {cities.map((x, i) => (
          <ThumbnailCard
            redirectUrl={x.redirectUrl}
            imageUrl={x.image}
            hoverAnim={true}
            text={x.text}
          ></ThumbnailCard>
        ))}
      </div>
    </div>
  );
};
