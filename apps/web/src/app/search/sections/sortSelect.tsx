import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SortSearch({ sortChangeHandler, sort }: any) {
  return (
    <div className="items-center flex gap-2 text-sm font-medium">
      <p className="flex-shrink-0 font-bold whitespace-nowrap">Sort by</p>
      <Select
        onValueChange={sortChangeHandler}
        defaultValue={`${sort.sortBy},${sort.sort}`}
      >
        <SelectTrigger className="md:h-5 rounded-full text-xs">
          <SelectValue className="text-sm font-semibold" />
        </SelectTrigger>
        <SelectContent className=" rounded-lg">
          <SelectItem className="text-xs" value={`location,`}>
            Location
          </SelectItem>
          <SelectItem className="text-xs" value={`price,asc`}>
            Price (Low to High)
          </SelectItem>
          <SelectItem className="text-xs" value={`price,dsc`}>
            Price (High to Low)
          </SelectItem>
          <SelectItem className="text-xs" value={`name,asc`}>
            Name (A-Z)
          </SelectItem>
          <SelectItem className="text-xs" value={`name,dsc`}>
            Name (Z-A)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
