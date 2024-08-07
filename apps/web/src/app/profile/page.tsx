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
import GuestReviews from '@/components/profile/tenant/guestReviews';
import SalesReport from '@/components/profile/tenant/salesReport';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function Profile() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Profile');
  const [isFullWidth, setIsFullWidth] = useState(false);

  let SelectedComponent = ProfileForm;

  if (selectedMenuItem === 'Order history') {
    SelectedComponent = OrderHistory;
  } else if (selectedMenuItem === 'Past stays') {
    SelectedComponent = MyReviews;
  } else if (selectedMenuItem === 'Settings') {
    SelectedComponent = Settings;
  } else if (selectedMenuItem === 'Issue complaint') {
    SelectedComponent = IssueComplaint;
  } else if (selectedMenuItem === 'Booking requests') {
    SelectedComponent = BookingRequests;
  } else if (selectedMenuItem === 'My listings') {
    SelectedComponent = MyListings;
  } else if (selectedMenuItem === 'Guest reviews') {
    SelectedComponent = GuestReviews;
  } else if (selectedMenuItem === 'Sales report') {
    SelectedComponent = SalesReport;
  }

  const handleSwitchChange = (checked: boolean) => {
    setIsFullWidth(checked);
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className={`w-full flex flex-col md:flex-row md:gap-12 ${isFullWidth ? 'lg:w-full' : 'lg:w-[50vw]'}`}
      >
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="outline" className="mb-5">
                <ChevronLeft className="p-1 -ml-2" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent
              side={'left'}
              className="w-60 flex items-center justify-center"
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
        <div className={`flex flex-col gap-8 w-full`}>
          <div className="font-semibold text-2xl flex justify-between">
            {selectedMenuItem}
            <div className="hidden lg:flex items-center space-x-2">
              <Switch
                id="full-width"
                checked={isFullWidth}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="full-width" className="text-stone-500">
                Full-width
              </Label>
            </div>
          </div>
          <SelectedComponent />
        </div>
      </div>
    </div>
  );
}
