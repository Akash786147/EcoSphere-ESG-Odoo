import { z } from 'zod';
import { TrainingType } from '../../../common/types/enums.js';

export const CreateTrainingSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  categoryId: z.string().uuid(),
  trainingType: z.nativeEnum(TrainingType),
  durationMinutes: z.coerce.number().int().positive(),
  xpReward: z.coerce.number().int().min(0),
  contentUrl: z.string().url(),
  validFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  validTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
export type CreateTrainingBody = z.infer<typeof CreateTrainingSchema>;

export const UpdateTrainingSchema = CreateTrainingSchema.partial();
export type UpdateTrainingBody = z.infer<typeof UpdateTrainingSchema>;

export const UpdateProgressSchema = z.object({
  progressPct: z.coerce.number().int().min(0).max(100),
  scorePct: z.coerce.number().min(0).max(100).optional(),
});
export type UpdateProgressBody = z.infer<typeof UpdateProgressSchema>;
