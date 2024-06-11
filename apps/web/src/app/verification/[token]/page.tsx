'use client';

import VerifiedForm from '@/components/form/verifiedForm';
import ExpiredVerifiedForm from '@/components/form/expiredVerifiedForm';
import { axiosInstance } from '@/utils/AxiosInstance';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Verified({ params }: { params: { token: string } }) {
  const [result, setResult] = useState('');
  const [verifiedStatus, setVerifiedStatus] = useState(false);

  const token = params.token;

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
      console.log(error);
    }
  };

  useEffect(() => {
    handleCheckVerifiedStatus();
  }, [result]);
  return (
    <div>
      <>
        {verifiedStatus == true ? (
          <h1>
            <Link href="/signin">
              <div className="text-2xl font-semibold">You're Verified!</div>
            </Link>
          </h1>
        ) : result === 'error' ? (
          <ExpiredVerifiedForm />
        ) : (
          <VerifiedForm token={token} />
        )}
      </>
    </div>
  );
}
