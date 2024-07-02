import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="flex h-screen">
      <div className="m-auto flex flex-col gap-2 items-center">
        <div className="font-bold text-[100px]">404</div>
        <Separator className="bg-stone-400 -mt-2" />
        <div className="font-medium text-lg">Page not found</div>
        <Link href={'/'}>
          <Button className="rounded-full my-3 w-64">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
