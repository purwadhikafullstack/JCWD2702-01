'use client';

import TenantSignupForm from '@/components/form/tenantSignupForm';
import TenantBankDetailsForm from '@/components/form/tenantBankDetailsForm';
import CreatedTenantProfile from '@/components/profile/tenant/createdProfile';
import { useState, useEffect } from 'react';

export default function SignupTenant() {
  const [step, setStep] = useState(() => {
    const step = localStorage.getItem('signupStep');
    return step ? parseInt(step, 10) : 1;
  });

  const nextStep = () => {
    setStep((curr) => {
      const newStep = curr + 1;
      localStorage.setItem('signupStep', newStep.toString());
      return newStep;
    });
  };

  const resetStep = () => {
    setStep(1);
    localStorage.setItem('signupStep', '1');
  };

  useEffect(() => {
    localStorage.setItem('signupStep', step.toString());
  }, [step]);

  const RenderComponent = () => {
    if (step === 1) {
      return <TenantSignupForm nextStep={nextStep} />;
    } else if (step === 2) {
      return <TenantBankDetailsForm nextStep={nextStep} />;
    } else if (step === 3) {
      return <CreatedTenantProfile resetStep={resetStep} />;
    }
    return null;
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <RenderComponent />
    </div>
  );
}
