import {
  areIntervalsOverlapping,
  differenceInDays,
  getOverlappingDaysInIntervals,
} from 'date-fns';
import { DateRange } from 'react-day-picker';

export const ShowPrice = ({
  date,
  seasonal_prices,
  data,
  room_typesIndex,
  form,
}: {
  date: DateRange | undefined;
  seasonal_prices: any;
  data: any;
  room_typesIndex: number;
  form: any;
}) => {
  const { setValue } = form;
  const normalPrice = data.room_types[room_typesIndex].price;
  setValue('normal_price', normalPrice);
  const totalNights = differenceInDays(date?.to as Date, date?.from as Date);
  let seasonalNight = 0;
  let normalNight = 0;
  let seasonalPrice = 0;
  const overlap = (val: any) => {
    return areIntervalsOverlapping(
      {
        start: new Date(val.start),
        end: new Date(new Date(val.end).setHours(23, 59, 59)),
      },
      { start: date?.from as Date, end: date?.to as Date },
    );
  };

  if (date && date.from && date.to) {
    const hasOverlap = seasonal_prices.some((x: any) => overlap(x));
    if (hasOverlap) {
      const seasonal_entity = seasonal_prices.find((x: any) => overlap(x));
      seasonalNight = getOverlappingDaysInIntervals(
        {
          start: new Date(seasonal_entity.start),
          end: new Date(new Date(seasonal_entity.end).setHours(23, 59, 59)),
        },
        { start: date.from, end: date.to },
      );
      normalNight = totalNights - seasonalNight;
      seasonalPrice = seasonal_entity.price;
      setValue('seasonal_night', seasonalNight);
      setValue('seasonal_price', seasonalPrice);
      setValue('normal_night', normalNight);
    } else {
      normalNight = totalNights;
      setValue('normal_night', normalNight);
    }
  }
  return {
    totalPrice: seasonalNight * seasonalPrice + normalNight * normalPrice,
    totalNights,
    seasonalNight,
    seasonalPrice,
    normalNight,
    normalPrice,
  };
};
