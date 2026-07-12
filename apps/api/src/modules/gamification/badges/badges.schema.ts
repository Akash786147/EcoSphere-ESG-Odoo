import { z } from 'zod';

export const CreateBadgeSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  icon: z.string().min(1),
  unlockRule: z.object({
    type: z.enum(['XP_THRESHOLD', 'CHALLENGE_COUNT', 'STREAK_DAYS']),
    value: z.number().positive(),
  }),
});
export type CreateBadgeBody = z.infer<typeof CreateBadgeSchema>;

export const UpdateBadgeSchema = CreateBadgeSchema.partial();
export type UpdateBadgeBody = z.infer<typeof UpdateBadgeSchema>;
