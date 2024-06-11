import SignupForm from '@/components/form/signupForm';
import Link from 'next/link';

export default function Signup() {
  return (
    <div className="w-80 space-y-1">
      <div className="text-center text-2xl font-bold flex flex-col">
        Sign Up
        <span className="font-light text-sm mt-2">
          Already have an account?{' '}
          <Link href={'/signin'} className="hover:text-blue-400">
            SignIn!
          </Link>
        </span>
      </div>
      <SignupForm />
    </div>
  );
}
