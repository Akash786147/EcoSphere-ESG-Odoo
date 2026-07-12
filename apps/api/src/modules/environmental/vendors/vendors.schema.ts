import { z } from 'zod';

export const CreateVendorSchema = z.object({
  name: z.string().min(2),
  vendorCode: z.string().min(1),
  vendorType: z.enum(['SUPPLIER', 'SERVICE_PROVIDER', 'CONTRACTOR']),
  country: z.string().length(2).optional(),
  esgRating: z.string().optional(),
  sustainabilityCertified: z.boolean().default(false),
});
export type CreateVendorBody = z.infer<typeof CreateVendorSchema>;

export const UpdateVendorSchema = CreateVendorSchema.partial();
export type UpdateVendorBody = z.infer<typeof UpdateVendorSchema>;
