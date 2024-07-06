'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  IPersistSignin,
  IPersistTenantData,
} from '@/features/auth/signin/type';
import { useSwitchUserRole } from '@/features/user/profile/hooks/useSwitchUserRole';
import { useGetProfile } from '@/features/user/profile/hooks/useGetProfile';
import { Home } from 'lucide-react';
export default function ProfileSidebar({
  selectedMenuItem,
  onSelectMenuItem,
}: any) {
  const [userData, setUserData] = useState<IPersistSignin>(
    {} as IPersistSignin,
  );
  const [tenantData, setTenantData] = useState<IPersistTenantData>(
    {} as IPersistTenantData,
  );
  const { profile } = useGetProfile();
  const stateUser = useSelector((state: any) => state.user);
  const stateTenant = useSelector((state: any) => state.tenant);
  const { mutationSwitchUserRole } = useSwitchUserRole();

  const handleMenuItemClick = (menuItem: string) => {
    onSelectMenuItem(menuItem);
  };

  useEffect(() => {
    setUserData(stateUser);
    setTenantData(stateTenant);
  }, [stateUser, stateTenant]);

  return (
    <div className="md:shadow-md md:border justify-self-start rounded-xl w-60 pb-4 h-full">
      <div className="pt-5 w-full flex flex-col items-center gap-3">
        {profile?.rolesId == 1 && profile?.image_url ? (
          <div className="w-32 h-32 bg-stone-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
            <Image
              src={profile?.image_url}
              fill={true}
              alt="Image Profile"
              quality={100}
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
        ) : profile?.rolesId == 2 && profile?.tenants?.image_url ? (
          <div className="w-32 h-32 bg-stone-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
            <Image
              src={profile?.tenants?.image_url}
              fill={true}
              alt="Tenant Profile Image"
              quality={100}
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="w-32 h-32 bg-stone-100 rounded-full text-3xl flex justify-center items-center relative text-center uppercase numbers-font text-black">
            {profile?.rolesId == 1
              ? profile?.display_name.slice(0, 2)
              : profile?.tenants?.display_name.slice(0, 2)}
          </div>
        )}
        <div className="font-semibold text-center">
          {profile?.rolesId == 1 ? (
            profile?.display_name
          ) : (
            <div className="flex items-center gap-1">
              <div>
                <Home className="h-4 w-4" />
              </div>
              <div>{profile?.tenants?.display_name}</div>
            </div>
          )}
        </div>
      </div>
      <div className="pt-7 font-medium text-sm flex flex-col gap-3 px-4">
        <div
          onClick={() => handleMenuItemClick('Profile')}
          className={`cursor-pointer hover:bg-stone-50 transition rounded-lg flex items-center pl-2 h-8 ${selectedMenuItem === 'Profile' ? 'bg-stone-100 rounded-lg' : ''}`}
        >
          Profile
        </div>
        {profile?.rolesId == 1 ? (
          <div
            onClick={() => handleMenuItemClick('Order history')}
            className={`cursor-pointer hover:bg-stone-50 transition rounded-lg flex items-center pl-2 h-8 ${selectedMenuItem === 'Order history' ? 'bg-stone-100 rounded-lg' : ''}`}
          >
            Order history
          </div>
        ) : (
          <div
            onClick={() => handleMenuItemClick('My listings')}
            className={`cursor-pointer hover:bg-stone-50 transition rounded-lg flex items-center pl-2 h-8 ${selectedMenuItem === 'My listings' ? 'bg-stone-100 rounded-lg' : ''}`}
          >
            My listings
          </div>
        )}
        {profile?.rolesId == 2 ? (
          <div
            onClick={() => handleMenuItemClick('Booking requests')}
            className={`cursor-pointer hover:bg-stone-50 transition rounded-lg flex items-center pl-2 h-8 ${selectedMenuItem === 'Booking requests' ? 'bg-stone-100 rounded-lg' : ''}`}
          >
            Booking Requests
          </div>
        ) : null}
        {profile?.rolesId == 1 ? null : (
          <div
            onClick={() => handleMenuItemClick('Guest reviews')}
            className={`cursor-pointer hover:bg-stone-50 transition rounded-lg flex items-center pl-2 h-8 ${selectedMenuItem === 'Guest reviews' ? 'bg-stone-100 rounded-lg' : ''}`}
          >
            Guest reviews
          </div>
        )}
        {profile?.rolesId == 1 ? (
          <div
            onClick={() => handleMenuItemClick('Past stays')}
            className={`cursor-pointer hover:bg-stone-50 transition rounded-lg flex items-center pl-2 h-8 ${selectedMenuItem === 'Past stays' ? 'bg-stone-100 rounded-lg' : ''}`}
          >
            Past stays
          </div>
        ) : (
          <div
            onClick={() => handleMenuItemClick('Sales report')}
            className={`cursor-pointer hover:bg-stone-50 transition rounded-lg flex items-center pl-2 h-8 ${selectedMenuItem === 'Sales report' ? 'bg-stone-100 rounded-lg' : ''}`}
          >
            Sales report
          </div>
        )}
        <div
          onClick={(e) => {
            mutationSwitchUserRole(e);
            handleMenuItemClick('Profile');
          }}
          className="cursor-pointer hover:bg-stone-700 transition rounded-lg bg-black font-medium text-white flex items-center pl-2 h-8"
        >
          {profile?.rolesId == 1
            ? 'Switch to tenant mode'
            : 'Switch to user mode'}
        </div>
        <div
          onClick={() => handleMenuItemClick('Settings')}
          className={`cursor-pointer hover:bg-stone-50 transition rounded-lg flex items-center pl-2 h-8 ${selectedMenuItem === 'Settings' ? 'bg-stone-100 rounded-lg' : ''}`}
        >
          Settings
        </div>
        <div
          onClick={() => handleMenuItemClick('Issue complaint')}
          className={`cursor-pointer hover:bg-stone-50 transition rounded-lg flex items-center pl-2 h-8 ${selectedMenuItem === 'Issue complaint' ? 'bg-stone-100 rounded-lg' : ''}`}
        >
          Issue complaint
        </div>
      </div>
    </div>
  );
}
