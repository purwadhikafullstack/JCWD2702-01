'use client';

import { useState } from 'react';
import ProfileForm from '@/components/form/profileForm';
import ProfileSidebar from '@/components/profile/profileSidebar';
import OrderHistory from '@/components/profile/user/orderHistory';
import MyReviews from '@/components/profile/user/myReviews';
import Settings from '@/components/profile/user/settings';
import IssueComplaint from '@/components/profile/user/issueComplaint';
import BookingRequests from '@/components/profile/tenant/bookingRequests';
import MyListings from '@/components/profile/tenant/myListing';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Menu } from 'lucide-react';

export default function Profile() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Profile');
  const [isFullWidth, setIsFullWidth] = useState(false);

  let SelectedComponent = ProfileForm;

  switch (selectedMenuItem) {
    case 'Order history':
      SelectedComponent = OrderHistory;
      break;
    case 'My reviews':
      SelectedComponent = MyReviews;
      break;
    case 'Settings':
      SelectedComponent = Settings;
      break;
    case 'Issue complaint':
      SelectedComponent = IssueComplaint;
      break;
    case 'Booking requests':
      SelectedComponent = BookingRequests;
      break;
    case 'My listings':
      SelectedComponent = MyListings;
      break;
    default:
      SelectedComponent = ProfileForm;
  }

  const handleSwitchChange = (checked: boolean) => {
    setIsFullWidth(checked);
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className={`w-full flex flex-col md:flex-row md:gap-12 ${isFullWidth ? 'lg:w-full' : 'lg:w-3/5'}`}
      >
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent
              side={'left'}
              className="w-64 flex items-center justify-center"
            >
              <ProfileSidebar
                selectedMenuItem={selectedMenuItem}
                onSelectMenuItem={setSelectedMenuItem}
              />
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:block">
          <ProfileSidebar
            selectedMenuItem={selectedMenuItem}
            onSelectMenuItem={setSelectedMenuItem}
          />
        </div>
        <div
          className={`flex flex-col gap-7 ${isFullWidth ? 'w-3/4' : 'w-full'}`}
        >
          <div className="font-semibold text-2xl flex justify-between">
            {selectedMenuItem}
            <div className="hidden lg:flex items-center space-x-2">
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
          <div className={isFullWidth ? 'w-full h-full' : 'flex-grow'}>
            <SelectedComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
