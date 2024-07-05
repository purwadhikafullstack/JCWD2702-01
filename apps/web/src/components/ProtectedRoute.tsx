'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePersistSignin } from '@/features/auth/signin/hooks/useSignin';
import { useSelector } from 'react-redux';
import { getCookie } from '@/utils/Cookies';
import Loading from '@/app/loading';

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const path = usePathname();
  const { mutationPersist } = usePersistSignin();
  const stateUser = useSelector((state: any) => state.user);
  const stateTenant = useSelector((state: any) => state.tenant);
  const existingUser = stateUser.display_name;
  const existingTenant = stateTenant.display_name;
  const userRoles = stateUser.rolesId;
  const [loading, setLoading] = useState(true);
  const [stateReady, setStateReady] = useState(false);

  const checkAuthorizeUser = async () => {
    const cookie = await getCookie();
    if (!cookie) {
      if (
        path.includes('/profile') ||
        path.includes('/be-a-tenant') ||
        path.includes('/tenant/set-up') ||
        path.includes('/tenant/new-listing')
      ) {
        router.push('/');
      }
      console.log('no cookie :(');
    } else {
      if (
        path.includes('/signup') ||
        path.includes('/signin') ||
        path.includes('/reset-password') ||
        path.includes('/forgot-password') ||
        path.includes('/verification')
      ) {
        router.push('/');
      }
      console.log('cookie exists');
      if (existingTenant) {
        if (path.includes('/be-a-tenant') || path.includes('/tenant/set-up')) {
          router.push('/');
        }
      }
    }
  };

  const checkUser = async () => {
    try {
      await mutationPersist();
      setLoading(false);
    } catch (error) {
      console.error('Error during persisting login:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, [mutationPersist]);

  useEffect(() => {
    if (stateUser && stateTenant) {
      setStateReady(true);
    }
  }, [stateUser, stateTenant]);

  useEffect(() => {
    if (!loading && stateReady) {
      checkAuthorizeUser();
    }
  }, [loading, stateReady, path]);

  return loading ? <Loading /> : <>{children}</>;
}
