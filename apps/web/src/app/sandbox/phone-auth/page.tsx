'use client';

import { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

export default function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  function onRecaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'normal',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
          'expired-callback': () => {
            // Handle expired reCAPTCHA
          },
        },
      );
    }
  }

  async function onSendOTP() {
    try {
      const appVerifier = window.recaptchaVerifier;

      let confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );
      window.confirmationResult = confirmationResult;
      alert('Send OTP Success!');
    } catch (error) {
      console.log(error);
      alert('Send OTP Failed!');
    }
  }

  useEffect(() => {
    onRecaptchVerify();
    window.recaptchaVerifier.render();
  }, []);

  const onCheckOtp = async () => {
    try {
      const verifyOTP = await window.confirmationResult.confirm(otp);
      console.log(verifyOTP);
      alert('OTP Verified!');
    } catch (error) {
      console.log(error);
      alert('OTP Error!');
    }
  };

  return (
    <main className="py-10 flex flex-col items-center">
      <section name="form-phoneNumber">
        <input
          type="text"
          className="input border border-gray-300 text-white"
          placeholder="Type Your Phone Number"
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <button onClick={onSendOTP} className="btn bg-red-500 text-white">
          Send OTP
        </button>
      </section>
      <div id="recaptcha-container" className="py-10"></div>
      <section name="form-otp">
        <input
          type="text"
          className="input border border-gray-300"
          placeholder="Type Your OTP"
          onChange={(event) => setOtp(event.target.value)}
        />
        <button className="btn bg-green-500 text-white" onClick={onCheckOtp}>
          Submit OTP
        </button>
      </section>
    </main>
  );
}
