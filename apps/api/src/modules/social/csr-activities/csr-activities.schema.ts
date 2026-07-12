import { z } from 'zod';
import { CsrActivityStatus } from '../../../common/types/enums.js';

export const CreateCsrActivitySchema = z.object({
  title: z.string().min(2),
  categoryId: z.string().uuid(),
  description: z.string().min(10),
  activityDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  location: z.string().min(2),
  pointsOnCompletion: z.coerce.number().int().min(0),
  evidenceRequired: z.boolean().default(true),
});
export type CreateCsrActivityBody = z.infer<typeof CreateCsrActivitySchema>;

export const UpdateCsrActivitySchema = CreateCsrActivitySchema.partial().extend({
  status: z.nativeEnum(CsrActivityStatus).optional(),
});
export type UpdateCsrActivityBody = z.infer<typeof UpdateCsrActivitySchema>;
