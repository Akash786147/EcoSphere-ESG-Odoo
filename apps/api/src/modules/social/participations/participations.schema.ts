import { z } from 'zod';

export const ApproveRejectSchema = z.object({
  reason: z.string().optional(),
});
export type ApproveRejectBody = z.infer<typeof ApproveRejectSchema>;
