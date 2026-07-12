import { z } from 'zod';
import { Framework } from '../../../common/types/enums.js';

export const CreateFrameworkMappingSchema = z.object({
  framework: z.nativeEnum(Framework),
  frameworkCode: z.string().min(1),
  module: z.string().min(1),
  internalMetric: z.string().min(1),
});
export type CreateFrameworkMappingBody = z.infer<typeof CreateFrameworkMappingSchema>;
