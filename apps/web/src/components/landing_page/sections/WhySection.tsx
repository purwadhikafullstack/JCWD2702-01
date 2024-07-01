import Image from 'next/image';
export const WhyRoomer = () => {
  const infoParagraph = [
    {
      title: 'Feels Like Home',
      description:
        'At Roomer, we believe in creating personalized experiences. Our tenants go above and beyond to make every stay feels like home.',
      picture: '/warm-welcome.png',
    },
    {
      title: 'Verified Tenants',
      description:
        'Trust and safety are our top priorities. We require all tenants to undergo a verification process.',
      picture: '/verified-tenants.png',
    },
    {
      title: 'Exclusive Discounts',
      description:
        'Enjoy luxurious stays at unbeatable prices, and take advantage of special offers and seasonal promotions to make your travel budget go further.',
      picture: '/promo-price.png',
    },
    {
      title: '24/7 Customer Support',
      description:
        'Whether you need help with your booking or require assistance during your stay, Roomer is always just a call or click away.',
      picture: '/customer-service.png',
    },
  ];
  return (
    <div className="my-16 flex flex-col gap-6">
      <div className="text-3xl font-bold">Why Roomer?</div>
      <div className="grid lg:grid-cols-2 gap-4 ">
        {infoParagraph.map((x, i) => (
          <div
            key={i}
            className="p-5 gap-2 border md:h-[210px] 2xl:h-[300px] rounded-lg grid md:flex items-center"
          >
            <div className="h-full w-full">
              <Image
                src={`${x.picture}`}
                width={50}
                height={50}
                alt="Destination"
                unoptimized
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="grid gap-3">
              <div
                className="
            text-2xl font-bold"
              >
                {x.title}
              </div>
              <div className="font-medium">{x.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
