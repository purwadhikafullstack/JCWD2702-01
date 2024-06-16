'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useEffect, useState } from 'react';
import {
  IPersistSignin,
  IPersistTenantData,
} from '@/features/auth/signin/type';
import { useDispatch, useSelector } from 'react-redux';
import { useSwitchUserRole } from '@/features/profile/hooks/useSwitchUserRole';
import { useLogout } from '@/features/auth/signin/hooks/useSignin';
import { usePathname } from 'next/navigation';

export default function HeaderDropDown() {
  const dispatch = useDispatch();
  const { mutationSignout } = useLogout();
  const { mutationSwitchUserRole } = useSwitchUserRole();
  const [userData, setUserData] = useState<IPersistSignin>(
    {} as IPersistSignin,
  );
  const [tenantData, setTenantData] = useState<IPersistTenantData>(
    {} as IPersistTenantData,
  );
  const path = usePathname();
  const stateUser = useSelector((state: any) => state.user);
  const stateTenant = useSelector((state: any) => state.tenant);

  const handleLogout = () => {
    mutationSignout();
  };

  useEffect(() => {
    setUserData(stateUser);
    setTenantData(stateTenant);
  }, [stateUser, stateTenant]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'ghost'}
            className="w-auto h-auto outline-transparent"
          >
            <MdOutlineKeyboardArrowDown className="text-md text-thin" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-56 mr-7 mt-2 rounded-2xl pr-5 pt-3 md:pt-0 pb-3 space-y-3">
          <DropdownMenuLabel className="flex md:hidden pl-7">
            {userData.rolesId == 1
              ? userData.display_name
              : tenantData?.display_name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="flex md:hidden bg-zinc-400 w-56" />
          <div className="flex flex-col gap-2">
            <Link href={'/profile'}>
              <DropdownMenuRadioItem
                value={''}
                className="hover:cursor-pointer pt-3"
              >
                Profile
              </DropdownMenuRadioItem>
            </Link>
            <Link href={'#'}>
              <DropdownMenuRadioItem
                value={''}
                className="hover:cursor-pointer"
              >
                Order History
              </DropdownMenuRadioItem>
            </Link>
            <Link
              href={'/#'}
              className={`${path.includes('/profile') ? 'hidden' : 'flex'}`}
            >
              <DropdownMenuRadioItem
                onClick={mutationSwitchUserRole}
                value={''}
                className="hover:cursor-pointer"
              >
                {userData.rolesId == 1
                  ? 'Switch to tenant mode'
                  : 'Switch to user mode'}
              </DropdownMenuRadioItem>
            </Link>
            <Link href={'#'}>
              <DropdownMenuRadioItem
                value={''}
                className="hover:cursor-pointer"
              >
                Setings
              </DropdownMenuRadioItem>
            </Link>
            <Link href={'#'}>
              <DropdownMenuRadioItem
                value={''}
                className="hover:cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuRadioItem>
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
