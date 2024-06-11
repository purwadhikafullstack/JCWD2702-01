import { FC, ReactNode } from 'react';

interface ISignupTenantProps {
  children: ReactNode;
}

const SignupTenant: FC<ISignupTenantProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {children}
    </div>
  );
};

export default SignupTenant;
