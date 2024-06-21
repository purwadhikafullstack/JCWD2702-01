export function toCurrency(val: number) {
  return val.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
}
