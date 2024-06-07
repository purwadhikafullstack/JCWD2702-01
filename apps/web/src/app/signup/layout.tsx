import { FC, ReactNode } from 'react';

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthSignup: FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthSignup;
