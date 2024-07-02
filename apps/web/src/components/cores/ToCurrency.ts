export function toCurrency(val: number | undefined) {
  if (val === undefined) val = 0;
  return Number(val).toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
}
