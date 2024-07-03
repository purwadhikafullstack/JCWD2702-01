import SigninForm from '@/components/form/signinForm';
import Link from 'next/link';

export default function Signin() {
  return (
    <div className="w-80">
      <div className="text-center text-2xl font-bold flex flex-col">
        Sign In
        <span className="font-light text-sm mt-2">
          Don&apos;t have an account?{' '}
          <Link href={'/signup'} className="hover:text-blue-400">
            SignUp!
          </Link>
        </span>
      </div>
      <SigninForm />
    </div>
  );
}
