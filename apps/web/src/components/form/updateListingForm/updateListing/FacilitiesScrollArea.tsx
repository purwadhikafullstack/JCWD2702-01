import { Controller } from 'react-hook-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { FacilityBadge } from '@/components/cores/FacilityBadge';

export const FacilitiesScrollArea = ({ facilities, form }: any) => {
  return (
    <>
      <div className="flex flex-col items-start w-full lg:w-1/2">
        <div className="font-semibold text-lg">Facilities</div>
        <ScrollArea className="h-52 w-full rounded-md border">
          <div className="p-4">
            <Controller
              name="facilities"
              control={form.control}
              render={({ field }: any) => (
                <>
                  {facilities ? (
                    facilities.map((facility: any) => (
                      <div
                        key={facility.id}
                        className="flex gap-2 items-center"
                      >
                        <Checkbox
                          checked={field.value.includes(facility.id)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, facility.id]
                              : field.value.filter(
                                  (id: number) => id !== facility.id,
                                );
                            field.onChange(newValue);
                          }}
                        />
                        <FacilityBadge icon={true} text={facility.facility} />
                      </div>
                    ))
                  ) : (
                    <p>Loading</p>
                  )}
                </>
              )}
            />
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
