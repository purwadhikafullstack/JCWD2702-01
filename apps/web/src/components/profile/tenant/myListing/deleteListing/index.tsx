import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash } from 'lucide-react';

export const DeleteListing = ({ handleDeleteListing, item }: any) => {
  return (
    <div className="flex-none flex justify-around gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
<<<<<<< HEAD
          <Trash className="w-5 h-5 cursor-pointer" />
=======
          <div className="flex items-center gap-1 text-red-500 hover:cursor-pointer text-xs p-1 px-2 rounded-full hover:bg-rose-50 font-medium">
            <Trash className="w-4 h-4 cursor-pointer" /> Delete
          </div>
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              listing and remove the listing data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteListing(item.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
