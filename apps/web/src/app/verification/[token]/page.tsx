'use client';

import VerifiedForm from '@/components/form/verifiedForm';
import ExpiredVerifiedForm from '@/components/form/expiredVerifiedForm';
import { axiosInstance } from '@/utils/AxiosInstance';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGetProfile } from '@/features/user/profile/hooks/useGetProfile';
import { useVerifyNewEmail } from '@/features/auth/verified/hooks/useVerifyNewEmail';
import { Button } from '@/components/ui/button';

export default function Verified({ params }: { params: { token: string } }) {
  const token = params.token;
  const [result, setResult] = useState('');
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const { profile } = useGetProfile();
  const { mutationVerifyNewEmail } = useVerifyNewEmail();
  console.log(token);

  const handleCheckVerifiedStatus = async () => {
    try {
      const res = await axiosInstance.get(`/verification/status`, {
        headers: {
          accesstoken: token,
        },
      });

      const status = res.data.data;
      setVerifiedStatus(status);
      setResult('Success');
    } catch (error) {
      setResult('error');
    }
  };

  const handleVerifyNewEmail = () => {
    mutationVerifyNewEmail();
    setVerifiedStatus(true);
    setResult('Success');
  };

  useEffect(() => {
    handleCheckVerifiedStatus();
  }, [result, verifiedStatus]);
  return (
    <div>
      {profile?.display_name && profile.is_verified === false ? (
        <>
          <h1>
            <Button className="rounded-lg h-20" onClick={handleVerifyNewEmail}>
              <div className="text-2xl font-semibold">Verified My Email</div>
            </Button>
          </h1>
        </>
      ) : (
        <>
          {verifiedStatus == true ? (
            <h1>
              <Link href="/signin">
                <Button className="rounded-lg h-20" variant={'outline'}>
                  <div className="text-2xl font-semibold">You're Verified!</div>
                </Button>
              </Link>
            </h1>
          ) : result === 'error' ? (
            <ExpiredVerifiedForm />
          ) : (
            <VerifiedForm token={token} />
          )}
        </>
      )}
    </div>
  );
}
