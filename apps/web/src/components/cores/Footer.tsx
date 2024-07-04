const TextLink = ({ children }: any) => {
  return <div className="hover:underline hover:cursor-pointer">{children}</div>;
};

export const Footer = () => {
  return (
    <div className="bg-black sticky rounded-t-[40px] z-10 -mt-[50px] grid grid-cols-2 md:grid-cols-5 gap-8 py-16 px-16 sm:px-8 lg:px-40 md:justify-items-center">
      <div className="flex flex-col gap-8">
        <div className="font-bold text-white text-lg">About Roomer</div>
        <div className="text-input flex flex-col gap-2 items-start">
          <TextLink>About us</TextLink>
          <TextLink>Careers</TextLink>
          <TextLink>Investors</TextLink>
          <TextLink>Press</TextLink>
          <TextLink>Blog</TextLink>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="font-bold text-secondary text-lg">Support</div>
        <div className="text-input grid gap-2">
          <TextLink>Help Center</TextLink>
          <TextLink>Report a safety concern</TextLink>
          <TextLink>Issue a complaint</TextLink>
          <TextLink>Privacy policy</TextLink>
          <TextLink>Cookie Policy</TextLink>
          <TextLink>Terms of use</TextLink>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="font-bold text-secondary text-lg">Tenants</div>
        <div className="text-input grid gap-2">
          <TextLink>FAQs</TextLink>
          <TextLink>Community Forum</TextLink>
          <TextLink>Tenant Resources</TextLink>
          <TextLink>Payments</TextLink>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="font-bold text-secondary text-lg">Explore</div>
        <div className="text-input grid gap-2">
          <TextLink>Hotels</TextLink>
          <TextLink>Apartments</TextLink>
          <TextLink>Villas</TextLink>
          <TextLink>Promotions</TextLink>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="font-bold text-secondary text-lg">Find Us</div>
        <div className="text-input flex gap-2">
          <TextLink>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </TextLink>
          <TextLink>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </TextLink>
          <TextLink>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </TextLink>
        </div>
      </div>
    </div>
  );
};
