'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
  IPersistSignin,
  IPersistTenantData,
} from '@/features/auth/signin/type';
import HeaderDropDown from '../dropdown/header';

export const Header = () => {
  const [userData, setUserData] = useState<IPersistSignin>(
    {} as IPersistSignin,
  );
  const [tenantData, setTenantData] = useState<IPersistTenantData>(
    {} as IPersistTenantData,
  );

  const stateUser = useSelector((state: any) => state.user);
  const stateTenant = useSelector((state: any) => state.tenant);

  useEffect(() => {
    setUserData(stateUser);
    setTenantData(stateTenant);
  }, [stateUser, stateTenant]);

  return (
    <div className="border-b-2 text-lg shadow-md">
      <div className="container h-20">
        <div className="container flex justify-between items-center h-full">
          <Link href={'/'}>
            <div>Logo</div>
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
                <div className="w-6 h-6 bg-zinc-100 rounded-full text-xl flex justify-center items-center relative text-center pr-2 text-black"></div>
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
                <Button className="hidden md:flex rounded-full text-sm h-8 w-24 font-light bg-black">
                  Sign Up
                </Button>
              </Link>
              <Link href={'/signin'}>
                <Button
                  className="rounded-full text-sm h-8 w-24 font-light bg-black text-white md:text-black md:bg-transparent md:border-black"
                  variant={'outline'}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
