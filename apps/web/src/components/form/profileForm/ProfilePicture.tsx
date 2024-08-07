import Image from 'next/image';

export const ProfilePicture = ({ userData, tenantData, profile }: any) => {
  return (
    <div className="pt-5 w-full flex flex-col items-start gap-3">
      {profile?.rolesId == 1 && profile?.image_url ? (
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
      ) : profile?.rolesId == 2 && profile?.tenants?.image_url ? (
        <div className="w-32 h-32 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
          <Image
            src={profile?.tenants?.image_url}
            fill={true}
            alt="Tenant Profile Image"
            quality={100}
            style={{ objectFit: 'cover' }}
            className="rounded-full"
          />
        </div>
      ) : (
        <div className="w-32 h-32 bg-zinc-100 rounded-full text-xl flex justify-center items-center relative text-center pr-2 text-black"></div>
      )}
      <div className="font-semibold text-center">
        {profile?.rolesId == 1
          ? profile?.display_name
          : profile?.tenants?.display_name}
      </div>
    </div>
  );
};
