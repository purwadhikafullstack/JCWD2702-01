'use client';

// import { useState } from 'react';
// import ProfileForm from '@/components/form/profileForm';
// import ProfileSidebar from '@/components/profile/profileSidebar';
// import orderHistory from '@/components/profile/user/orderHistory';
// import myReviews from '@/components/profile/user/myReviews';
// import settings from '@/components/profile/user/settings';
// import issueComplaint from '@/components/profile/user/issueComplaint';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';

// export default function Profile() {
//   const [selectedMenuItem, setSelectedMenuItem] = useState('Profile');

//   let SelectedComponent = ProfileForm;

//   if (selectedMenuItem === 'Order history') {
//     SelectedComponent = orderHistory;
//   } else if (selectedMenuItem === 'My reviews') {
//     SelectedComponent = myReviews;
//   } else if (selectedMenuItem === 'Settings') {
//     SelectedComponent = settings;
//   } else if (selectedMenuItem === 'Issue complaint') {
//     SelectedComponent = issueComplaint;
//   }
//   return (
//     <div className="w-full flex justify-center">
//       <div className="flex justify-center gap-12 p-14 w-full">
//         <ProfileSidebar onSelectMenuItem={setSelectedMenuItem} />
//         <div className="flex flex-col gap-7 text-2xl">
//           <div className="font-semibold flex justify-between">
//             {selectedMenuItem}
//             <div className="flex items-center space-x-2">
//               <Switch id="full-width" />
//               <Label htmlFor="full-width" className="font-light">
//                 Full-width
//               </Label>
//             </div>
//           </div>
//           <SelectedComponent />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import ProfileForm from '@/components/form/profileForm';
import ProfileSidebar from '@/components/profile/profileSidebar';
import OrderHistory from '@/components/profile/user/orderHistory';
import MyReviews from '@/components/profile/user/myReviews';
import Settings from '@/components/profile/user/settings';
import IssueComplaint from '@/components/profile/user/issueComplaint';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function Profile() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Profile');
  const [isFullWidth, setIsFullWidth] = useState(false);

  let SelectedComponent = ProfileForm;

  if (selectedMenuItem === 'Order history') {
    SelectedComponent = OrderHistory;
  } else if (selectedMenuItem === 'My reviews') {
    SelectedComponent = MyReviews;
  } else if (selectedMenuItem === 'Settings') {
    SelectedComponent = Settings;
  } else if (selectedMenuItem === 'Issue complaint') {
    SelectedComponent = IssueComplaint;
  }

  const handleSwitchChange = (checked: boolean) => {
    setIsFullWidth(checked);
  };

  return (
    <div className={`w-full flex justify-center p-14`}>
      <div
        className={`${isFullWidth ? 'flex gap-12 w-full' : 'flex w-3/5 gap-12'}`}
      >
        <ProfileSidebar onSelectMenuItem={setSelectedMenuItem} />
        <div
          className={`flex flex-col gap-7 text-2xl ${isFullWidth ? 'w-3/4' : 'w-full'}`}
        >
          <div className="font-semibold flex justify-between">
            {selectedMenuItem}
            <div className=" sm:hidden md:flex items-center space-x-2">
              <Switch
                id="full-width"
                checked={isFullWidth}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="full-width" className="font-light">
                Full-width
              </Label>
            </div>
          </div>
          <div className={isFullWidth ? 'w-full' : 'flex-grow'}>
            <SelectedComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
