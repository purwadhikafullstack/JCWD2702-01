
import { z } from 'zod';

export const formSchema = z.object({
  duration: z.object({
    from: z.date(),
    to: z.date(),
  }),
  guests: z.object({
    adults: z.number().min(1),
    children: z.number().min(0),
    pets: z.number().min(0),
  }),
  seasonal_price: z.number(),
  seasonal_night: z.number(),
  normal_price: z.number(),
  normal_night: z.number(),
  room_types: z.number(),
  include_breakfast: z.boolean(),
  breakfast_price: z.number(),
});