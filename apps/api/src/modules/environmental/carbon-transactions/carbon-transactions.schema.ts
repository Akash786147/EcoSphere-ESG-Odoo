import { z } from 'zod';
import { Scope, DataQuality } from '../../../common/types/enums.js';

export const CreateCarbonTransactionSchema = z.object({
  emissionFactorId: z.string().uuid(),
  departmentId: z.string().uuid(),
  productId: z.string().uuid().optional(),
  vendorId: z.string().uuid().optional(),
  scope: z.nativeEnum(Scope),
  activityValue: z.coerce.number().positive(),
  dataQuality: z.nativeEnum(DataQuality),
  transactionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
export type CreateCarbonTransactionBody = z.infer<typeof CreateCarbonTransactionSchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['Environmental'],
  basePath: '/api/v1/environmental/carbon-transactions',
  entityName: 'Carbon Transactions',
  schemas: {
    create: CreateCarbonTransactionSchema,
    update: undefined,
    response: _z.any(),
  },
});
