'use client';
import { buttonVariants } from '@/components/ui/button';
import { Tent } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
  IPersistSignin,
  IPersistTenantData,
} from '@/features/auth/signin/type';
import HeaderDropDown from '../dropdown/header';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  const [navbar, setNavbar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [userData, setUserData] = useState<IPersistSignin>(
    {} as IPersistSignin,
  );
  const [tenantData, setTenantData] = useState<IPersistTenantData>(
    {} as IPersistTenantData,
  );

  const { push } = useRouter();
  const stateUser = useSelector((state: any) => state.user);
  const stateTenant = useSelector((state: any) => state.tenant);

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
    setUserData(stateUser);
    setTenantData(stateTenant);
  }, [stateUser, stateTenant]);

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
          <div className="py-4 px-8 lg:px-32 flex transition justify-between bg-white text-lg items-center mx-auto border-b-2  rounded-b-3xl">
            <Link href={'/'}>
              <div className="group flex gap-2 items-center text-black ">
                <Tent />
                <span className="text-2xl font-bold hover:cursor-pointer">
                  Roomer
                </span>
              </div>
            </Link>
            {userData.uid ? (
              <div className="flex items-center justify-around space-x-2 bg-black rounded-full p-5 h-10 w-auto">
                {userData.rolesId == 1 && userData.image_url ? (
                  <div className="w-6 h-6 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
                    <Image
                      src={userData.image_url}
                      fill={true}
                      alt="Image Profile"
                      quality={100}
                      style={{ objectFit: 'cover' }}
                      className="rounded-full"
                    />
                  </div>
                ) : userData.rolesId == 2 && tenantData?.image_url ? (
                  <div className="w-6 h-6 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
                    <Image
                      src={tenantData.image_url}
                      fill={true}
                      alt="Tenant Profile Image"
                      quality={100}
                      style={{ objectFit: 'cover' }}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-zinc-200 rounded-full flex justify-center items-center text-medium relative text-center uppercase text-[10px] text-black">
                    {userData.rolesId == 1
                      ? userData?.display_name.slice(0, 2)
                      : tenantData?.display_name.slice(0, 2)}
                  </div>
                )}
                <div className="hidden md:flex text-white pr-2 w-auto text-sm font-light">
                  {userData.rolesId == 1
                    ? userData.display_name
                    : tenantData?.display_name}
                </div>
                <div className="text-white text-md text-thin">
                  <HeaderDropDown />
                </div>
              </div>
            ) : (
              <div className="space-x-4 flex">
                <Link href={'/signup'}>
                  <Button className="hidden md:flex rounded-full">
                    Sign Up
                  </Button>
                </Link>
                <Link href={'/signin'}>
                  <Button
                    className="rounded-full bg-black text-white md:text-black md:bg-white md:border-2 md:border-black"
                    variant={'outline'}
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed top-0 w-full z-50">
          <div className="py-4 px-8 lg:px-32 flex justify-between bg-white transition text-lg items-center mx-auto bg-opacity-0  rounded-b-3xl ">
            <Link href={'/'}>
              <div className="flex gap-2 items-center text-white">
                <Tent />
                <span className="text-2xl font-bold">Roomer</span>
              </div>
            </Link>
            {userData.uid ? (
              <div className="flex items-center justify-around space-x-2 bg-white rounded-full p-5 h-10 w-auto">
                {userData.rolesId == 1 && userData.image_url ? (
                  <div className="w-6 h-6 bg-zinc-100 rounded-full text-black text-sm flex justify-center items-center relative text-center pr-2">
                    <Image
                      src={userData.image_url}
                      fill={true}
                      alt="Image Profile"
                      quality={100}
                      style={{ objectFit: 'cover' }}
                      className="rounded-full"
                    />
                  </div>
                ) : userData.rolesId == 2 && tenantData?.image_url ? (
                  <div className="w-6 h-6 bg-zinc-100 rounded-full text-black text-sm flex justify-center items-center relative text-center pr-2">
                    <Image
                      src={tenantData.image_url}
                      fill={true}
                      alt="Tenant Profile Image"
                      quality={100}
                      style={{ objectFit: 'cover' }}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-zinc-200 rounded-full flex justify-center items-center text-medium relative text-center uppercase text-[10px] text-black">
                    {userData.rolesId == 1
                      ? userData?.display_name.slice(0, 2)
                      : tenantData?.display_name.slice(0, 2)}
                  </div>
                )}
                <div className="hidden md:flex text-black pr-2 w-auto text-sm">
                  {userData.rolesId == 1
                    ? userData.display_name
                    : tenantData?.display_name}
                </div>
                <div className="text-black">
                  <HeaderDropDown />
                </div>
              </div>
            ) : (
              <div className="space-x-4 flex">
                <Link href={'/signup'}>
                  <Button className="hidden hover:bg-stone-200 md:flex bg-white text-black rounded-full">
                    Sign Up
                  </Button>
                </Link>
                <Link href={'/signin'}>
                  <Button
                    className="rounded-full bg-black text-white hover:bg-stone-50 hover:bg-opacity-20 hover:text-white md:text-white md:bg-transparent md:border-2"
                    variant={'outline'}
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
