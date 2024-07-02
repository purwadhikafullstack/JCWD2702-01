import Image from 'next/image';
import { ThumbnailCard } from '@/components/cards/ThumbnailCard';
export const ExploreCity = () => {
  const cities = [
    {
      redirectUrl:
        '/search?lat=-8.4095178&lng=115.188916&country=Indonesia&page=1',
      image: '/aron-visuals.jpg',
      text: 'Bali',
    },
    {
      redirectUrl:
        '/search?lat=13.7563309&lng=100.5017651&country=Thailand&page=1',
      image: '/bangkok.jpg',
      text: 'Bangkok',
    },
    {
      redirectUrl: '/search?lat=35.6764225&lng=139.650027&country=Japan&page=1',
      image: '/tokyo.jpg',
      text: 'Tokyo',
    },
    {
      redirectUrl: '/search?lat=-6.1944491&lng=106.8229198&country=Indonesia&page=1',
      image: '/jakarta.jpg',
      text: 'Jakarta',
    },
    {
      redirectUrl: '/search?lat=3.1319197&lng=101.6840589&country=Malaysia&page=1',
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
