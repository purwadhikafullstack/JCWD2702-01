import { FC, ReactNode } from 'react';

interface IProfileLayoutProps {
  children: ReactNode;
}

const Profile: FC<IProfileLayoutProps> = ({ children }) => {
  return <div className="h-screen pt-7 container">{children}</div>;
};

export default Profile;
