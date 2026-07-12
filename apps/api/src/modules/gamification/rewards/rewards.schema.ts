import { z } from 'zod';

export const CreateRewardSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  pointsRequired: z.coerce.number().int().positive(),
  stock: z.coerce.number().int().min(0),
});
export type CreateRewardBody = z.infer<typeof CreateRewardSchema>;

export const UpdateRewardSchema = CreateRewardSchema.partial();
export type UpdateRewardBody = z.infer<typeof UpdateRewardSchema>;
