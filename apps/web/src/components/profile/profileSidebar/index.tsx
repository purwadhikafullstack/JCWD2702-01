'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  IPersistSignin,
  IPersistTenantData,
} from '@/features/auth/signin/type';
import { IProfileSidebarProps } from './type';
import { useSwitchUserRole } from '@/features/user/profile/hooks/useSwitchUserRole';

export default function ProfileSidebar({
  onSelectMenuItem,
}: IProfileSidebarProps) {
  const [userData, setUserData] = useState<IPersistSignin>(
    {} as IPersistSignin,
  );
  const [tenantData, setTenantData] = useState<IPersistTenantData>(
    {} as IPersistTenantData,
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState('Profile');
  const stateUser = useSelector((state: any) => state.user);
  const stateTenant = useSelector((state: any) => state.tenant);
  const { mutationSwitchUserRole } = useSwitchUserRole();

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
    onSelectMenuItem(menuItem);
  };

  useEffect(() => {
    setUserData(stateUser);
    setTenantData(stateTenant);
  }, [stateUser, stateTenant]);

  return (
    <div className="border border-zinc-400 rounded-xl h-4/5 w-60 pb-4">
      <div className=" pt-5 w-full flex flex-col items-center gap-3">
        {userData.rolesId == 1 && userData.image_url ? (
          <div className="w-32 h-32 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
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
          <div className="w-32 h-32 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
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
          <div className="w-32 h-32 bg-zinc-100 rounded-full text-xl flex justify-center items-center relative text-center pr-2 text-black"></div>
        )}
        <div className="font-semibold text-center">
          {userData.rolesId == 1
            ? userData.display_name
            : tenantData?.display_name}
        </div>
      </div>
      <div className="pt-7 text-sm flex flex-col gap-3 px-4">
        <div
          onClick={() => handleMenuItemClick('Profile')}
          className={`cursor-pointer flex items-center pl-2 h-8 ${selectedMenuItem === 'Profile' ? 'bg-zinc-100 rounded-lg' : ''}`}
        >
          Profile
        </div>
        {userData.rolesId == 1 ? (
          <div
            onClick={() => handleMenuItemClick('Order history')}
            className={`cursor-pointer flex items-center pl-2 h-8 ${selectedMenuItem === 'Order history' ? 'bg-zinc-100 rounded-lg' : ''}`}
          >
            Order history
          </div>
        ) : (
          <div
            onClick={() => handleMenuItemClick('My listings')}
            className="cursor-pointer flex items-center pl-2 h-8"
          >
            My listings
          </div>
        )}
        {userData.rolesId == 1 ? (
          <div
            onClick={() => handleMenuItemClick('My reviews')}
            className={`cursor-pointer flex items-center pl-2 h-8 ${selectedMenuItem === 'My reviews' ? 'bg-zinc-100 rounded-lg' : ''}`}
          >
            My reviews
          </div>
        ) : (
          <div className="cursor-pointer flex items-center pl-2 h-8">
            Sales report
          </div>
        )}
        <div
          onClick={(e) => {
            mutationSwitchUserRole(e);
            handleMenuItemClick('Profile');
          }}
          className="cursor-pointer flex items-center pl-2 h-8"
        >
          {userData.rolesId == 1
            ? 'Switch to tenant mode'
            : 'Switch to user mode'}
        </div>
        <div
          onClick={() => handleMenuItemClick('Settings')}
          className={`cursor-pointer flex items-center pl-2 h-8 ${selectedMenuItem === 'Settings' ? 'bg-zinc-100 rounded-lg' : ''}`}
        >
          Settings
        </div>
        <div
          onClick={() => handleMenuItemClick('Issue complaint')}
          className={`cursor-pointer flex items-center pl-2 h-8 ${selectedMenuItem === 'Issue complaint' ? 'bg-zinc-100 rounded-lg' : ''}`}
        >
          Issue complaint
        </div>
      </div>
    </div>
  );
}
