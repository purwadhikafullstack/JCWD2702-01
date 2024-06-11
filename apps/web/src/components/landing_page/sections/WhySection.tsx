import Image from 'next/image';
export const WhyRoomer = () => {
  return (
    <div className="my-16 flex flex-col gap-6">
      <div className="text-3xl font-bold">Why Roomer?</div>
      <div className="grid lg:grid-cols-2 gap-4 ">
        {Array(4)
          .fill('Bali')
          .map((x, i) => (
            <div
              key={i}
              className="relative border bg-pink-200 h-[210px] 2xl:h-[300px] rounded-lg overflow-hidden"
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src={'/aron-visuals.jpg'}
                  width={100}
                  height={100}
                  alt="Destination"
                  unoptimized
                  className="h-full w-full object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center justify-center w-full h-full text-white text-xl font-bold">
                  {x}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
