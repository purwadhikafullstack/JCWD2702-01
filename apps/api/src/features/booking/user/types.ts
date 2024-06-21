export interface IBooking {
  usersId: string;
  room_typesId: number;
  total_price: number;
  start_date: Date;
  end_date: Date;
  num_of_guests: number;
  promotionsId?: number;
  payment_typesId: number;
  details?: object | string | undefined;
}
