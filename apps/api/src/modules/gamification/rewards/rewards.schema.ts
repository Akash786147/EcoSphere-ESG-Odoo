import { z } from 'zod';

export const CreateRewardSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  pointsRequired: z.coerce.number().int().positive(),
  stock: z.coerce.number().int().min(0),
});
export type CreateRewardBody = z.infer<typeof CreateRewardSchema>;

export const UpdateRewardSchema = CreateRewardSchema.partial();
export type UpdateRewardBody = z.infer<typeof UpdateRewardSchema>;

import { registerCrudPaths } from '../../../common/lib/openapi-crud.js';
import { z as _z } from 'zod';

registerCrudPaths({
  tags: ['Gamification'],
  basePath: '/api/v1/gamification/rewards',
  entityName: 'Rewards',
  schemas: {
    create: CreateRewardSchema,
    update: UpdateRewardSchema,
    response: _z.any(),
  },
});
