import Image from 'next/image';

export default function UpdateListingImageTiles({
  imageCollection,
}: {
  imageCollection: string[];
}) {
  return (
    <div className="grid w-full md:w-72 pt-28 md:grid-rows-2 xl:w-96 h-full xl:pt-14">
      <div className="h-40 md:h-80 relative">
        <Image
          src={imageCollection[0]}
          fill={true}
          alt={'picture'}
          unoptimized
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div className="hidden sm:grid grid-cols-2 gap-3 h-56 relative pt-7">
        {imageCollection.slice(1, 5).map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              fill={true}
              alt={'picture'}
              unoptimized
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
