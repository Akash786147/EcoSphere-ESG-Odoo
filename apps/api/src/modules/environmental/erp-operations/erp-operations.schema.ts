import { z } from 'zod';
import { ErpOperationType } from '../../../common/types/enums.js';

export const CreateErpOperationSchema = z.object({
  type: z.nativeEnum(ErpOperationType),
  departmentId: z.string().uuid(),
  vendorId: z.string().uuid().optional(),
  description: z.string().min(2),
  quantity: z.coerce.number().positive(),
  unit: z.string().min(1),
  amount: z.coerce.number(),
  operationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export type CreateErpOperationBody = z.infer<typeof CreateErpOperationSchema>;

export const UpdateErpOperationSchema = CreateErpOperationSchema.partial();
export type UpdateErpOperationBody = z.infer<typeof UpdateErpOperationSchema>;
