import TenantSignupForm from '@/components/form/tenantSignupForm';

export default function SignupTenant() {
  return (
    <div className="w-80 space-y-1">
      <div className="text-center text-2xl font-bold flex flex-col">
        Sign Up As Tenant To Continue
      </div>
      <TenantSignupForm />
    </div>
  );
}
