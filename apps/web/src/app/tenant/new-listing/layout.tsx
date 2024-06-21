import { FC, ReactNode } from 'react';

interface INewListingProps {
  children: ReactNode;
}

const NewListing: FC<INewListingProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-screen">
      {children}
    </div>
  );
};

export default NewListing;
