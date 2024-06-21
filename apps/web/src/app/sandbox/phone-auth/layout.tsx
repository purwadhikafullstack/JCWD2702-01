import { FC, ReactNode } from 'react';

interface IProfileLayoutProps {
  children: ReactNode;
}

const Profile: FC<IProfileLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex pt-10 justify-center md:container">
      {children}
    </div>
  );
};

export default Profile;
