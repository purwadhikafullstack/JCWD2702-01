import { Tent, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CounterComponent = ({
  count,
  setCount,
  text,
  icon,
  maxCount,
  disabled,
}: {
  count: number;
  setCount: Function;
  text: string;
  icon: any;
  maxCount?: number | undefined;
  disabled?: boolean | undefined;
}) => {
  const handleDecrement = (e: any) => {
    e.stopPropagation();
    setCount(Math.max(0, count - 1));
  };

  const handleIncrement = (e: any) => {
    e.stopPropagation();
    setCount(count + 1);
  };

  return (
    <div className="grid grid-cols-2 justify-between gap-4 w-full">
      <div className="flex gap-2 items-center">
        {icon ? icon : <Tent />}
        <span>{text}</span>
      </div>
      <div className="grid grid-cols-3 gap-4 justify-items-center items-center w-[100px]">
        <Button
          type="button"
          onClick={handleDecrement}
          variant="outline"
          size="icon"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div>{count}</div>
        <Button
          type="button"
          disabled={disabled ? true : count == maxCount ? true : false}
          onClick={handleIncrement}
          variant="outline"
          size="icon"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
