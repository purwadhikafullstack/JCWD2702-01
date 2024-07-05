import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { FacilityBadge } from '@/components/cores/FacilityBadge';
import { Controller } from 'react-hook-form';

export const RoomFacilitiesScrollArea = ({ form, facilities }: any) => {
  return (
<<<<<<< HEAD
    <ScrollArea className="h-64 w-80 rounded-md border bg-zinc-100">
      <div className="p-4">
=======
    <ScrollArea className="h-64 w-80 rounded-md">
      <div className="">
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
        <Controller
          name="facilities"
          control={form.control}
          render={({ field }) => (
            <>
              {facilities ? (
                facilities.map((item: any, index: number) => (
<<<<<<< HEAD
                  <div key={item.id} className="flex gap-2 items-center">
=======
                  <div key={item.id} className="flex my-1 gap-2 items-center">
>>>>>>> c4807c71e6e7e16f48741b7526ae8aa2a2057853
                    <Checkbox
                      checked={field.value.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, item.id]
                          : field.value.filter((id: number) => id !== item.id);
                        field.onChange(newValue);
                      }}
                    />
                    <FacilityBadge icon={true} text={item.facility} />
                  </div>
                ))
              ) : (
                <div>Loading</div>
              )}
            </>
          )}
        />
      </div>
    </ScrollArea>
  );
};
