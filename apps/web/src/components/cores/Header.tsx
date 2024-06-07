'use client';
import { buttonVariants } from '@/components/ui/button';
import { Tent } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
export const Header = () => {
  const pathname = usePathname();

  const [navbar, setNavbar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const pageScrolled = () => {
    if (window.scrollY > 170) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const pageResized = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', pageResized);
    if (pathname !== '/' || windowWidth < 769) {
      setNavbar(true);
    } else {
      setNavbar(false);
      window.addEventListener('scroll', pageScrolled);
    }

    return () => {
      window.removeEventListener('scroll', pageScrolled);
      window.removeEventListener('resize', pageResized);
    };
  }, [pathname, windowWidth]);

  return (
    <div>
      {navbar ? (
        <div className="fixed top-0 w-full transition z-50 rounded-b-3xl clip-content">
          <div className="py-4 px-32 flex transition justify-between bg-white text-lg items-center mx-auto border-b-2  rounded-b-3xl">
            <div className="flex gap-2 items-center text-black">
              <Tent />
              <span className="text-2xl font-medium">Roomer</span>
            </div>
            <button className={buttonVariants({ variant: 'default' })}>
              Signup
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed top-0 w-full z-50">
          <div className="py-4 px-32 flex justify-between bg-white transition text-lg items-center mx-auto bg-opacity-0  rounded-b-3xl ">
            <div className="flex gap-2 items-center text-white">
              <Tent />
              <span className="text-2xl font-medium">Roomer</span>
            </div>
            <button className={buttonVariants({ variant: 'default' })}>
              Signup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
