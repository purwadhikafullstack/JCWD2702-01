'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  IPersistSignin,
  IPersistTenantData,
} from '@/features/auth/signin/type';
import ProfileForm from '@/components/form/profileForm';

export default function Profile() {
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
    <div>
      <div className="text-2xl font-bold">Personal Info</div>
      <div className="flex flex-col pt-7 space-y-5">
        {userData.rolesId == 1 && userData.image_url ? (
          <div className="w-[80px] h-[80px] bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
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
          <div className="w-[80px] h-[80px] bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
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
          <div className="w-[80px] h-[80px] bg-zinc-100 rounded-full text-xl flex justify-center items-center relative text-center pr-2 text-black"></div>
        )}
        <ProfileForm />
      </div>
    </div>
  );
}
