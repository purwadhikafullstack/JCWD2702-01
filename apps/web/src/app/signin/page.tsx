import SigninForm from '@/components/form/signinForm';
import Link from 'next/link';

export default function Signin() {
  return (
    <div className="w-80">
      <div className="text-center text-2xl font-bold flex flex-col">
        Sign In
        <span className="font-medium text-sm mt-2">
          Don&apos;t have an account?{' '}
          <Link href={'/signup'} className="text-stone-500 hover:underline">
            Sign Up
          </Link>
        </span>
      </div>
      <SigninForm />
    </div>
  );
}
