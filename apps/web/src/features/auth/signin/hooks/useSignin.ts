import {
  useSigninMutation,
  usePersistSigninMutation,
} from '../api/useSigninMutation';
import { useRouter } from 'next/navigation';
import { setCookie, deleteCookie } from '@/utils/Cookies';
import { useDispatch } from 'react-redux';
import { setUser } from '@/stores/redux/slice/userSlice';
import { setTenant } from '@/stores/redux/slice/tenantSlice';
import { useToast } from '@/components/ui/use-toast';
import { useSignoutMutation } from '../api/useSignoutMutation';
import { useQueryClient } from '@tanstack/react-query';

export const useSignin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: mutationSignin } = useSigninMutation({
    onSuccess: (res: any) => {
      setCookie(res.data.data.accesstoken);
      dispatch(
        setUser({
          uid: res.data.data.uid,
          display_name: res.data.data.display_name,
          rolesId: res.data.data.rolesId,
          image_url: res.data.data.image_url,
        }),
      );
      toast({
        variant: 'success',
        description: `${res.data.message}`,
      });
      router.push('/');
    },
    onError: (err: any) => {
      toast({
        variant: 'destructive',
        title: `${err.response.data.message}`,
        description: `${err.response.data.message == 'Account is not verified!' ? 'Click Forgot Password to be directed to verify your account.' : 'Please try again.'}`,
      });
    },
  });

  return {
    mutationSignin,
  };
};

export const usePersistSignin = () => {
  const dispatch = useDispatch();
  const { mutate: mutationPersist } = usePersistSigninMutation({
    onSuccess: (res: any) => {
      dispatch(
        setUser({
          uid: res.data.user.uid,
          display_name: res.data.user.display_name,
          rolesId: res.data.user.rolesId,
          image_url: res.data.user.image_url,
        }),
      );
      dispatch(
        setTenant({
          display_name: res.data.tenant.display_name,
          image_url: res.data.tenant.image_url,
        }),
      );
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    mutationPersist,
  };
};

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: mutationSignout } = useSignoutMutation({
    onSuccess: () => {
      deleteCookie();
      dispatch(
        setUser({
          uid: '',
          role: '',
          display_name: '',
        }),
      );
      dispatch(
        setTenant({
          image_url: '',
          display_name: '',
        }),
      );
      queryClient.cancelQueries({ queryKey: ['profile'] });
      router.push('/');
      // window.location.reload();
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    mutationSignout,
  };
};
