import Image from 'next/image';

<<<<<<< HEAD
export const ProfilePicture = ({ userData, tenantData }: any) => {
  return (
    <div className="pt-5 w-full flex flex-col items-start gap-3">
      {userData.rolesId == 1 && userData.image_url ? (
        <div className="w-32 h-32 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
          <Image
            src={userData.image_url}
=======
export const ProfilePicture = ({ userData, tenantData, profile }: any) => {
  return (
    <div className="pt-5 w-full flex flex-col items-start gap-3">
      {profile?.rolesId == 1 && profile?.image_url ? (
        <div className="w-32 h-32 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
          <Image
            src={profile?.image_url}
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
            fill={true}
            alt="Image Profile"
            quality={100}
            style={{ objectFit: 'cover' }}
            className="rounded-full"
          />
        </div>
<<<<<<< HEAD
      ) : userData.rolesId == 2 && tenantData?.image_url ? (
        <div className="w-32 h-32 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
          <Image
            src={tenantData.image_url}
=======
      ) : profile?.rolesId == 2 && profile?.tenants?.image_url ? (
        <div className="w-32 h-32 bg-zinc-100 rounded-full text-white text-sm flex justify-center items-center relative text-center pr-2">
          <Image
            src={profile?.tenants?.image_url}
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
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
<<<<<<< HEAD
        {userData.rolesId == 1
          ? userData.display_name
          : tenantData?.display_name}
=======
        {profile?.rolesId == 1
          ? profile?.display_name
          : profile?.tenants?.display_name}
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
      </div>
    </div>
  );
};
