import { z } from 'zod';

export const CreatePolicySchema = z.object({
  title: z.string().min(2),
  content: z.string().min(10),
  version: z.string().min(1),
  effectiveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  ackDeadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  ackRequired: z.boolean().default(true),
});
export type CreatePolicyBody = z.infer<typeof CreatePolicySchema>;

export const UpdatePolicySchema = CreatePolicySchema.partial();
export type UpdatePolicyBody = z.infer<typeof UpdatePolicySchema>;
