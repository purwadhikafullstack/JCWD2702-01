import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CreatedTenantProfile({ resetStep }: any) {
  return (
    <div className="flex flex-col justify-center items-center gap-7">
      <div className="text-4xl font-semibold text-center">
        Your tenant profile is now ready!
      </div>
      <div className="text-center font-light text-sm">
        Your application is being reviewed by our administrators. <br /> This
        usually takes minutes to a few days, depending on the load of tenant
        application <br />
        we receive. Please check in from time to time for approval progress.
      </div>
      <div className="w-full flex flex-col items-center gap-3 md:flex-row md:justify-around pt-4">
        <Link href={'/profile'}>
          <Button
            className="rounded-full border-2 text-sm h-8 w-52 bg-transparent font-light"
            variant={'outline'}
            onClick={resetStep}
          >
            Go to tenant profile
          </Button>
        </Link>
        <Link href={'/tenant/new-listing'}>
          <Button className="rounded-full text-sm h-8 w-52 font-light bg-black">
            Set up new listing
          </Button>
        </Link>
      </div>
    </div>
  );
}
