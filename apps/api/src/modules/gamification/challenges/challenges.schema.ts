import { z } from 'zod';
import { ChallengeStatus, ChallengeDifficulty, ChallengeType } from '../../../common/types/enums.js';

export const CreateChallengeSchema = z.object({
  title: z.string().min(2),
  categoryId: z.string().uuid(),
  description: z.string().min(10),
  xpReward: z.coerce.number().int().min(0),
  difficulty: z.nativeEnum(ChallengeDifficulty),
  challengeType: z.nativeEnum(ChallengeType),
  evidenceRequired: z.boolean().default(true),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export type CreateChallengeBody = z.infer<typeof CreateChallengeSchema>;

export const UpdateChallengeSchema = CreateChallengeSchema.partial();
export type UpdateChallengeBody = z.infer<typeof UpdateChallengeSchema>;

export const UpdateProgressSchema = z.object({
  progressPct: z.coerce.number().int().min(0).max(100),
});
export type UpdateProgressBody = z.infer<typeof UpdateProgressSchema>;
