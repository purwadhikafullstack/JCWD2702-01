import Image from 'next/image';
import { useGetProfile } from '@/features/user/profile/hooks/useGetProfile';
export default function UserSidebar() {
  const { profile } = useGetProfile();
  return (
    <div className="flex flex-col items-center gap-3">
      {profile.image_url ? (
        <div className="w-32 h-32 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
          <Image
            src={profile?.image_url}
            fill={true}
            alt="Image Profile"
            quality={100}
            style={{ objectFit: 'cover' }}
            className="rounded-full"
          />
        </div>
      ) : (
        <div className="w-32 h-32 bg-zinc-100 rounded-full uppercase text-3xl numbers-font flex justify-center items-center relative text-center text-black">
          {profile?.display_name.slice(0, 2)}
        </div>
      )}

      <div className="font-semibold">{profile?.display_name}</div>
      <div></div>
    </div>
  );
}
