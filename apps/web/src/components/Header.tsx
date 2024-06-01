import { buttonVariants } from './ui/button';

export const Header = () => {
  return (
    <div className="flex justify-between bg-pink-200 text-lg items-center">
      <div>Logo</div>
      <button className={buttonVariants({ variant: 'default' })}>Signup</button>
    </div>
  );
};
