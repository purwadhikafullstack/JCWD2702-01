import Image from 'next/image';
import Script from 'next/script';
export default function ImageTiles({
  imageCollection,
}: {
  imageCollection: string[];
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="">
          <Image
            src={`http://localhost:8000/${imageCollection[0]}`}
            width={100}
            height={100}
            alt={'picture'}
            unoptimized
            priority
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Image
              src={`http://localhost:8000/${imageCollection[1]}`}
              width={100}
              height={100}
              alt={'picture'}
              unoptimized
              priority
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          <div>
            <Image
              src={`http://localhost:8000/${imageCollection[2]}`}
              width={100}
              height={100}
              alt={'picture'}
              unoptimized
              priority
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          <div>
            <Image
              src={`http://localhost:8000/${imageCollection[3]}`}
              width={100}
              height={100}
              alt={'picture'}
              unoptimized
              priority
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          <div>
            <Image
              src={`http://localhost:8000/${imageCollection[4]}`}
              width={100}
              height={100}
              alt={'picture'}
              unoptimized
              priority
              className="h-full w-full object-cover rounded-lg"
              onError={(e: any) => {
                e.target.src = '/no-picture.png';
              }}
            />
          </div>
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
