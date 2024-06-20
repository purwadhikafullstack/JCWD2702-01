import { toCurrency } from '@/components/cores/ToCurrency';

export default function PriceDetails({
  priceBasedOnRange,
  form,
  breakfast_price,
}: any) {
  return (
    <div className="grid gap-2 py-2">
      <div className="font-bold text-lg">Price details</div>
      <div className="">
        <div className="flex font-medium justify-between">
          <div>Rooms</div>
          <div>{toCurrency(priceBasedOnRange.totalPrice)}</div>
        </div>
        <div className="text-sm">
          {priceBasedOnRange.seasonalNight ? (
            <div className="flex justify-between">
              <div>{priceBasedOnRange.seasonalNight} Nights</div>
              <div>
                {`${priceBasedOnRange.seasonalNight} x ${toCurrency(priceBasedOnRange.seasonalPrice)}`}
              </div>
            </div>
          ) : null}
          {priceBasedOnRange.normalNight ? (
            <div className="flex justify-between">
              <div>{priceBasedOnRange.normalNight} Nights</div>
              <div>
                {`${priceBasedOnRange.normalNight} x ${toCurrency(priceBasedOnRange.normalPrice)}`}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="font-medium">
        <div className="flex justify-between">
          <div>Taxes & fees</div>
          <div>{toCurrency(priceBasedOnRange.totalPrice * 0.2)}</div>
        </div>
      </div>
      {form.watch('include_breakfast') === true && breakfast_price ? (
        <div className="font-medium">
          <div className="flex justify-between">
            <div>Breakfast</div>
            <div>{toCurrency(breakfast_price)}</div>
          </div>
        </div>
      ) : null}
      <div className="font-medium">
        <div className="flex justify-between">
          <div>Total</div>
          <div className="font-bold">
            {toCurrency(
              priceBasedOnRange.totalPrice * 1.2 +
                (form.watch('include_breakfast') && breakfast_price
                  ? breakfast_price
                  : 0),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
