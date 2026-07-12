import { z } from 'zod';
import { Framework } from '../../../common/types/enums.js';

export const CreateFrameworkMappingSchema = z.object({
  framework: z.nativeEnum(Framework),
  frameworkCode: z.string().min(1),
  module: z.string().min(1),
  internalMetric: z.string().min(1),
});
export type CreateFrameworkMappingBody = z.infer<typeof CreateFrameworkMappingSchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['Governance'],
  basePath: '/api/v1/governance/framework-mappings',
  entityName: 'Framework Mappings',
  schemas: {
    create: CreateFrameworkMappingSchema,
    update: undefined,
    response: _z.any(),
  },
});
