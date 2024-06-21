import { FC, ReactNode } from 'react';

interface IResetPasswordProps {
  children: ReactNode;
}

const ResetPassword: FC<IResetPasswordProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default ResetPassword;
