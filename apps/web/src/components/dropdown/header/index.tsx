'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { IPersistSignin } from '@/features/auth/signin/type';
import { useSelector } from 'react-redux';
import { useSwitchUserRole } from '@/features/profile/hooks/useSwitchUserRole';
import { useLogout } from '@/features/auth/signin/hooks/useSignin';

export default function HeaderDropDown() {
  const { mutationSignout } = useLogout();
  const { mutationSwitchUserRole } = useSwitchUserRole();
  const [userData, setUserData] = useState<IPersistSignin>(
    {} as IPersistSignin,
  );

  const stateUser = useSelector((state: any) => state.user);

  const handleLogout = () => {
    mutationSignout();
  };

  useEffect(() => {
    setUserData(stateUser);
  }, [stateUser]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'ghost'}
            className="w-auto h-auto outline-transparent"
          >
            <MdOutlineKeyboardArrowDown className="text-white text-md text-thin" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-56 mr-7 mt-2 rounded-2xl pr-5 pt-3 pb-3 space-y-3">
          <Link href={'/profile'}>
            <DropdownMenuRadioItem value={''} className="hover:cursor-pointer">
              Profile
            </DropdownMenuRadioItem>
          </Link>
          <Link href={'/'} className="m-0 p-0 h-0 ">
            <DropdownMenuRadioItem value={''} className="hover:cursor-pointer">
              Order History
            </DropdownMenuRadioItem>
          </Link>
          <DropdownMenuRadioItem
            onClick={mutationSwitchUserRole}
            value={''}
            className="hover:cursor-pointer"
          >
            {userData.rolesId == 1
              ? 'Switch to tenant mode'
              : 'Switch to user mode'}
          </DropdownMenuRadioItem>
          <Link href={'/'}>
            <DropdownMenuRadioItem value={''} className="hover:cursor-pointer">
              Setings
            </DropdownMenuRadioItem>
          </Link>
          <DropdownMenuRadioItem
            value={''}
            className="hover:cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </DropdownMenuRadioItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
