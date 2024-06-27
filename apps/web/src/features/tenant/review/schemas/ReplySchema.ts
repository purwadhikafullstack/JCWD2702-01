import { z } from 'zod';
export const ReplySchema = z.object({
  reply: z.string(),
  reviewsId: z.string(),
});
