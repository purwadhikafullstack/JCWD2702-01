import { FC, ReactNode } from 'react';

interface ISignupTenantProps {
  children: ReactNode;
}

const SignupTenant: FC<ISignupTenantProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default SignupTenant;
