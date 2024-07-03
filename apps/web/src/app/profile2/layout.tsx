import UserSidebar from '@/components/profile/profileSidebar/userSidebar';
import { useGetProfile } from '@/features/user/profile/hooks/useGetProfile';
import { useSelector } from 'react-redux';
export default function Profile2({ children }: any) {
  return (
    <div className="bg-pink-200 ml-32">
      <div>ABC</div>
      {children}
    </div>
  );
}
