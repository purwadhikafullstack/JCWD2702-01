import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { FacilityBadge } from '@/components/cores/FacilityBadge';
import { Controller } from 'react-hook-form';

export const RoomFacilitiesScrollArea = ({ form, facilities }: any) => {
  return (
    <ScrollArea className="h-64 w-80 rounded-md">
      <div className="">
        <Controller
          name="facilities"
          control={form.control}
          render={({ field }) => (
            <>
              {facilities ? (
                facilities.map((item: any, index: number) => (
                  <div key={item.id} className="flex my-1 gap-2 items-center">
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
