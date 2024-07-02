import { toCurrency } from '@/components/cores/ToCurrency';

export default function PriceDisplay({
  priceBasedOnRange,
  room_typesIndex,
  data,
}: any) {
  return (
    <div className="font-semibold numbers-font py-4">
      {priceBasedOnRange.seasonalNight && priceBasedOnRange.normalNight ? (
        <div className="flex flex-col">
          <div className="text-2xl">
            {toCurrency(priceBasedOnRange.seasonalPrice)} -
          </div>
          <div className="flex gap-2 items-end">
            <div className="text-2xl">
              {toCurrency(priceBasedOnRange.normalPrice)}
            </div>
            <div>/ night</div>
          </div>
        </div>
      ) : priceBasedOnRange.seasonalNight ? (
        <div className="flex gap-2 items-end">
          <div className="text-2xl">
            {toCurrency(priceBasedOnRange.seasonalPrice)}
          </div>
          <div>/ night</div>
        </div>
      ) : (
        <div className="flex gap-2 items-end">
          <div className="text-2xl">
            {toCurrency(data.room_types[room_typesIndex].price)}
          </div>
          <div>/ night</div>
        </div>
      )}
    </div>
  );
}
