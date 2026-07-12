import { z } from 'zod';

export const CreateDepartmentSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(1).max(20),
  parentDepartmentId: z.string().uuid().optional(),
  headId: z.string().uuid().optional(),
});
export type CreateDepartmentBody = z.infer<typeof CreateDepartmentSchema>;

export const UpdateDepartmentSchema = CreateDepartmentSchema.partial();
export type UpdateDepartmentBody = z.infer<typeof UpdateDepartmentSchema>;
