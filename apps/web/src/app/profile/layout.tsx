import { FC, ReactNode } from 'react';

interface IProfileLayoutProps {
  children: ReactNode;
}

const Profile: FC<IProfileLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex mx-8 my-32 justify-center md:container">
      {children}
    </div>
  );
};

export default Profile;
