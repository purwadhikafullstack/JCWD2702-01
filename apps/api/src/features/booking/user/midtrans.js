import Midtrans from 'midtrans-client';

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const midtransBooking = async (data) => {
  const { id, total_price } = data;

  const parameter = {
    transaction_details: {
      order_id: id,
      gross_amount: total_price,
    },
  };

  try {
    const redirectUrl = await snap.createTransactionRedirectUrl(parameter);
    return redirectUrl;
  } catch (error) {
    console.log(error.message);
  }
};
