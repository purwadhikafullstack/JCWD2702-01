import Image from 'next/image';
import Script from 'next/script';
import { AspectRatio } from '../ui/aspect-ratio';
export default function ImageTiles({
  imageCollection,
}: {
  imageCollection: string[];
}) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-3">
        <AspectRatio ratio={5 / 3}>
          <Image
            src={imageCollection[0]}
            alt={'picture'}
            unoptimized
            fill
            className="object-cover h-auto w-full rounded-lg"
          />
        </AspectRatio>
        <div className="grid grid-cols-2 gap-3">
          <AspectRatio ratio={5 / 3}>
            <Image
              src={imageCollection[1]}
              width={100}
              height={100}
              alt={'picture'}
              unoptimized
              className="h-full w-full object-cover rounded-lg"
            />
          </AspectRatio>
          <AspectRatio ratio={5 / 3}>
            <Image
              src={imageCollection[2]}
              width={100}
              height={100}
              alt={'picture'}
              unoptimized
              className="h-full w-full object-cover rounded-lg"
            />
          </AspectRatio>
          <AspectRatio ratio={5 / 3}>
            <Image
              src={imageCollection[3]}
              width={100}
              height={100}
              alt={'picture'}
              unoptimized
              className="h-full w-full object-cover rounded-lg"
            />
          </AspectRatio>
          <AspectRatio ratio={5 / 3}>
            <Image
              src={imageCollection[4]}
              width={100}
              height={100}
              alt={'picture'}
              unoptimized
              className="h-full w-full object-cover rounded-lg"
            />
          </AspectRatio>
        </div>
      </div>
      <Script id="error-handling">
        {`
      document.querySelectorAll('img').forEach(img => {
        img.onerror = () => {
          img.src = '/no-picture.png';
        };
      });
    `}
      </Script>
    </>
  );
}
