import { z } from 'zod';

export const CreateProductSchema = z.object({
  productName: z.string().min(2),
  sku: z.string().min(1),
  carbonFootprintPerUnit: z.coerce.number(),
  recyclabilityPct: z.coerce.number().min(0).max(100),
  certifications: z.string().optional(),
});
export type CreateProductBody = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = CreateProductSchema.partial();
export type UpdateProductBody = z.infer<typeof UpdateProductSchema>;
