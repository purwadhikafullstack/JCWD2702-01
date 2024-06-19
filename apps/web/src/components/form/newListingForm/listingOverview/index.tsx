import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ListingOverview() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-7 items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="font-semibold text-xl">Your listing is now live!</div>
        <div>Guests can now see your listing and make reservations.</div>
      </div>
      <div>
        <Button
          className="h-7 border border-zinc-300"
          variant={'outline'}
          onClick={() => {
            router.push('/profile');
          }}
        >
          Back to profile
        </Button>
      </div>
    </div>
  );
}
