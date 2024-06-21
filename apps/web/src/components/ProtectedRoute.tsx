'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePersistSignin } from '@/features/auth/signin/hooks/useSignin';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCookie } from '@/utils/Cookies';
import Loading from '@/app/loading';

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();
  const path = usePathname();
  const { mutationPersist } = usePersistSignin();
  const stateUser = useSelector((state: any) => state.user);
  const stateTenant = useSelector((state: any) => state.tenant);
  const [loading, setLoading] = useState(true);

  const checkAuthorizeUser = async () => {
    const cookie = await getCookie();
    if (!cookie) {
      if (path.includes('/profile') || path.includes('/tenant/signup')) {
        router.push('/');
      }
      console.log('no cookie :(');
    } else {
      console.log('cookie exists');
      if (stateTenant.display_name) {
        if (path.includes('tenant/signup')) {
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
  }, [mutationPersist, stateUser]);

  useEffect(() => {
    if (!loading) {
      checkAuthorizeUser();
    }
  }, [loading, path]);

  return loading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <>{children}</>
  );
}
