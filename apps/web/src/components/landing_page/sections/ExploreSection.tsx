import Image from 'next/image';
import { ThumbnailCard } from '@/components/cards/ThumbnailCard';
export const ExploreCity = () => {
  return (
    <div>
      <div className="text-3xl font-bold pb-8">Explore a new city</div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 ">
        {Array(6)
          .fill('Bali')
          .map((x, i) => (
            <ThumbnailCard
              redirectUrl="/"
              imageUrl="/aron-visuals.jpg"
              hoverAnim={true}
              text={x}
            ></ThumbnailCard>
          ))}
      </div>
    </div>
  );
};
