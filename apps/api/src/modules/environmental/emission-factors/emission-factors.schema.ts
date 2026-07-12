import { z } from 'zod';
import { Scope } from '../../../common/types/enums.js';

export const CreateEmissionFactorSchema = z.object({
  activityName: z.string().min(2),
  scope: z.nativeEnum(Scope),
  co2ePerUnit: z.coerce.number().positive(),
  unit: z.string().min(1),
  source: z.string().min(1),
  validFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  validTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
export type CreateEmissionFactorBody = z.infer<typeof CreateEmissionFactorSchema>;

export const UpdateEmissionFactorSchema = CreateEmissionFactorSchema.partial();
export type UpdateEmissionFactorBody = z.infer<typeof UpdateEmissionFactorSchema>;

export const EmissionFactorQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
  scope: z.nativeEnum(Scope).optional(),
  source: z.string().optional(),
  status: z.string().optional(),
});
export type EmissionFactorQuery = z.infer<typeof EmissionFactorQuerySchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['Environmental'],
  basePath: '/api/v1/environmental/emission-factors',
  entityName: 'Emission Factors',
  schemas: {
    create: CreateEmissionFactorSchema,
    update: UpdateEmissionFactorSchema,
    response: _z.any(),
  },
});
