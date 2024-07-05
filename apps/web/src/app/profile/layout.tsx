import { FC, ReactNode } from 'react';

interface IProfileLayoutProps {
  children: ReactNode;
}

const Profile: FC<IProfileLayoutProps> = ({ children }) => {
  return (
<<<<<<< HEAD
    <div className="min-h-screen flex my-32 justify-center md:container">
=======
    <div className="min-h-screen flex mx-8 my-32 justify-center md:container">
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
      {children}
    </div>
  );
};

export default Profile;
